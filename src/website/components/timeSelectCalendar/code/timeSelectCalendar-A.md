```jsx
import { Button, View } from "@tarojs/components";
import { NavBar,TimeSelectCalendar } from "wskcalendar";
import { useState,useEffect,useCallback } from "react";
import dayjs from "dayjs";
import '../index.scss';

export const Jsx = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    morning: [
      {
        isSelected: false,
        name: "08:10-08:55",
        disabled: true,
      },
      {
        isSelected: false,
        name: "09:05-09:50",
      },
      {
        isSelected: false,
        name: "10:00-10:45",
      },
      {
        isSelected: false,
        name: "10:55-11:40",
      },
    ],
    afternoon: [
      {
        isSelected: false,
        name: "14:15-14:55",
        disabled: true,
      },
      {
        isSelected: false,
        name: "15:05-15:50",
      },
      {
        isSelected: false,
        name: "16:00-16:45",
      },
      {
        isSelected: false,
        name: "16:55-17:40",
      },
    ],
    night: [
      {
        isSelected: false,
        name: "19:00-19:45",
        disabled: true,
      },
      {
        isSelected: false,
        name: "19:55-20:40",
      },
      {
        isSelected: false,
        name: "20:50-21:35",
      },
      {
        isSelected: false,
        name: "21:45-22:30",
      },
    ],
  });

  // 操控时分弹窗显示
  const handleIsOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  // 确认时间
  const confirmTime = useCallback(
    (_time) => {
      // 更新时间选中数据
      const newTime = {
        morning: time?.morning.map((item) => ({
          ...item,
          isSelected: _time.morning.some((_item) => _item.name === item.name),
        })),
        afternoon: time?.afternoon.map((item) => ({
          ...item,
          isSelected: _time.afternoon.some((_item) => _item.name === item.name),
        })),
        night: time?.night.map((item) => ({
          ...item,
          isSelected: _time.night.some((_item) => _item.name === item.name),
        })),
      };
      setTime(newTime);
      handleIsOpen();
    },
    [time, handleIsOpen]
  );


  return (
    <View className="iframe__viewport">
      <View className="viewport__title">时间日历</View>
      <NavBar title='选择时间' bgHeight={106} center/>
      <View className="viewport__main tabs">
         <Button
          style={{ width: '150px' }}
          type='primary'
          className='list_entry'
          onClick={() => setIsOpen(true)}
        >点击
        </Button>
        <TimeSelectCalendar
          type="A"
          timeProps={{
            ...time,
            isOpen: isOpen,
            confirm: confirmTime,
            onClose: handleIsOpen,
          }}
        />
      </View>
       <View className="calendar__page">{"请选择日期"}</View>
    </View>
  );
};
```
