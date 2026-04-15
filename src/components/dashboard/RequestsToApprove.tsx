import {
  Card,
  CardContent,
  CardTitle,
  Flex,
  RawLink,
  Text,
} from '@payfit/unity-components'
import { approvalRequests } from '../../data/mockData'

export function RequestsToApprove() {
  return (
    <Card shadow="100">
      <CardTitle level={3}>
        <Text variant="h3" asElement="h2">
          Requests to approve
        </Text>
      </CardTitle>
      <CardContent>
        <Flex direction="col" gap="200">
          <Flex align="baseline" gap="100">
            <Text variant="displayTitle" asElement="p">
              {approvalRequests.total}
            </Text>
            <Text variant="body" color="content.neutral.low">
              Awaiting approval
            </Text>
          </Flex>
          <Flex direction="col" gap="100">
            <RawLink href="#" onPress={() => console.log('Go to time off requests')}>
              {approvalRequests.timeOff} Time off →
            </RawLink>
            <RawLink href="#" onPress={() => console.log('Go to expenses')}>
              {approvalRequests.expenses} Expenses →
            </RawLink>
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  )
}
