import { ScrollView, View } from "@tarojs/components"
import { useEffect, useState } from "react"
import "./index.scss"
import { CalendarData, CalendarProps } from "./types"

export function WeekCalendar(props: CalendarProps) {

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

  const onClick = (data: CalendarData) => {
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
    <ScrollView scrollIntoView={scrollIntoView} scrollX={true} className={props.className ? "week-calendar-e " + props.className : "week-calendar-e"}>
      {
        datas.map((item, index) =>
          <View onClick={() => onClick(item)} key={`${index}-${item.date}`} id={item.isSelected ? "selected-view-item" : `${index}-${item.date}`}
            className={item.isSelected ? "week-calendar-e-item selected" : "week-calendar-e-item"}>
            <View className="week-calendar-date">
              {item.date}
            </View>
            <View className={index <= thisWeekIndex ? "week-calendar-week passWeek" : "week-calendar-week"}>
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
