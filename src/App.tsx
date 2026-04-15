import { useState } from 'react'
import { AppLayout, Flex } from '@payfit/unity-components'
import { Sidebar } from './components/layout/Sidebar'
import { PageHeader } from './components/layout/PageHeader'
import { StatsCardsRow } from './components/dashboard/StatsCardsRow'
import { PayrollSection } from './components/dashboard/PayrollSection'
import { WhosOffToday } from './components/dashboard/WhosOffToday'
import { OnTheAgenda } from './components/dashboard/OnTheAgenda'
import { RequestsToApprove } from './components/dashboard/RequestsToApprove'
import { PendingTasks } from './components/dashboard/PendingTasks'
import { RecommendedForYou } from './components/dashboard/RecommendedForYou'

function App() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [search, setSearch] = useState('')

  return (
    <AppLayout
      menu={
        <Sidebar
          activeId={activeNav}
          onSelect={setActiveNav}
          searchValue={search}
          onSearchChange={setSearch}
        />
      }
    >
      <Flex direction="col" gap="400">
        <PageHeader />
        <StatsCardsRow />
        <PayrollSection />
        <div className="uy:grid uy:gap-300 uy:grid-cols-1 uy:md:grid-cols-2">
          <WhosOffToday />
          <OnTheAgenda />
        </div>
        <div className="uy:grid uy:gap-300 uy:grid-cols-1 uy:md:grid-cols-2">
          <RequestsToApprove />
          <PendingTasks />
        </div>
        <RecommendedForYou />
      </Flex>
    </AppLayout>
  )
}

export default App
