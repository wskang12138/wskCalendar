import { ReactNode } from "react";
import { BaseProps } from "@/types/BaseComponent"

export interface PageWrapProps extends BaseProps {
    subtitle?: ReactNode
    title?: ReactNode | string
    onDown?: () => void;// 下拉刷新回调方法，如果需要下拉则不能为空
    onPull?: () => void;// 上拉加载回调防范，如果需要下拉则不能为空
    onUpper?: () => void;// 滚动条滚动到顶部回调，可为空
    onLower?: () => void;// 滚动条滚动到底部回调，可为空
    onBackPage?():void

    downText?: string[];// 下拉刷新提示语，两位数组（例: ['下拉刷新', '释放刷新']），可为空
    pullText?: string[];// 下拉加载提示语，两位数组（例: ['上拉加载更多', '释放加载更多']），可为空
}
