import { ITouchEvent, View } from '@tarojs/components'
import { Component } from 'react'
import Taro from "@tarojs/taro"
import { SlideLeftToReturnProps } from './types'

export class SlideLeftToReturn extends Component<SlideLeftToReturnProps, {}> {
    private returnPage: boolean = false;
    private touchStartX: number = 0;
    private touchEndX: number = 0;
    private touchStartY: number = 0;
    private touchEndY: number = 0;
    private startTime: number
    private endTime: number
    constructor(props) {
        super(props);
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.state = {}
    }
    onTouchStart(e: ITouchEvent) {
        if (!e.changedTouches[0]) { return }
        this.touchStartX = e.changedTouches[0].pageX || e.changedTouches[0].screenX
        this.touchStartY = e.changedTouches[0].pageY || e.changedTouches[0].screenY
        this.returnPage = false
        this.startTime = (new Date()).getTime()
    }
    onTouchMove(e) {
        if (!e.changedTouches[0]) { return }
        let touchX = e.changedTouches[0].pageX || e.changedTouches[0].screenX;
        this.returnPage = touchX - this.touchStartX > 60 ? true : false
    }
    onTouchEnd(e) {
        if (!e.changedTouches[0]) { return }
        let { onReturn, disable } = this.props;
        this.touchEndX = e.changedTouches[0].pageX || e.changedTouches[0].screenX
        this.touchEndY = e.changedTouches[0].pageY || e.changedTouches[0].screenY
        this.endTime = (new Date()).getTime();
        if (this.endTime - this.startTime > 500) { return }
        if (Math.abs(this.touchStartY - this.touchEndY) > 25) { return }
        if (this.returnPage && !disable) {
            onReturn ? onReturn() : Taro.navigateBack({ delta: 1 })
            this.returnPage = false;
        }
    }
    render() {
        const { children, className, style } = this.props;
        return (
            <View
                className={`slide-back-to-previous-root ${className || ''}`}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                style={style}
            >
                {children}
            </View>
        )
    }
}
