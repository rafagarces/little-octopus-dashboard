import {
  Alert,
  AlertActions,
  AlertContent,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardTitle,
  Flex,
  RawLink,
  Text,
} from '@payfit/unity-components'
import { payrollInfo } from '../../data/mockData'

export function PayrollSection() {
  return (
    <Card shadow="100">
      <CardTitle isHidden>Payroll</CardTitle>
      <CardContent>
        <Flex direction="col" gap="300">
          <Flex justify="between" align="center" wrap="wrap" gap="200">
            <Flex direction="col" gap="50">
              <Text variant="h3" asElement="h2">
                {payrollInfo.month}
              </Text>
              <Text variant="body" color="content.neutral.low">
                Payday in {payrollInfo.daysUntilPayday} days
              </Text>
            </Flex>
            <Button
              variant="primary"
              onPress={() => console.log('Navigate to payroll')}
            >
              Manage payroll
            </Button>
          </Flex>
          <Alert variant="warning">
            <AlertTitle>An error on your May pay?</AlertTitle>
            <AlertContent>{payrollInfo.alertMessage}</AlertContent>
            <AlertActions>
              <RawLink
                href="#"
                onPress={() => console.log('Reopen May payroll')}
              >
                Reopen May payroll
              </RawLink>
            </AlertActions>
          </Alert>
        </Flex>
      </CardContent>
    </Card>
  )
}
