#!/usr/bin/env node
// Builds the multi-version archive for GitHub Pages deployment.
//
//   dist-archive/
//     index.html, gallery.css, compare/   ← from gallery/
//     versions.json                       ← parsed from CHANGELOG.md
//     latest/                             ← build of current HEAD
//     versions/v1/, v2/, ...              ← build of each git tag vN
//
// Env flags:
//   ARCHIVE_SKIP_INSTALL=1   reuse root node_modules (fast local dev)
//   SITE_BASE=/my-base       override Pages subpath (default: /little-octopus-dashboard)

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const archiveDir = path.join(repoRoot, 'dist-archive')
const worktreeRoot = path.join(repoRoot, '.versions-worktrees')
const SITE_BASE = (process.env.SITE_BASE ?? '/little-octopus-dashboard').replace(/\/$/, '')
const SKIP_INSTALL = process.env.ARCHIVE_SKIP_INSTALL === '1'

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}${opts.cwd ? `  (in ${path.relative(repoRoot, opts.cwd) || '.'})` : ''}`)
  execSync(cmd, { stdio: 'inherit', cwd: repoRoot, ...opts })
}
function shOut(cmd, opts = {}) {
  return execSync(cmd, { cwd: repoRoot, ...opts }).toString().trim()
}

// --- Clean previous archive ------------------------------------------------
fs.rmSync(archiveDir, { recursive: true, force: true })
fs.mkdirSync(path.join(archiveDir, 'versions'), { recursive: true })

// Clean stale worktrees from prior aborted runs
try {
  const list = shOut('git worktree list --porcelain')
  for (const line of list.split('\n')) {
    if (line.startsWith('worktree ') && line.includes(worktreeRoot)) {
      const p = line.slice('worktree '.length)
      try { sh(`git worktree remove --force "${p}"`) } catch {}
    }
  }
} catch {}
fs.rmSync(worktreeRoot, { recursive: true, force: true })

// --- Parse CHANGELOG.md ----------------------------------------------------
const changelog = fs.readFileSync(path.join(repoRoot, 'CHANGELOG.md'), 'utf8')
const entries = {}
// Match "## vN — YYYY-MM-DD" headers (em dash U+2014). Accept hyphen as fallback.
const re = /(?:^|\n)##\s+(v\d+)\s+[\u2014-]\s+(\d{4}-\d{2}-\d{2})\s*\n([\s\S]*?)(?=\n##\s+v\d|$)/g
let m
while ((m = re.exec(changelog))) {
  const [, tag, date, body] = m
  const changes = body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim())
  entries[tag] = { tag, date, changes }
}

// --- Discover tags ---------------------------------------------------------
const tagsRaw = shOut('git tag --list "v*" --sort=version:refname')
const tags = tagsRaw ? tagsRaw.split('\n').filter(Boolean) : []
console.log(`Tags to build: ${tags.join(', ') || '(none)'}`)

// The current (new) vite.config.ts uses VITE_BASE; older tags hardcode the base.
// We copy the current vite.config.ts into each worktree so every tag honors VITE_BASE.
const currentViteConfig = fs.readFileSync(path.join(repoRoot, 'vite.config.ts'), 'utf8')

// --- Build each tagged version --------------------------------------------
const versions = []
for (const tag of tags) {
  const wt = path.join(worktreeRoot, tag)
  const outDir = path.join(archiveDir, 'versions', tag)
  const entry = entries[tag] || { tag, date: '', changes: ['(no changelog entry)'] }
  try {
    console.log(`\n=== Building ${tag} ===`)
    sh(`git worktree add "${wt}" ${tag}`)

    // Ensure VITE_BASE is honored even on old tags
    fs.writeFileSync(path.join(wt, 'vite.config.ts'), currentViteConfig)

    if (SKIP_INSTALL && fs.existsSync(path.join(repoRoot, 'node_modules'))) {
      fs.symlinkSync(
        path.join(repoRoot, 'node_modules'),
        path.join(wt, 'node_modules'),
        'dir'
      )
    } else {
      sh('npm ci --legacy-peer-deps', { cwd: wt })
    }

    sh('npm run build', {
      cwd: wt,
      env: { ...process.env, VITE_BASE: `${SITE_BASE}/versions/${tag}/` },
    })

    fs.cpSync(path.join(wt, 'dist'), outDir, { recursive: true })
    versions.push({ ...entry, available: true })
  } catch (err) {
    console.error(`Build failed for ${tag}:`, err.message)
    versions.push({ ...entry, available: false })
  } finally {
    try { sh(`git worktree remove --force "${wt}"`) } catch {}
  }
}

// --- Build current HEAD as "latest" ---------------------------------------
let latest = { available: false }
try {
  console.log('\n=== Building latest (HEAD) ===')
  sh('npm run build', {
    env: { ...process.env, VITE_BASE: `${SITE_BASE}/latest/` },
  })
  fs.cpSync(path.join(repoRoot, 'dist'), path.join(archiveDir, 'latest'), { recursive: true })
  latest = {
    available: true,
    sha: shOut('git rev-parse --short HEAD'),
    date: shOut('git log -1 --format=%cs'),
  }
} catch (err) {
  console.error('Latest build failed:', err.message)
}

// --- Copy gallery into archive root ---------------------------------------
const galleryDir = path.join(repoRoot, 'gallery')
for (const entry of fs.readdirSync(galleryDir, { withFileTypes: true })) {
  fs.cpSync(path.join(galleryDir, entry.name), path.join(archiveDir, entry.name), {
    recursive: true,
  })
}

// --- Write manifest (newest first) ----------------------------------------
const manifest = {
  generated: new Date().toISOString(),
  siteBase: SITE_BASE,
  latest,
  versions: versions.slice().reverse(),
}
fs.writeFileSync(
  path.join(archiveDir, 'versions.json'),
  JSON.stringify(manifest, null, 2)
)

// --- Cleanup ---------------------------------------------------------------
fs.rmSync(worktreeRoot, { recursive: true, force: true })

console.log(`\nArchive built at ${archiveDir}`)
console.log(`Versions: ${versions.map((v) => `${v.tag}${v.available ? '' : '(failed)'}`).join(', ') || '(none)'}`)
console.log(`Latest: ${latest.available ? `${latest.sha} @ ${latest.date}` : 'unavailable'}`)
