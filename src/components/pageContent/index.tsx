
import { FC } from "react";
import { SlideLeftToReturn } from "../slideLeftToReturn";
import { PageWrapProps } from "./types";
import { View } from "@tarojs/components";
import './index.scss'
import Taro from "@tarojs/taro";
import { FlexFillView } from "../flexFillView";
import { PageHeaderTitle } from "../pageHeaderTitle";
import { createClassName } from "@/components/utils";
import { RefreshPage } from "../refreshPage";

const { rootClassNames, classNames } = createClassName("refreshable-page-container")

export const PageWrap: FC<PageWrapProps> = (props) => {
    const { className, title, children, subtitle, style,onBackPage, ...RefreshProps } = props
    const onBackClick = () => {
        onBackPage ? onBackPage?.() : Taro.navigateBack()
    }
    return (
        <SlideLeftToReturn className={rootClassNames(className)}>
            <View className={classNames("page-root",)}>
                <View className={classNames("page-title")}>
                    <PageHeaderTitle title={title} onBackPage={onBackClick} />
                    {subtitle}
                </View>
                <FlexFillView>
                    <RefreshPage {...RefreshProps}>
                        {children}
                    </RefreshPage>
                </FlexFillView>
            </View>
        </SlideLeftToReturn>
    )
}
