import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentPropsWithoutRef<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center h-9",
        caption_label: "text-sm font-medium text-zinc-200",
        nav: "space-x-1 flex items-center absolute right-3 top-4 z-20",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent border-zinc-700 hover:bg-zinc-800 text-zinc-300 p-0 opacity-70 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent border-zinc-700 hover:bg-zinc-800 text-zinc-300 p-0 opacity-70 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex justify-between",
        weekday: "text-zinc-500 rounded-md w-8 h-8 font-normal text-[0.8rem] text-center flex items-center justify-center",
        week: "flex w-full mt-2 justify-between",
        day: "h-8 w-8 p-0 text-center relative flex items-center justify-center",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal text-zinc-300 aria-selected:opacity-100 text-center flex items-center justify-center rounded-md hover:bg-zinc-800"
        ),
        selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600 focus:text-white rounded-md",
        today: "bg-zinc-800 text-white font-bold border border-zinc-700",
        outside: "text-zinc-600 opacity-50",
        disabled: "text-zinc-600 opacity-30 cursor-not-allowed",
        range_start: "bg-blue-600 text-white rounded-l-md",
        range_end: "bg-blue-600 text-white rounded-r-md",
        range_middle: "bg-blue-900/40 text-blue-200 rounded-none hover:bg-blue-900/60",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4" />
          }
          return <ChevronRight className="h-4 w-4" />
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
