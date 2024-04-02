import { ITouchEvent, View } from "@tarojs/components";
import { Component, memo } from "react";
import dayjs from "dayjs"
import Taro from "@tarojs/taro";
import { transformToRemOrRpx1 } from "../../utils";
import "./index.scss"
import { CalendarProps, CalendarState, DayType } from "./types";


function newDayType(dayjs: dayjs.Dayjs): DayType {
  return {
    week: weekDay[dayjs.day()],
    date: `${dayjs.month() + 1}-${dayjs.date()}`,
    dayjs: dayjs
  }
}


const weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

let CalendarCId = 0
const INIT_DAY_HEAD = 10
const INIT_DAY_TAIL = 10
const LOAD_THRESHOLD = 7
const LOAD_DAY = 8

export class SwipeCalendar extends Component<CalendarProps, CalendarState> {

  private touchStartX: number
  private readonly id: string
  private dayWrapperWidth: number
  private isLoadingTail: boolean
  private isLoadingHead: boolean

  constructor(props: CalendarProps) {
    super(props)

    const today = dayjs().startOf("day")
    const newDayArr = this.reCreateDayArr(this.props.selectedDay ? this.props.selectedDay : `${today.year()}-${today.month() + 1}-${today.date()}`)
    this.state = {
      scrollLeft: 0,
      dayArr: newDayArr,
      isOpenCalendar: false,
      currentIndex: this.initCurrentIndex(this.props.selectedDay ? this.props.selectedDay : `${today.year()}-${today.month() + 1}-${today.date()}`),
      transition: "none"
    }
    this.touchStartX = 0
    this.isLoadingHead = false
    this.isLoadingTail = false
    this.id = `swipe-calendar-${CalendarCId++}`
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.selectDay = this.selectDay.bind(this)
    this.openCalendar = this.openCalendar.bind(this)
    this.closeCalendar = this.closeCalendar.bind(this)
    this.onCalendarAChange = this.onCalendarAChange.bind(this)
  }

  initCurrentIndex(centerDay: string) {
    let initDayHead = INIT_DAY_HEAD

    if (this.props.minDay) {
      const minDayjs = dayjs(this.props.minDay)
      const months = Math.abs(dayjs(centerDay).diff(minDayjs, "month"))
      if (initDayHead > months) {
        initDayHead = months
      }
    }
    return initDayHead
  }

  UNSAFE_componentWillReceiveProps(nextProps: CalendarProps) {
    if (this.props.selectedDay != nextProps.selectedDay) {
      const today = dayjs().startOf("day")
      const centerDay = nextProps.selectedDay ? nextProps.selectedDay : `${today.year()}-${today.month() + 1}-${today.date()}`;
      const newDayArr = this.reCreateDayArr(centerDay)
      const newIndex = this.initCurrentIndex(centerDay)
      this.setState({
        dayArr: newDayArr,
        currentIndex: newIndex,
        scrollLeft: this.dayWrapperWidth * (newIndex - 1),
        transition: "transform 0.2s"
      })
    }
  }

  onTouchStart(event: ITouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX || event.changedTouches[0].pageX
    this.setState({
      transition: "none"
    })
  }

  onTouchMove(event: ITouchEvent) {
    const moveX = event.changedTouches[0].screenX || event.changedTouches[0].pageX
    const distance = moveX - this.touchStartX
    let newScrollLeft = this.state.scrollLeft - distance
    if (newScrollLeft < 0) {
      newScrollLeft = 0
    }
    if (newScrollLeft > (this.state.dayArr.length - 6) * this.dayWrapperWidth) {
      newScrollLeft = (this.state.dayArr.length - 6) * this.dayWrapperWidth
    }
    this.setState({
      scrollLeft: newScrollLeft,
      transition: "transform 0.01s"
    }, () => {
      this.onScrollLeftChange()
    })
    this.touchStartX = moveX
  }

  onTouchEnd(_event: ITouchEvent) {

  }

  onScrollLeftChange() {
    const index = Math.floor(this.state.scrollLeft / this.dayWrapperWidth)

    //加载头部
    if (index <= LOAD_THRESHOLD) {
      this.loadHead()
    }

    //加载末尾
    if (this.state.dayArr.length - index <= LOAD_THRESHOLD) {
      this.loadTail()
    }
  }

