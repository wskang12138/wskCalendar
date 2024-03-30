import { initThePageNavigationBar } from "@/utils/calendar"
import { View } from "@tarojs/components"
import { NavBar } from "../navbar"

export const PageHeaderTitle = (props) => {
    let { title ,onBackPage} = props
    return (
        <View className='top-view'>
            {
                initThePageNavigationBar(
                    <NavBar className='nav-custom-bar' title={title}  onBackHome={onBackPage} />,
                    title
                )
            }
        </View>
    )
}
