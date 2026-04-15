import type {
  AbsentEmployee,
  AgendaEntry,
  NavItem,
  PendingTask,
  RecommendedItem,
  Stat,
} from '../types'

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'My dashboard', icon: 'DashboardOutlined' },
  { id: 'employees', label: 'My employees', icon: 'UsersOutlined' },
  { id: 'validations', label: 'Validations', icon: 'CheckCircleOutlined', badgeCount: 3 },
  { id: 'post-payroll', label: 'Post-payroll checklist', icon: 'ClipboardCheckOutlined' },
  { id: 'run-payroll', label: 'Run my payroll', icon: 'MoneyOutlined' },
  { id: 'pay-items', label: 'Pay items', icon: 'ReceiptOutlined' },
  { id: 'benefits', label: 'Benefits in kind', icon: 'GiftOutlined' },
  { id: 'pensions', label: 'Pensions', icon: 'PiggyBankOutlined' },
  { id: 'team', label: 'My team', icon: 'UsersThreeOutlined' },
  { id: 'company', label: 'Company settings', icon: 'BuildingsOutlined' },
  { id: 'access', label: 'Access & emails', icon: 'LockOutlined' },
]

export const stats: Stat[] = [
  {
    id: 'gross',
    label: 'Gross · November',
    value: '£34,700',
    delta: { value: '+4%', direction: 'up', tone: 'success' },
  },
  {
    id: 'total-cost',
    label: 'Total cost · November',
    value: '£52,500',
    delta: { value: '+4%', direction: 'up', tone: 'success' },
  },
  {
    id: 'headcount',
    label: 'Headcount · November',
    value: '21 employees',
    extras: [
      { icon: 'ArrowUpFilled', color: 'success', text: '2 joiners' },
      { icon: 'ArrowDownFilled', color: 'danger', text: '1 leaver' },
    ],
  },
]

export const absentEmployees: AbsentEmployee[] = [
  {
    id: 'a1',
    name: 'Sophia Martínez',
    role: 'Product Designer',
    dateRange: '10 Nov — 14 Nov',
    type: 'holiday',
    initials: 'SM',
  },
  {
    id: 'a2',
    name: 'Liam O’Connor',
    role: 'Engineering Manager',
    dateRange: '10 Nov',
    type: 'sick',
    initials: 'LO',
  },
  {
    id: 'a3',
    name: 'Amélie Dubois',
    role: 'Marketing Lead',
    dateRange: '8 Nov — 12 Nov',
    type: 'holiday',
    initials: 'AD',
  },
]

export const agendaEntries: AgendaEntry[] = [
  {
    id: 'g1',
    title: 'Birthday',
    person: 'Jean Nguyen',
    detail: 'Senior Accountant',
    icon: 'CakeFilled',
    iconColor: 'plum',
    when: 'today',
  },
  {
    id: 'g2',
    title: 'Contract end',
    person: 'Lina Benalia',
    detail: 'Customer Success',
    icon: 'EnvelopeFilled',
    iconColor: 'orange',
    date: 'Monday, 10 November',
    when: 'upcoming',
  },
  {
    id: 'g3',
    title: 'Work anniversary',
    person: 'Marco Rossi',
    detail: '3 years at Smiles.Inc',
    icon: 'StarFilled',
    iconColor: 'teal',
    date: 'Thursday, 13 November',
    when: 'upcoming',
  },
]

export const pendingTasks: PendingTask[] = [
  { id: 't1', description: 'Add a bank account for Marco Rossi' },
  { id: 't2', description: 'Confirm end-of-trial for Emma Weber' },
  { id: 't3', description: 'Upload signed contract for Naomi Patel' },
  { id: 't4', description: 'Validate September P11D adjustments' },
]

export const recommendedItems: RecommendedItem[] = [
  {
    id: 'r1',
    title: 'eNPS Survey',
    description: 'Measure team engagement in a few clicks.',
    badge: 'New',
    badgeVariant: 'promo',
    icon: 'ChartOutlined',
    iconColor: 'purple',
  },
  {
    id: 'r2',
    title: 'Simplified reimbursement',
    description: 'Reimburse expenses in one seamless flow.',
    badge: 'New',
    badgeVariant: 'promo',
    icon: 'WalletOutlined',
    iconColor: 'teal',
  },
  {
    id: 'r3',
    title: 'Corporate tax changes',
    description: 'What the 2026 finance bill means for you.',
    badge: '3 min read',
    badgeVariant: 'neutral',
    icon: 'BookOpenTextOutlined',
    iconColor: 'orange',
  },
]

export const payrollInfo = {
  month: 'June payroll',
  daysUntilPayday: 32,
  alertMessage:
    'You have 2 days left to reopen May payroll before your pay information is submitted to HMRC.',
}

export const approvalRequests = {
  total: 8,
  timeOff: 3,
  expenses: 5,
}

export const user = {
  firstName: 'Thomas',
  companyName: 'Smiles.Inc',
  initials: 'S',
}
