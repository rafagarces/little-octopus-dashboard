import { Badge, Card, CardContent, CardTitle, Flex, Text } from '@payfit/unity-components'
import { Icon } from '@payfit/unity-icons'
import type { Stat } from '../../types'

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card shadow="100">
      <CardTitle level={3}>
        <Text variant="overline" color="content.neutral.low">
          {stat.label}
        </Text>
      </CardTitle>
      <CardContent>
        <Flex direction="col" gap="150">
          <Text variant="displayTitle" asElement="p">
            {stat.value}
          </Text>
          {stat.delta ? (
            <Flex align="center" gap="100">
              <Badge variant={stat.delta.tone === 'success' ? 'success' : 'danger'}>
                <Flex align="center" gap="25" inline>
                  <Icon
                    src={stat.delta.direction === 'up' ? 'ArrowUpFilled' : 'ArrowDownFilled'}
                    size={20}
                  />
                  <span>{stat.delta.value}</span>
                </Flex>
              </Badge>
              <Text variant="bodySmall" color="content.neutral.low">
                vs. last month
              </Text>
            </Flex>
          ) : null}
          {stat.extras ? (
            <Flex align="center" gap="200" wrap="wrap">
              {stat.extras.map((extra) => (
                <Flex key={extra.text} align="center" gap="50" inline>
                  <Icon
                    src={extra.icon}
                    size={20}
                    color={extra.color === 'success' ? 'content.success' : 'content.danger'}
                  />
                  <Text variant="bodySmall">{extra.text}</Text>
                </Flex>
              ))}
            </Flex>
          ) : null}
        </Flex>
      </CardContent>
    </Card>
  )
}
