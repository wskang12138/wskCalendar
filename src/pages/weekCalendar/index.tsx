import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { SwipeCalendar } from "@/components/swipeCalendar";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { WeekCalendar } from "@/components/weekCalendar";

export default function Index() {

    const [date, setDate] = useState("");

    const changeDate = useCallback((_date) => {
        setDate(_date);
    }, []);

    return (
        <View className='page'>
            <NavBar title='滑动日历' bgHeight={106} />
            <View className='pages_content'>
                <WeekCalendar
                    selectedDay="2023-04-06"
                    onDayChange={changeDate}
                    markDays={["2023-04-08", "2023-04-09"]}
                />
                <View className="">{date}</View>
            </View>
        </View >
    )
}
