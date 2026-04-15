import { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Flex,
  Text,
} from '@payfit/unity-components'
import { pendingTasks as initialTasks } from '../../data/mockData'

export function PendingTasks() {
  const [tasks, setTasks] = useState(initialTasks)

  const process = (id: string) =>
    setTasks((ts) => ts.filter((t) => t.id !== id))

  return (
    <Card shadow="100">
      <CardTitle level={3}>
        <Flex align="baseline" gap="100">
          <Text variant="displayTitle" asElement="p">
            {tasks.length}
          </Text>
          <Text variant="body" color="content.neutral.low">
            Pending tasks
          </Text>
        </Flex>
      </CardTitle>
      <CardContent>
        <Flex direction="col" gap="200">
          {tasks.length === 0 ? (
            <Text variant="body" color="content.neutral.low">
              All caught up. Great work.
            </Text>
          ) : (
            tasks.map((t) => (
              <Flex
                key={t.id}
                justify="between"
                align="center"
                gap="200"
                wrap="wrap"
              >
                <Text variant="body">{t.description}</Text>
                <Button variant="secondary" onPress={() => process(t.id)}>
                  Process
                </Button>
              </Flex>
            ))
          )}
        </Flex>
      </CardContent>
    </Card>
  )
}
