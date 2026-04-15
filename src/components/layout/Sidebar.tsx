import {
  AppMenu,
  AppMenuFooter,
  AppMenuHeader,
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
      <AppMenuHeader
        environment="prod"
        brandLabel="PayFit home"
        searchComponent={
          <Search
            label="Search"
            placeholder="Search..."
            value={searchValue}
            onChange={onSearchChange}
          />
        }
      />
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
