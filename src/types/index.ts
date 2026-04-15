import type { UnityIcon } from '@payfit/unity-icons'

export type NavItem = {
  id: string
  label: string
  icon: UnityIcon
  badgeCount?: number
}

export type Stat = {
  id: string
  label: string
  value: string
  description?: string
  delta?: { value: string; direction: 'up' | 'down'; tone: 'success' | 'danger' | 'neutral' }
  extras?: { icon: UnityIcon; color: 'success' | 'danger'; text: string }[]
}

export type AbsentEmployee = {
  id: string
  name: string
  role: string
  dateRange: string
  type: 'holiday' | 'sick'
  initials: string
}

export type AgendaEntry = {
  id: string
  title: string
  person: string
  detail: string
  icon: UnityIcon
  iconColor: 'teal' | 'orange' | 'purple' | 'plum'
  date?: string
  when: 'today' | 'upcoming'
}

export type PendingTask = {
  id: string
  description: string
}

export type RecommendedItem = {
  id: string
  title: string
  description: string
  badge?: string
  badgeVariant?: 'promo' | 'neutral'
  icon: UnityIcon
  iconColor: 'teal' | 'plum' | 'purple' | 'orange'
}
