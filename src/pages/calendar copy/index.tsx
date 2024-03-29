import { Button, View } from "@tarojs/components";
import './index.scss'
import { NavBar, CalendarPop } from "@/components";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { LgCalendarE } from "@/components/LgCalendarE";

export default function Index() {

    const [isOpen, setIsOpen] = useState(false)
    const [showTime, setShowTime] = useState(dayjs().format("YYYY-MM-DD"))
    const [datas, setDatas] = useState<any>([
        {
            date: "01-07",
            week: "第1周",
        },
        {
            date: "08-14",
            week: "本周",
            isThisWeek: true,
            isSelected: true,
        },
        {
            date: "15-21",
            week: "第3周",
        },
        {
            date: "22-28",
            week: "第4周",
        },
        {
            date: "29-04",
            week: "第5周",
        },
    ]);

    const changeDate = useCallback(
        (_data) => {
            // 重置并更新isSelected
            const newDatas = datas.map((item) => ({
                ...item,
                isSelected: item.date === _data.date,
            }));
            setDatas(newDatas);
        },
        [datas]
    );

    return (
        <View className='page'>
            <NavBar title='弹窗日历' bgHeight={106} />
            <View className='page_content'>
                <Button
                    style={{ width: '150px' }}
                    type='primary'
                    className='list_entry'
                    onClick={() => setIsOpen(true)}
                >点击
                </Button>
                <View className="time">
                    {showTime}
                </View>
                <LgCalendarE
                    datas={datas}
                    onChange={changeDate}
                />
            </View>
        </View >
    )
}
