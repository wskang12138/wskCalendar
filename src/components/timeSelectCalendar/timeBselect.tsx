import { View, ITouchEvent, Button } from "@tarojs/components"
import { Component } from "react"
import { PopLayer } from "../popLayer";
import "./index.scss"
import { TimeSelectBProps, TimeSelectBState } from "./types";

type ColumnType = "hour" | "minute" | "second"

const multiSelector = {
    hours: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'],
    minutes:
        ['00分', '01分', '02分', '03分', '04分', '05分', '06分', '07分', '08分', '09分'
            , '10分', '11分', '12分', '13分', '14分', '15分', '16分', '17分', '18分', '19分'
            , '20分', '21分', '22分', '23分', '24分', '25分', '26分', '27分', '28分', '29分'
            , '30分', '31分', '32分', '33分', '34分', '35分', '36分', '37分', '38分', '39分'
            , '40分', '41分', '42分', '43分', '44分', '45分', '46分', '47分', '48分', '49分'
            , '50分', '51分', '52分', '53分', '54分', '55分', '56分', '57分', '58分', '59分'],
    seconds:
        ['00秒', '01秒', '02秒', '03秒', '04秒', '05秒', '06秒', '07秒', '08秒', '09秒'
            , '10秒', '11秒', '12秒', '13秒', '14秒', '15秒', '16秒', '17秒', '18秒', '19秒'
            , '20秒', '21秒', '22秒', '23秒', '24秒', '25秒', '26秒', '27秒', '28秒', '29秒'
            , '30秒', '31秒', '32秒', '33秒', '34秒', '35秒', '36秒', '37秒', '38秒', '39秒'
            , '40秒', '41秒', '42秒', '43秒', '44秒', '45秒', '46秒', '47秒', '48秒', '49秒'
            , '50秒', '51秒', '52秒', '53秒', '54秒', '55秒', '56秒', '57秒', '58秒', '59秒'],
}

let lgTimeBSelectId = 0

export class TimeBSelect extends Component<TimeSelectBProps, TimeSelectBState> {

    private hourYStart: number
    private minuteYStart: number
    private secondYStart: number
    private itemHeight: number
    private id: string
    private nextHourScrollTop: number
    private nextMinuteScrollTop: number
    private nextSecondScrollTop: number
    private hourIndex: number
    private minuteIndex: number
    private secondIndex: number

