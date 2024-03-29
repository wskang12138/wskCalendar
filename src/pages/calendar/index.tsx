import { Button, View } from "@tarojs/components";
import './index.scss'
import { NavBar,CalendarPop } from "@/components";
import { useState } from "react";
import dayjs from "dayjs";

export default function Index() {

    const [isOpen, setIsOpen] = useState(false)
    const [showTime, setShowTime] = useState(dayjs().format("YYYY-MM-DD"))

    return (
        <View className='page'>
            <NavBar title='弹窗日历' bgHeight={106} />
            <View className='page_content'>
                <Button
                    style={{width:'150px'}}
                    type='primary'
                    className='list_entry'
                    onClick={() => setIsOpen(true)}
                >点击
                </Button>
                <View className="time">
                    {showTime}
                </View>
                <CalendarPop
                    canCancel={false}
                    isOpen={isOpen}
                    onClose={() => { setIsOpen(false) }}
                    confirm={(day: string) => {
                        setShowTime(day)
                        setIsOpen(false)
                    }}
                    data={showTime}
                    type="radio"
                />
            </View>
        </View >
    )
}
