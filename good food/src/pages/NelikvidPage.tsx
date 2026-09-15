import { NelikvidniyTovar } from "../components/NelikvidniyTovar"
import type { DateRange } from "react-day-picker"

interface NelikvidPageProps {
  date?: DateRange
  branch?: number
}

export function NelikvidPage({ date, branch = 1 }: NelikvidPageProps) {
  return (
    <div>
      <NelikvidniyTovar date={date} branch={branch} />
    </div>
  )
}

