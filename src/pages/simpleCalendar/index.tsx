import { View } from "@tarojs/components";
import './index.scss'
import { NavBar, PageWrap } from "@/components";
import { SimpleCalendar } from "@/components/simpleCalendar";
import { DayItemApi } from "@/utils/calendar";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";
import { useState } from "react";

export default function Index() {

  const [singleChoiceDateParent, setSingleChoiceDateParent] = useState([])

  return (
    <View className='page'>
      <PageWrap
        title='简单日历'
        className={"view"}
      >
        <View className='page_content'>
          <SimpleCalendar
            startDate={dayjs().add(1, "day").format('YYYY-MM-DD')}
            disableDate={(date: DayItemApi) => {
              return (
                !dayjs(date.date).isAfter(dayjs().add(30, "day")) // 在可选范围之前
              )
            }}
            onDayClick={(day: DayItemApi) => {
              const date = day.date
              let newDate: any = [...singleChoiceDateParent]
              if (newDate.find((i: string) => i === date)) newDate = newDate.filter((i: string) => i !== date)
              newDate.push(date)
              newDate = newDate.sort()
              setSingleChoiceDateParent(newDate)
            }}
            data={singleChoiceDateParent}
          />
        </View>
        </PageWrap>
    </View >
  )
}
