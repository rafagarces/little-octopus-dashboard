import { Flex, Text } from '@payfit/unity-components'
import { user } from '../../data/mockData'

export function PageHeader() {
  return (
    <Flex direction="col" gap="50">
      <Text asElement="h1" variant="h1">
        Hello {user.firstName}
      </Text>
      <Text variant="bodyLarge" color="content.neutral.low">
        {user.companyName}
      </Text>
    </Flex>
  )
}
