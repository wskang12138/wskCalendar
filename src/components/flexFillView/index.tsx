import "./index.scss"
import { memo } from "react";
import { View } from "@tarojs/components";


export const FlexFillView = memo((props:any) => {
    return (
        <View className="flex-fill-view-root">
            <View className="flex-fill-view-wrapper">
                {props.children}
            </View>
        </View>
    )
})