  loadHead(currentIndex?: number, scrollLeft?: number, onSuccess?: () => void) {
    if (this.isLoadingHead) {
      return
    }

    let loadDay = LOAD_DAY
    if (this.props.minDay) {
      const minDayjs = dayjs(this.props.minDay).startOf("date")
      const currentMinDayjs = this.state.dayArr[0].dayjs.startOf("date")
      if (currentMinDayjs.isSame(minDayjs) || currentMinDayjs.isBefore(minDayjs)) {
        if ((currentIndex || currentIndex === 0) && (scrollLeft || scrollLeft === 0)) {
          this.setState({
            scrollLeft: scrollLeft - (currentIndex === 1 ? this.dayWrapperWidth : 0),
            currentIndex: currentIndex,
            transition: "transform 0.2s"
          }, () => {
            onSuccess && onSuccess()
          })
        }
        return;
      }

      const diffDay = Math.abs(currentMinDayjs.diff(minDayjs, "hour") / 24);
      if (loadDay > diffDay) {
        loadDay = diffDay
      }
    }

    this.isLoadingHead = true
    const newDayArr = this.state.dayArr
    let renderDay = newDayArr[0].dayjs
    const today = dayjs().startOf("day")
    for (let i = 0; i < loadDay; i++) {
      renderDay = renderDay.add(-1, "day")
      newDayArr.unshift({
        ...newDayType(renderDay),
        date: today.isSame(renderDay) ? "今天" : `${renderDay.month() + 1}-${renderDay.date()}`
      })
    }

    const nextScrollLeft = scrollLeft ? scrollLeft : this.state.scrollLeft
    const nextIndex = currentIndex || currentIndex === 0 ? currentIndex : this.state.currentIndex
    this.setState({
      dayArr: [...newDayArr],
      scrollLeft: nextScrollLeft + loadDay * this.dayWrapperWidth,
      currentIndex: nextIndex + loadDay,
      transition: "none"
    }, () => {
      onSuccess && onSuccess()
      this.isLoadingHead = false
    })
  }

  loadTail() {
    if (this.isLoadingTail) {
      return
    }

    let loadDay = LOAD_DAY
    if (this.props.maxDay) {
      const maxDayjs = dayjs(this.props.maxDay).startOf("date")
      const currentMaxDayjs = this.state.dayArr[this.state.dayArr.length - 1].dayjs.startOf("date")
      if (currentMaxDayjs.isSame(maxDayjs) || currentMaxDayjs.isAfter(maxDayjs)) {
        return;
      }

      const diffDay = Math.abs(currentMaxDayjs.diff(maxDayjs, "hour") / 24);
      if (loadDay > diffDay) {
        loadDay = diffDay
      }
    }

    this.isLoadingTail = true
    const newDayArr = this.state.dayArr
    let renderDay = newDayArr[newDayArr.length - 1].dayjs
    const today = dayjs().startOf("day")
    for (let i = 0; i < loadDay; i++) {
      renderDay = renderDay.add(1, "day")
      newDayArr.push({
        ...newDayType(renderDay),
        date: today.isSame(renderDay) ? "今天" : `${renderDay.month() + 1}-${renderDay.date()}`
      })
    }
    this.setState({
      dayArr: [...newDayArr]
    }, () => {
      this.isLoadingTail = false
    })
  }

  componentDidMount() {
    setTimeout(() => {
      Taro.createSelectorQuery()
        .select(`#${this.id} .swipe-calendar-day-wrapper`)
        .boundingClientRect((res:any)=> {
          this.dayWrapperWidth = res.width
          this.setState({
            scrollLeft: this.state.currentIndex <= 0 ? 0 : (this.state.currentIndex - 1) * this.dayWrapperWidth
          })
        }).exec(() => {
        })
    }, 200)
  }

