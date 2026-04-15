#!/usr/bin/env node
// Cut a new release:
//   node scripts/release.mjs v3 "First change" "Second change" ...
//
// Steps:
//   1. Prepend a new "## vN — YYYY-MM-DD" section to CHANGELOG.md.
//   2. Commit the changelog update.
//   3. Create an annotated git tag vN.
//   4. Push commit + tag (unless --no-push).
//
// Assumes a clean working tree (will error otherwise).

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const changelogPath = path.join(repoRoot, 'CHANGELOG.md')

const args = process.argv.slice(2)
const noPush = args.includes('--no-push')
const positional = args.filter((a) => a !== '--no-push')
const [tag, ...changes] = positional

if (!tag || !/^v\d+$/.test(tag)) {
  console.error('Usage: node scripts/release.mjs v<N> "change 1" "change 2" [--no-push]')
  process.exit(1)
}
if (changes.length === 0) {
  console.error('Need at least one change description')
  process.exit(1)
}

function sh(cmd, opts = {}) {
  console.log(`$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: repoRoot, ...opts })
}
function shOut(cmd, opts = {}) {
  return execSync(cmd, { cwd: repoRoot, ...opts }).toString().trim()
}

// Guard: clean tree
const status = shOut('git status --porcelain')
if (status) {
  console.error('Working tree not clean. Commit or stash first.\n' + status)
  process.exit(1)
}

// Guard: tag doesn't exist
const existing = shOut('git tag --list ' + tag)
if (existing) {
  console.error(`Tag ${tag} already exists`)
  process.exit(1)
}

// Prepend to CHANGELOG.md
const today = new Date().toISOString().slice(0, 10)
const newEntry =
  `## ${tag} \u2014 ${today}\n` +
  changes.map((c) => `- ${c}`).join('\n') +
  '\n\n'

const existingLog = fs.readFileSync(changelogPath, 'utf8')
// Insert after the top preamble (keep any text above the first "## v…" header)
const firstHeader = existingLog.search(/^##\s+v\d+/m)
const updated =
  firstHeader === -1
    ? existingLog.trimEnd() + '\n\n' + newEntry
    : existingLog.slice(0, firstHeader) + newEntry + existingLog.slice(firstHeader)

fs.writeFileSync(changelogPath, updated)
console.log(`Updated CHANGELOG.md with ${tag}`)

sh(`git add CHANGELOG.md`)
sh(`git -c commit.gpgsign=false commit -m "Release ${tag}"`)
sh(`git tag -a ${tag} -m "Release ${tag}"`)

if (!noPush) {
  sh('git push --follow-tags')
}

console.log(`\nReleased ${tag}.`)
