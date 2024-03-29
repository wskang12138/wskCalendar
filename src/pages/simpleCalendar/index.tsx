import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { SimpleCalendar } from "@/components/simpleCalendar";

export default function Index() {

    return (
        <View className='page'>
            <NavBar title='简单日历' bgHeight={106} />
            <View className='page_content'>
                <SimpleCalendar  />
            </View>
        </View >
    )
}