  selectDay(value: dayjs.Dayjs) {
    if (!value.isSame(this.state.dayArr[this.state.currentIndex].dayjs)) {
      const currentIndex = this.state.dayArr.findIndex(item => item.dayjs.isSame(value))
      let scrollLeft = (currentIndex - 1) * this.dayWrapperWidth
      if (scrollLeft > (this.state.dayArr.length - 6) * this.dayWrapperWidth) {
        scrollLeft = (this.state.dayArr.length - 6) * this.dayWrapperWidth
      }

      if (currentIndex >= this.state.dayArr.length - 5) {
        this.loadTail()
      }

      if (currentIndex <= 3) {
        this.loadHead(currentIndex, scrollLeft, () => {
          if (this.props.onChange) {
            this.props.onChange(`${value.year()}-${value.month() + 1}-${value.date()}`)
          }
        })
      } else {
        this.setState({
          currentIndex: currentIndex,
          scrollLeft: scrollLeft,
          transition: "transform 0.2s"
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(`${value.year()}-${value.month() + 1}-${value.date()}`)
          }
        })
      }
    }
  }

  openCalendar() {
    this.setState({
      isOpenCalendar: true
    })
    if (this.props.onShowCalendar) {
      this.props.onShowCalendar()
    }
  }

  closeCalendar() {
    this.setState({
      isOpenCalendar: false
    })
    if (this.props.onCloseCalendar) {
      this.props.onCloseCalendar()
    }
  }

  reCreateDayArr(centerDay: string) {
    const newDayArr = new Array<DayType>()
    const today = dayjs().startOf("day")
    const centerDayjs = dayjs(centerDay).startOf("day")
    let renderDay = centerDayjs

    let initDayHead = INIT_DAY_HEAD

    if (this.props.minDay) {
      const minDayjs = dayjs(this.props.minDay)
      const months = Math.abs(centerDayjs.diff(minDayjs, "month"))
      if (initDayHead > months) {
        initDayHead = months
      }
    }

    //init head
    for (let i = 0; i < initDayHead; i++) {
      renderDay = renderDay.add(-1, "day");
      newDayArr.unshift({
        ...newDayType(renderDay),
        date: today.isSame(renderDay) ? "今天" : `${renderDay.month() + 1}-${renderDay.date()}`
      })
    }

    newDayArr.push({
      ...newDayType(centerDayjs),
      date: today.isSame(centerDayjs) ? "今天" : `${centerDayjs.month() + 1}-${centerDayjs.date()}`
    })

    let initDayTail = INIT_DAY_TAIL
    if (this.props.maxDay) {
      const maxDayjs = dayjs(this.props.maxDay)
      const months = Math.abs(maxDayjs.diff(centerDayjs, "month"))
      if (initDayTail > months) {
        initDayTail = months
      }
    }

    //init tail
    renderDay = centerDayjs
    for (let i = 0; i < initDayTail; i++) {
      renderDay = renderDay.add(1, "day")
      newDayArr.push({
        ...newDayType(renderDay),
        date: today.isSame(renderDay) ? "今天" : `${renderDay.month() + 1}-${renderDay.date()}`
      })
    }
    return newDayArr
  }

  onCalendarAChange(selectedDay: string) {
    const value = dayjs(selectedDay)
    if (!value.isSame(this.state.dayArr[this.state.currentIndex].dayjs)) {
      const newDayArr = this.reCreateDayArr(selectedDay)
      const newCurrentIndex = newDayArr.findIndex(item => item.dayjs.isSame(value))
      this.setState({
        dayArr: [...newDayArr],
        currentIndex: newCurrentIndex,
        isOpenCalendar: false,
        scrollLeft: this.dayWrapperWidth * (newCurrentIndex - 1)
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(selectedDay)
        }
      })
    } else {
      this.setState({
        isOpenCalendar: false
      })
    }
    this.props.onCloseCalendar && this.props.onCloseCalendar()
  }

  render() {
    const translateX = transformToRemOrRpx1(this.state.scrollLeft)
    return (
      <View id={this.id} className="calendar">
        <View className="swipe-calendar-day">
          <View onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            className="swipe-calendar-day-panel"
            style={{ transform: `translateX(-${translateX})`, transition: this.state.transition }}>
            {
              this.state.dayArr.map((item, index) => (
                <DayRender isSelected={index == this.state.currentIndex}
                  key={`${index}-${item.dayjs.year()}-${item.dayjs.month() + 1}-${item.dayjs.date()}`}
                  {...item}
                  onClick={this.selectDay} />
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}


interface DayRender extends DayType {
  onClick: (dayjs: dayjs.Dayjs) => void
  isSelected: boolean
}

const DayRender = memo((props: DayRender) => {
  return (
    <View onClick={() => props.onClick(props.dayjs)}
      className={`swipe-calendar-day-wrapper ${props.isSelected ? "selected" : ""}`}>
      <View className="swipe-calendar-day-week">{props.week}</View>
      <View className="swipe-calendar-date">{props.date === '今天' ? props.date : props?.dayjs?.format('MM-DD')}</View>
    </View>
  )
})
