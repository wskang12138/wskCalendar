import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { SwipeCalendar } from "@/components/swipeCalendar";

export default function Index() {
  
    function weekChange(day) {
        console.log(day,8888)
    }

    return (
        <View className='page'>
            <NavBar title='滑动日历' bgHeight={106} />
            <View className='pages_content'>
                <SwipeCalendar
                    onChange={(day) => { weekChange(day) }}
                />
            </View>
        </View >
    )
}
