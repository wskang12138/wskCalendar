import { View } from "@tarojs/components"
import { Component, ReactNode, memo } from "react"
import "./index.scss"
import dayjs from "dayjs"
import Taro from "@tarojs/taro";
import { transformToRemOrRpx } from "@/utils";


export interface LgCalendarDProps {
    onDayChange?: (value: string) => void
    onMonthChange?: (year: number, month: number) => void
    onRenderingTime?: (params?: DayRendarProps) => ReactNode
    selectedDay?: string
    markDays?: Array<string>
}

interface LgCalendarDState {
    months: Array<{ year: number, month: number }>
    yearMonth: string
    scrollLeft: number
    transition: string
    selectedDay: string
}

let lgCalendarDId = 0

export class WeekCalendar extends Component<LgCalendarDProps, LgCalendarDState> {

    private readonly id: string
    private monthWrapperWidth: number

    constructor(props) {
        super(props)

        const centerDay = this.props.selectedDay ? dayjs(this.props.selectedDay) : dayjs()

        this.state = {
            months: this.reCreateMonths(this.props.selectedDay),
            yearMonth: `${centerDay.year()}-${centerDay.month() + 1}`,
            scrollLeft: 0,
            transition: "all 0.2s",
            selectedDay: this.props.selectedDay || dayjs().format("YYYY-MM-DD")
        }

        this.id = `lg-calendar-d-${lgCalendarDId++}`
    }

    reCreateMonths(centerDay?: string) {
        const months = new Array<{ year: number, month: number }>()
        let centerMonth = dayjs().startOf("month")
        if (centerDay) {
            centerMonth = dayjs(centerDay).startOf("month")
        }
        months.push({ year: centerMonth.year(), month: centerMonth.month() + 1 })
        const prevMonth = centerMonth.add(-1, "month")
        months.unshift({ year: prevMonth.year(), month: prevMonth.month() + 1 })
        const nextMonth = centerMonth.add(1, "month")
        months.push({ year: nextMonth.year(), month: nextMonth.month() + 1 })
        return months
    }

    toPrevMonth() {
        const newYear = this.state.months[0].year
        const newMonth = this.state.months[0].month
        this.setState({
            scrollLeft: 0,
            yearMonth: `${newYear}-${newMonth}`,
            transition: "all 0.2s"
        }, () => {
            setTimeout(() => {
                this.setState({
                    months: this.reCreateMonths(`${newYear}-${newMonth}-01`),
                    scrollLeft: this.monthWrapperWidth,
                    transition: "none"
                }, () => {
                    if (this.props.onMonthChange) {
                        this.props.onMonthChange(newYear, newMonth)
                    }
                })
            }, 200)
        })
    }

    toNextMonth() {
        const newYear = this.state.months[2].year
        const newMonth = this.state.months[2].month
        this.setState({
            scrollLeft: 2 * this.monthWrapperWidth,
            yearMonth: `${newYear}-${newMonth}`,
            transition: "all 0.2s"
        }, () => {
            setTimeout(() => {
                this.setState({
                    months: this.reCreateMonths(`${newYear}-${newMonth}-01`),
                    scrollLeft: this.monthWrapperWidth,
                    transition: "none"
                }, () => {
                    if (this.props.onMonthChange) {
                        this.props.onMonthChange(newYear, newMonth)
                    }
                })
            }, 200)
        })
    }

    componentDidMount() {
        setTimeout(() => {
            Taro.createSelectorQuery()
                .select(`#${this.id} .lg-calendar-d-month-body-wrapper`)
                .boundingClientRect((res:any) => {
                    this.monthWrapperWidth = res.width
                    this.setState({
                        scrollLeft: this.monthWrapperWidth
                    })
                }).exec(() => { })
        }, 200)
    }

    changeSelectedDay(selectedDay: string) {
        this.setState({
            selectedDay: selectedDay
        }, () => {
            if (this.props.onDayChange) {
                this.props.onDayChange(selectedDay)
            }
        })
    }

