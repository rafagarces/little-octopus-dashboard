import {
  Avatar,
  AvatarIcon,
  Card,
  CardContent,
  CardTitle,
  Flex,
  Text,
} from '@payfit/unity-components'
import { agendaEntries } from '../../data/mockData'
import type { AgendaEntry } from '../../types'

function Row({ entry }: { entry: AgendaEntry }) {
  return (
    <Flex align="center" gap="200">
      <Avatar variant="circle" size="md" color={entry.iconColor} aria-label={entry.title}>
        <AvatarIcon src={entry.icon} alt="" />
      </Avatar>
      <Flex direction="col" gap="0">
        <Text variant="bodyStrong">
          {entry.person} · {entry.title}
        </Text>
        <Text variant="bodySmall" color="content.neutral.low">
          {entry.date ?? entry.detail}
        </Text>
      </Flex>
    </Flex>
  )
}

export function OnTheAgenda() {
  const today = agendaEntries.filter((e) => e.when === 'today')
  const upcoming = agendaEntries.filter((e) => e.when === 'upcoming')

  return (
    <Card shadow="100">
      <CardTitle level={3}>
        <Text variant="h3" asElement="h2">
          On the agenda
        </Text>
      </CardTitle>
      <CardContent>
        <Flex direction="col" gap="300">
          {today.length > 0 && (
            <Flex direction="col" gap="150">
              <Text variant="overline" color="content.neutral.low">
                Today
              </Text>
              {today.map((e) => (
                <Row key={e.id} entry={e} />
              ))}
            </Flex>
          )}
          {upcoming.length > 0 && (
            <Flex direction="col" gap="150">
              <Text variant="overline" color="content.neutral.low">
                Upcoming
              </Text>
              {upcoming.map((e) => (
                <Row key={e.id} entry={e} />
              ))}
            </Flex>
          )}
        </Flex>
      </CardContent>
    </Card>
  )
}