    constructor(props) {
        super(props)

        this.state = {
            hourY: 0,
            minuteY: 0,
            secondY: 0,
            hourTransition: "none",
            minteTransition: "none",
            secondTransition: "none"
        }

        this.hourYStart = 0
        this.minuteYStart = 0
        this.secondYStart = 0
        this.id = `time-b-select-${lgTimeBSelectId++}`
        this.nextHourScrollTop = 0
        this.nextMinuteScrollTop = 0
        this.nextSecondScrollTop = 0
        this.hourIndex = 0
        this.minuteIndex = 0
        this.secondIndex = 0
        if (this.props.value) {
            let arr = this.props.value.split(":")
            if (arr.length != 3) {
                throw new Error("时间选择B款时间格式不正确")
            }
            this.hourIndex = parseInt(arr[0])
            this.minuteIndex = parseInt(arr[1])
            this.secondIndex = parseInt(arr[2])
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        if (this.props.onChange) {
            let hour = multiSelector.hours[this.hourIndex].replace("时", "")
            let minute = multiSelector.minutes[this.minuteIndex].replace("分", "")
            let second = multiSelector.seconds[this.secondIndex].replace("秒", "")
            this.props.onChange(hour + ":" + minute + ":" + second)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: TimeSelectBProps) {
        if (this.props.value != nextProps.value) {
            if (nextProps.value) {
                let arr = nextProps.value.split(":")
                if (arr.length != 3) {
                    throw new Error("时间选择B款时间格式不正确")
                }
                this.hourIndex = parseInt(arr[0])
                this.minuteIndex = parseInt(arr[1])
                this.secondIndex = parseInt(arr[2])
                this.setState({
                    hourY: (this.hourIndex - 3) * this.itemHeight,
                    minuteY: (this.minuteIndex - 3) * this.itemHeight,
                    secondY: (this.secondIndex - 3) * this.itemHeight
                })
            }
        }
    }

    setLastMoveY(column: ColumnType, value: number) {
        switch (column) {
            case "hour":
                this.hourYStart = value
                break
            case "minute":
                this.minuteYStart = value
                break
            case "second":
                this.secondYStart = value
                break
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    getLastMoveY(column: ColumnType) {
        switch (column) {
            case "hour":
                return this.hourYStart
            case "minute":
                return this.minuteYStart
            case "second":
                return this.secondYStart
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    getMoveMaxY(column: ColumnType) {
        switch (column) {
            case "hour":
                return this.itemHeight * (multiSelector.hours.length - 4)
            case "minute":
                return this.itemHeight * (multiSelector.minutes.length - 4)
            case "second":
                return this.itemHeight * (multiSelector.seconds.length - 4)
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    getCurrentScrollY(column: ColumnType) {
        switch (column) {
            case "hour":
                return this.state.hourY
            case "minute":
                return this.state.minuteY
            case "second":
                return this.state.secondY
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    setCurrentScrollY(column: ColumnType, newScrollY: number) {
        switch (column) {
            case "hour":
                this.setState({
                    hourY: newScrollY
                })
                break
            case "minute":
                this.setState({
                    minuteY: newScrollY
                })
                break
            case "second":
                this.setState({
                    secondY: newScrollY
                })
                break
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    setTransition(column: ColumnType, transition: string) {
        switch (column) {
            case "hour":
                this.setState({
                    hourTransition: transition
                })
                break
            case "minute":
                this.setState({
                    minteTransition: transition
                })
                break
            case "second":
                this.setState({
                    secondTransition: transition
                })
                break
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    getNextScrollTop(column: ColumnType) {
        switch (column) {
            case "hour":
                return this.nextHourScrollTop
            case "minute":
                return this.nextMinuteScrollTop
            case "second":
                return this.nextSecondScrollTop
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    setNextScrollTop(column: ColumnType, nextScrollTop: number) {
        switch (column) {
            case "hour":
                this.nextHourScrollTop = nextScrollTop
                break
            case "minute":
                this.nextMinuteScrollTop = nextScrollTop
                break
            case "second":
                this.nextSecondScrollTop = nextScrollTop
                break
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    getCurrentIndex(column: ColumnType) {
        switch (column) {
            case "hour":
                return this.hourIndex
            case "minute":
                return this.minuteIndex
            case "second":
                return this.secondIndex
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    setCurrentIndex(column: ColumnType, index: number) {
        switch (column) {
            case "hour":
                this.hourIndex = index
                break
            case "minute":
                this.minuteIndex = index
                break
            case "second":
                this.secondIndex = index
                break
            default:
                throw new Error("column的值必须为：\"hour\" | \"minute\" | \"second\"")
        }
    }

    onTouchStart(event: ITouchEvent, column: ColumnType) {
        event.stopPropagation()
        event.preventDefault()
        const moveY = event.changedTouches[0].screenY || event.changedTouches[0].pageY
        this.setTransition(column, "none")
        this.setLastMoveY(column, moveY)
    }

    onTouchMove(event: ITouchEvent, column: ColumnType) {
        const moveY = event.changedTouches[0].screenY || event.changedTouches[0].pageY
        let lastMoveY = this.getLastMoveY(column)
        const distance = moveY - lastMoveY
        const currentScrollY = this.getCurrentScrollY(column)
        const maxY = this.getMoveMaxY(column)
        let newScrollY = currentScrollY - distance
        if (newScrollY < -this.itemHeight * 3) {
            newScrollY = -this.itemHeight * 3
        }
        if (newScrollY > maxY) {
            newScrollY = maxY
        }
        this.setCurrentScrollY(column, newScrollY)
        this.setNextScrollTop(column, newScrollY)
        this.setLastMoveY(column, moveY)
    }

    onTouchEnd(_event: ITouchEvent, column: ColumnType) {
        const realScrollY = this.getNextScrollTop(column) //+ (this.itemHeight * 3)
        const index = Math.round(realScrollY / this.itemHeight)
        this.setTransition(column, "all 0.2s")
        this.setCurrentScrollY(column, index * this.itemHeight)
        this.setCurrentIndex(column, index + 3)
    }

    componentDidMount() {
        setTimeout(() => {
            let dom = document.querySelector('.time-select-b-column-panel-item')
            if (dom) {
                this.itemHeight = dom?.getBoundingClientRect().height
                this.setState({
                    hourY: (this.hourIndex - 3) * this.itemHeight,
                    minuteY: (this.minuteIndex - 3) * this.itemHeight,
                    secondY: (this.secondIndex - 3) * this.itemHeight
                })
            }
        }, 200)
    }

    render() {
        const pickerValue = [0, 0, 0]
        if (this.props.value) {
            let arrs = this.props.value.split(":")
            pickerValue[0] = multiSelector.hours.findIndex(item => item == arrs[0] + "时")
            pickerValue[1] = multiSelector.minutes.findIndex(item => item == arrs[1] + "分")
            pickerValue[2] = multiSelector.seconds.findIndex(item => item == arrs[2] + "秒")
        }

        const hourTranslateY = -this.state.hourY
        const minuteTranslateY = -this.state.minuteY
        const secondeTranslateY = -this.state.secondY

        return (
            <PopLayer titleColor={"#000"} showCloseColor={"#ccc"} isOpen={this.props.isOpen} position="bottom"
                showLayer={this.props.onClose} showClose title="选择时间">
                <View id={this.id} className={` time-select-b ${this.props.className || ""}`}>
                    <View className="time-select-b-title">
                        <View>时</View>
                        <View>分</View>
                        <View>秒</View>
                    </View>
                    <View className="time-select-b-content">
                        <View className="time-select-b-column-hour">
                            <View onTouchStart={(e: any) => this.onTouchStart(e, "hour")}
                                onTouchMove={(e: any) => this.onTouchMove(e, "hour")}
                                onTouchEnd={(e: any) => this.onTouchEnd(e, "hour")}
                                className="time-select-b-column-mask"></View>
                            <View className="time-select-b-column-line-mask">
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                            </View>
                            <View style={{ transform: `translateY(${hourTranslateY}px)`, transition: this.state.hourTransition }}
                                className="time-select-b-column-panel">
                                {
                                    multiSelector.hours.map((item, index) => (
                                        <View className="time-select-b-column-panel-item" key={index}>{item}</View>))
                                }
                            </View>
                        </View>
                        <View className="time-select-b-column-minute">
                            <View onTouchStart={(e: any) => this.onTouchStart(e, "minute")}
                                onTouchMove={(e: any) => this.onTouchMove(e, "minute")}
                                onTouchEnd={(e: any) => this.onTouchEnd(e, "minute")}
                                className="time-select-b-column-mask"></View>
                            <View className="time-select-b-column-line-mask">
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                            </View>
                            <View style={{ transform: `translateY(${minuteTranslateY}px)`, transition: this.state.minteTransition }}
                                className="time-select-b-column-panel">
                                {
                                    multiSelector.minutes.map((item, index) => (
                                        <View className="time-select-b-column-panel-item" key={index}>{item}</View>))
                                }
                            </View>
                        </View>
                        <View className="time-select-b-column-second">
                            <View onTouchStart={(e: any) => this.onTouchStart(e, "second")}
                                onTouchMove={(e: any) => this.onTouchMove(e, "second")}
                                onTouchEnd={(e: any) => this.onTouchEnd(e, "second")}
                                className="time-select-b-column-mask"></View>
                            <View className="time-select-b-column-line-mask">
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                                <View className="line"></View>
                            </View>
                            <View style={{ transform: `translateY(${secondeTranslateY}px)`, transition: this.state.secondTransition }}
                                className="time-select-b-column-panel">
                                {
                                    multiSelector.seconds.map((item, index) => (
                                        <View className="time-select-b-column-panel-item" key={index}>{item}</View>))
                                }
                            </View>
                        </View>
                    </View>
                    <View className="time-select-b-footer">
                        <Button onClick={this.onChange} className="time-select-b-footer-button">完成</Button>
                    </View>
                </View>
            </PopLayer>
        )
    }
}
