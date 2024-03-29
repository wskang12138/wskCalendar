import {ScrollView, View} from "@tarojs/components"
import {useEffect, useState} from "react"
import "./index.scss"

export interface CalendarEData {
  date: string
  dateColor?: string
  week: string
  isThisWeek?: boolean // 时分本周
  passWeekColor?: string
  futureWeekColor?: string
  selectWeekColor?: string
  isSelected?: boolean
}

export interface CalendarEProps {
  onChange?: (data: CalendarEData) => void
  className?: string
  datas: CalendarEData[]
}

export function LgCalendarE(props: CalendarEProps) {

  const [datas, setDatas] = useState(props.datas.slice())
  useEffect(() => {
    setDatas(props.datas)
    setScrollIntoView("")
    setTimeout(() => {
      setScrollIntoView("selected-view-item")
    }, 300)
  }, [props.datas])

  const [scrollIntoView, setScrollIntoView] = useState("")

  let thisWeekIndex = datas.findIndex(item => item.isThisWeek)

  useEffect(() => {
    setTimeout(() => {
      setScrollIntoView("selected-view-item")
    }, 300)
  }, [])

  const onClick = (data: CalendarEData) => {
    if (!data.isSelected) {
      for (let i = 0; i < datas.length; i++) {
        datas[i].isSelected = false
      }
      data.isSelected = true
      setDatas([...datas])
      if (props.onChange) {
        props.onChange(data)
      }
      setScrollIntoView("")
      setTimeout(() => {
        setScrollIntoView("selected-view-item")
      }, 300)
    }
  }
  return (
    <ScrollView scrollIntoView={scrollIntoView} scrollX={true}  className={props.className ? "lg-calendar-e " + props.className : "lg-calendar-e"}>
      {
        datas.map((item, index) =>
          <View onClick={() => onClick(item)} key={`${index}-${item.date}`} id={item.isSelected ? "selected-view-item" : `${index}-${item.date}`}
                className={item.isSelected ? "lg-calendar-e-item selected" : "lg-calendar-e-item"}>
            <View className="lg-calendar-date">
              {item.date}
            </View>
            <View className={index <= thisWeekIndex ? "lg-calendar-week passWeek" : "lg-calendar-week"}>
              <View>
                {item.week}
              </View>
            </View>
          </View>
        )
      }
    </ScrollView>
  )
}
