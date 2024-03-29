import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { SwipeCalendar } from "@/components/swipeCalendar";
import { useState } from "react";
import dayjs from "dayjs";

export default function Index() {
    const [day,setDay] = useState(dayjs().format('YYYY-yy-MM'))
    function weekChange(day) {
        setDay(day)
    }

    return (
        <View className='page'>
            <NavBar title='滑动日历' bgHeight={106} />
            <View className='pages_content'>
                <SwipeCalendar
                    onChange={(day) => { weekChange(day) }}
                />
                <View className="">{day}</View>
            </View>
        </View >
    )
}
