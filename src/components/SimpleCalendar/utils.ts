import dayjs from "dayjs"

export interface DayItemApi {
  day: string
  date?: string
  month?: number
  year?: number
}
export const getMonthInfo = (month: string) => {
  const date = dayjs(month)

  const monthNum = date.daysInMonth()
  const weeks: DayItemApi[][] = []
  let curWeek: DayItemApi[] = []
  // 第一天星期
  let startDay = date.startOf('month').day()
  if(startDay === 0) startDay = 7
  if(startDay > 1) curWeek = [...(new Array(startDay - 1).fill({
    day: ''
  }))]

  for(let i = 1; i <= monthNum; i++) {
    curWeek.push({
      day: String(i),
      date: date.date(i).format("YYYY-MM-DD"),
      month: date.month() + 1,
      year: date.year()
    })
    if(curWeek.length === 7) {
      weeks.push(curWeek)
      curWeek = []
    }
  }
  if(curWeek.length) {
    curWeek.length < 7 ? curWeek = curWeek.concat(new Array(7 - curWeek.length).fill({
      day: ''
    })) : ''
    weeks.push(curWeek)
  }
  
  return {weeks, month: date.format('YYYY年MM月')}
}

export const getRecentMonth = (recent: number = 5) => {
  const months: string[] = []
  let month = dayjs()
  for(let i = 0; i < recent; i++) {
    months.push(month.format('YYYY-MM'))
    month = month.add(1, 'month')
  }
  
  return months
}