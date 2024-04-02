import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { CommonCalendar } from "@/components/commonCalendar";
import dayjs from "dayjs";
export default function Index() {

  return (
    <View className='page'>
      <NavBar title='常用日历' bgHeight={106} />
      <View className='page_content'>
        <View className={"choose-a-meal-stop-time"}>
          <CommonCalendar
            selectedDay={dayjs().format("YYYY-MM-DD")}
            onDayChange={(value) => {
            let choDate = dayjs(value).format('YYYY-MM-DD')
            }}
           getOrderStatus={(date)=>{}}
           choseDay={(chose)=>{}}
           />
        </View>
      </View>
    </View>
  )
}
