import { BaseProps } from "@/types/BaseComponent"

export interface CalendarData  extends BaseProps {
  date: string
  dateColor?: string
  week: string
  isThisWeek?: boolean // 时分本周
  passWeekColor?: string
  futureWeekColor?: string
  selectWeekColor?: string
  isSelected?: boolean
}

export interface CalendarProps {
  onChange?: (data: CalendarData) => void
  className?: string
  datas: CalendarData[]
}
