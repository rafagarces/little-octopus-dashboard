import { stats } from '../../data/mockData'
import { StatCard } from './StatCard'

export function StatsCardsRow() {
  return (
    <div className="uy:grid uy:gap-300 uy:grid-cols-1 uy:md:grid-cols-3">
      {stats.map((s) => (
        <StatCard key={s.id} stat={s} />
      ))}
    </div>
  )
}
