import {
  Avatar,
  AvatarFallback,
  Badge,
  Card,
  CardContent,
  CardTitle,
  Flex,
  RawLink,
  Text,
} from '@payfit/unity-components'
import { absentEmployees } from '../../data/mockData'
import type { AbsentEmployee } from '../../types'

function Row({ employee }: { employee: AbsentEmployee }) {
  return (
    <Flex align="center" justify="between" gap="200">
      <Flex align="center" gap="200">
        <Avatar variant="circle" size="md" color="teal" aria-label={employee.name}>
          <AvatarFallback variant="initials">{employee.initials}</AvatarFallback>
        </Avatar>
        <Flex direction="col" gap="0">
          <Text variant="bodyStrong">{employee.name}</Text>
          <Text variant="bodySmall" color="content.neutral.low">
            {employee.role}
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" gap="200">
        <Text variant="bodySmall" color="content.neutral.low">
          {employee.dateRange}
        </Text>
        <Badge variant={employee.type === 'holiday' ? 'success' : 'danger'}>
          {employee.type === 'holiday' ? 'Holiday' : 'Sick leave'}
        </Badge>
      </Flex>
    </Flex>
  )
}

export function WhosOffToday() {
  return (
    <Card shadow="100">
      <CardTitle level={3}>
        <Flex justify="between" align="center">
          <Text variant="h3" asElement="h2">
            Who’s off today?
          </Text>
          <RawLink href="#" onPress={() => console.log('View calendar')}>
            View calendar
          </RawLink>
        </Flex>
      </CardTitle>
      <CardContent>
        <Flex direction="col" gap="200">
          {absentEmployees.map((e) => (
            <Row key={e.id} employee={e} />
          ))}
        </Flex>
      </CardContent>
    </Card>
  )
}
