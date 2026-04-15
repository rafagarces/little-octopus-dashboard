import {
  AppMenu,
  AppMenuFooter,
  AppMenuNavContent,
  Badge,
  Flex,
  Nav,
  RawNavItem,
  Search,
} from '@payfit/unity-components'
import { Icon } from '@payfit/unity-icons'
import { navItems, user } from '../../data/mockData'

type Props = {
  activeId: string
  onSelect: (id: string) => void
  searchValue: string
  onSearchChange: (value: string) => void
}

export function Sidebar({ activeId, onSelect, searchValue, onSearchChange }: Props) {
  return (
    <AppMenu>
      <div className="uy:flex uy:flex-col uy:gap-200 uy:px-200 uy:py-300">
        <a
          href="#"
          aria-label="Acme home"
          className="uy:inline-flex uy:items-center uy:gap-100 uy:no-underline"
        >
          <span
            aria-hidden
            className="uy:inline-flex uy:size-400 uy:items-center uy:justify-center uy:rounded-full uy:bg-surface-primary uy:text-content-primary-inverse uy:typography-body-strong"
            style={{
              background: 'var(--color-surface-primary, #0a73eb)',
              color: '#fff',
            }}
          >
            A
          </span>
          <span
            className="uy:typography-h3"
            style={{
              fontFamily: "'Source Serif 4', 'Inter', serif",
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontSize: 24,
              color: 'var(--color-content-neutral, #030e1d)',
            }}
          >
            Acme
          </span>
        </a>
        <Search
          label="Search"
          placeholder="Search..."
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <AppMenuNavContent>
        <Nav title="Main navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <RawNavItem
              key={item.id}
              level={0}
              isCurrent={activeId === item.id}
              onPress={() => onSelect(item.id)}
              prefix={() => <Icon src={item.icon} size={20} />}
              suffix={
                item.badgeCount ? (
                  <Badge variant="danger">{item.badgeCount}</Badge>
                ) : undefined
              }
            >
              {item.label}
            </RawNavItem>
          ))}
        </Nav>
      </AppMenuNavContent>
      <AppMenuFooter
        title={user.companyName}
        description={
          <Flex direction="row" gap="50" align="center">
            <span>{user.firstName}</span>
          </Flex>
        }
      />
    </AppMenu>
  )
}
