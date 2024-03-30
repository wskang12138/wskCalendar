
import { BaseProps } from "@/types/BaseComponent"
import dayjs from "dayjs"

export interface CalendarProps extends BaseProps {
  selectedDay?: string
  onChange?: (selectedDay: string) => void
  onShowCalendar?: () => void
  onCloseCalendar?: () => void
  minDay?: string
  maxDay?: string
}

export type DayType = {
  week: string,
  date: string,
  dayjs: dayjs.Dayjs
}

export interface CalendarState {
  scrollLeft: number
  dayArr: Array<DayType>
  isOpenCalendar: boolean
  currentIndex: number
  transition: string
}
