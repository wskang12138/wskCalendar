import { useState,useEffect } from "react"
import { View, Text, ITouchEvent,Button } from "@tarojs/components"

import { PopLayer } from "../popLayer";
import "./index.scss"
import { TimeSelectAProps } from "./types";

export function TimeASelect(props: TimeSelectAProps) {

  const [morning, setMorning] = useState(props.morning ? props.morning.slice() : [])

  useEffect(() => {
    setMorning(props.morning ? props.morning.slice() : [])
  }, [props.morning])

  const morningItemClick = (_event: ITouchEvent, index: number) => {
    if (!morning[index].disabled) {
      morning[index].isSelected = !morning[index].isSelected
      setMorning([...morning])
    }
  }

  const [afternoon, setAfternoon] = useState(props.afternoon ? props.afternoon.slice() : [])
  const afternoonItemClick = (_event: ITouchEvent, index: number) => {
    if (!afternoon[index].disabled) {
      afternoon[index].isSelected = !afternoon[index].isSelected
      setAfternoon([...afternoon])
    }
  }
  useEffect(() => {
    setAfternoon(props.afternoon ? props.afternoon.slice() : [])
  }, [props.afternoon])

  const [night, setNight] = useState(props.night ? props.night.slice() : [])
  const nightItemClick = (_event: ITouchEvent, index: number) => {
    if (!night[index].disabled) {
      night[index].isSelected = !night[index].isSelected
      setNight([...night])
    }
  }

  useEffect(() => {
    setNight(props.night ? props.night.slice() : [])
  }, [props.night])


  const onClose = () => {
    if (props.onClose) {
      props.onClose()
    }
  }

  const onOkClick = () => {
    if (props.confirm) {
      let selectedMorning = morning.filter(item => item.isSelected)
      let selectedAfternoon = afternoon.filter(item => item.isSelected)
      let selectedNight = night.filter(item => item.isSelected)
      props.confirm({ morning: selectedMorning, afternoon: selectedAfternoon, night: selectedNight })
    }
  }

  const onResetClick = () => {
    morning.forEach(value => value.isSelected = false)
    afternoon.forEach(value => value.isSelected = false)
    night.forEach(value => value.isSelected = false)
    setMorning([...morning])
    setAfternoon([...afternoon])
    setNight([...night])
  }


  return (
    <PopLayer titleColor={"#000"} showCloseColor={"#ccc"} isOpen={props.isOpen} position="bottom" showLayer={onClose}
      showClose title="选择时间" customContentClass="time-select-pop">
      <View className={`time-select ${props.className || ""}`}>
        <View className="time-content">
          <View className="time-slot-wrapper morning">
            <Text>上午</Text>
            <View className="time-slot">
              {
                morning.map((item, index) => (
                  <View key={index}
                    className={item.isSelected ? "time-slot-item selected" : "time-slot-item"}
                    onClick={event => morningItemClick(event, index)}>
                    <Text style={{ opacity: item.disabled ? "0.5" : "1" }} className="text">{item.name}</Text>
                  </View>
                ))
              }
              {
                paddingView()
              }
            </View>
          </View>
          <View className="time-slot-wrapper afternoon">
            <Text>下午</Text>
            <View className="time-slot">
              {
                afternoon.map((item, index) => (
                  <View key={index} className={item.isSelected ? "time-slot-item selected" : "time-slot-item"}
                    onClick={event => afternoonItemClick(event, index)}>
                    <Text style={{ opacity: item.disabled ? "0.5" : "1" }} className="text">{item.name}</Text>
                  </View>
                ))
              }
              {
                paddingView()
              }
            </View>
          </View>
          <View className="time-slot-wrapper night">
            <Text>晚上</Text>
            <View className="time-slot">
              {
                night.map((item, index) => (
                  <View key={index} className={item.isSelected ? "time-slot-item selected" : "time-slot-item"}
                    onClick={event => nightItemClick(event, index)}>
                    <Text style={{ opacity: item.disabled ? "0.5" : "1" }} className="text">{item.name}</Text>
                  </View>
                ))
              }
              {
                paddingView()
              }
            </View>
          </View>
        </View>
      </View>
      <View className="time-select-footer" style={{ display: props.isOpen ? "flex" : "none" }}>
        <Button onClick={onResetClick}  className="time-select-footer-reset">重置</Button>
        <Button onClick={onOkClick} className="time-select-footer-confirm">确定</Button>
      </View>
    </PopLayer>
  )
}

function paddingView() {
  return (
    <>
      <View className="time-slot-item-empty">
      </View>
      <View className="time-slot-item-empty">
      </View>
      <View className="time-slot-item-empty">
      </View>
    </>
  )
}
