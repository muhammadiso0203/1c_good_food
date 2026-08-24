import { NelikvidniyTovar } from "../components/NelikvidniyTovar"
import type { DateRange } from "react-day-picker"

interface NelikvidPageProps {
  date?: DateRange
}

export function NelikvidPage({ date }: NelikvidPageProps) {
  return (
    <div>
      <NelikvidniyTovar date={date} />
    </div>
  )
}
