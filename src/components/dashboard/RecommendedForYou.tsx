import {
  Avatar,
  AvatarIcon,
  Badge,
  Flex,
  RawNavigationCard,
  NavigationCardDescription,
  NavigationCardLabel,
  Text,
} from '@payfit/unity-components'
import { recommendedItems } from '../../data/mockData'

export function RecommendedForYou() {
  return (
    <Flex direction="col" gap="200">
      <Text variant="h3" asElement="h2">
        Recommended for you
      </Text>
      <div className="uy:grid uy:gap-300 uy:grid-cols-1 uy:md:grid-cols-3">
        {recommendedItems.map((item) => (
          <RawNavigationCard
            key={item.id}
            href="#"
            onPress={() => console.log('Navigate to', item.title)}
            prefix={
              <Avatar
                variant="circle"
                size="md"
                color={item.iconColor}
                aria-label={item.title}
              >
                <AvatarIcon src={item.icon} alt="" />
              </Avatar>
            }
          >
            <NavigationCardLabel>
              <Flex align="center" gap="100" inline>
                <span>{item.title}</span>
                {item.badge ? (
                  <Badge variant={item.badgeVariant ?? 'neutral'}>{item.badge}</Badge>
                ) : null}
              </Flex>
            </NavigationCardLabel>
            <NavigationCardDescription>{item.description}</NavigationCardDescription>
          </RawNavigationCard>
        ))}
      </div>
    </Flex>
  )
}
