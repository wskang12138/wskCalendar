import { BaseProps } from "@/types/BaseComponent"
import { ReactNode } from "react"

export interface CalendarDProps extends BaseProps {
  choseDay:(value: string) => void
  onDayChange?: (value: string) => void
  onMonthChange?: (year: number, month: number) => void
  onRenderingTime?: (params?: DayRendarProps) => ReactNode
  selectedDay?: string
  markDays?: Array<string>
  getOrderStatus:(date)=>void
}

export interface DayRendarProps {
  year: number
  month: number
  day: number
  selected: boolean
  onClick: () => void
  mark?: boolean
  onRenderingTime?: (params?: DayRendarProps) => ReactNode
}

export interface CalendarDState {
  months: Array<{ year: number, month: number }>
  yearMonth: string
  scrollLeft: number
  transition: string
  selectedDay: string
}