    render() {
        const translateX = transformToRemOrRpx(-this.state.scrollLeft)
        let { onRenderingTime } = this.props
        return (
            <View id={this.id} className="lg-calendar-d" >
                <View className="lg-calendar-d-tilte">
                    <View>
                        <View onClick={() => this.toPrevMonth()} className="icon-b00401 lg-calendar-d-left-icon" />
                        <View className="lg-calendar-d-title-content">{this.state.yearMonth}</View>
                        <View onClick={() => this.toNextMonth()} className="icon-b01901 lg-calendar-d-right-icon" />
                    </View>
                </View>
                <WeekTitle />
                <View className="lg-calendar-d-body">
                    <View className="lg-calendar-d-body-panel" style={{ transform: `translateX(${translateX})`, transition: this.state.transition }}>
                        {
                            this.state.months.map(item => <MonthBody markDays={this.props.markDays} onChangeSelectedDay={(selectedDay) => this.changeSelectedDay(selectedDay)} selectedDay={this.state.selectedDay} key={`${item.year}-${item.month}`} year={item.year} month={item.month} onRenderingTime={onRenderingTime} />)
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const WeekTitle = memo(() => {
    return (
        <View className="lg-calendar-d-week">
            <View>日</View>
            <View>一</View>
            <View>二</View>
            <View>三</View>
            <View>四</View>
            <View>五</View>
            <View>六</View>
        </View>
    )
})

interface MonthBodyProps {
    year: number
    month: number
    selectedDay?: string
    markDays?: Array<string>
    onChangeSelectedDay?: (selectedDay: string) => void
    onRenderingTime?: (params?: DayRendarProps) => ReactNode
}

interface MonthBodyState {
    dayArr: Array<{ year: number, month: number, day: number, selected: boolean, mark: boolean }>
}

class MonthBody extends Component<MonthBodyProps, MonthBodyState> {

    constructor(props) {
        super(props)

        this.state = {
            dayArr: []
        }
        const firstDayjs = dayjs(`${this.props.year}-${this.props.month}-01`)
        const maxDay = firstDayjs.daysInMonth()
        for (let i = 0; i < maxDay; i++) {
            this.state.dayArr.push({ year: this.props.year, month: this.props.month, day: i + 1, selected: false, mark: false })
        }

        if (this.props.selectedDay) {
            const selectedDayjs = dayjs(this.props.selectedDay)
            if (this.props.year == selectedDayjs.year() + 1 && this.props.month == selectedDayjs.month() + 1) {
                this.state.dayArr[selectedDayjs.date() - 1].selected = true
            }
        }

        if (this.props.markDays) {
            this.props.markDays.forEach(value => {
                for (let i = 0; i < this.state.dayArr.length; i++) {
                    if (dayjs(value).startOf("day").isSame(`${this.state.dayArr[i].year}-${this.state.dayArr[i].month}-${this.state.dayArr[i].day}`)) {
                        this.state.dayArr[i].mark = true
                    }
                }
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: MonthBodyProps) {
        if (this.props.markDays != nextProps.markDays) {
            const dayArr = this.state.dayArr
            if (nextProps.markDays) {
                for (let i = 0; i < dayArr.length; i++) {
                    dayArr[i].mark = false
                }
                nextProps.markDays.forEach(value => {
                    for (let i = 0; i < dayArr.length; i++) {
                        if (dayjs(value).startOf("day").isSame(`${dayArr[i].year}-${dayArr[i].month}-${dayArr[i].day}`)) {
                            dayArr[i].mark = true
                        }
                    }
                })
            } else {
                for (let i = 0; i < dayArr.length; i++) {
                    dayArr[i].mark = false
                }
            }
            this.setState({
                dayArr: [...dayArr]
            })
        }
    }

    onDayClick(date: string) {
        if (this.props.onChangeSelectedDay && !dayjs(this.props.selectedDay).isSame(date)) {
            this.props.onChangeSelectedDay(date)
        }
    }

    render() {
        return (
            <View className="lg-calendar-d-month-body-wrapper">
                <View className="lg-calendar-d-month-body">
                    {
                        this.state.dayArr.map((item, index) =>
                            <DayRender
                                onClick={() => this.onDayClick(`${item.year}-${item.month}-${item.day}`)}
                                year={item.year}
                                month={item.month}
                                day={item.day}
                                key={index}
                                mark={item.mark}
                                selected={dayjs(this.props.selectedDay).isSame(`${item.year}-${item.month}-${item.day}`)}
                                onRenderingTime={this.props.onRenderingTime}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}

//计算不同星期的1号paddingLeft值
const dayPaddings = new Array<number>()
for (let i = 0; i < 7; i++) {
    dayPaddings.push(i * 100 / 7)
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

class DayRender extends Component<DayRendarProps>{

    render() {
        const current = dayjs(`${this.props.year}-${this.props.month}-${this.props.day}`)
        const classNames = new Array<string>()
        const weekDay = current.day()
        if (weekDay === 0 || weekDay === 6) {
            classNames.push("week-day")
        }
        if (this.props.selected) {
            classNames.push("selected")
        }
        classNames.push("lg-calendar-d-day-wrapper");
        let { onRenderingTime } = this.props
        return (
            <View onClick={this.props.onClick}
                style={{ marginLeft: this.props.day == 1 ? (dayPaddings[dayjs(`${this.props.year}-${this.props.month}-${this.props.day}`).day()] + "%") : "0" }}
                className="lg-calendar-d-day"
            >
                <View className={classNames.join(" ")}>
                    <View className="lg-calendar-d-day-content">
                        {onRenderingTime ? onRenderingTime(this.props) : this.props.day}
                    </View>
                    {
                        this.props.mark ?
                            <View className="mark" />
                            : ""
                    }
                </View>
            </View>
        )
    }
}
