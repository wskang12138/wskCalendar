```jsx
import { Button, View } from "@tarojs/components";
import { NavBar ,TimeBSelect} from "wskcalendar";
import { useState,useEffect,useCallback } from "react";
import dayjs from "dayjs";
import '../index.scss';

export const Jsx = () => {

  const today = dayjs();
  const [isOpen, setIsOpen] = useState(false)
  const [time, setTime] = useState("16:30:00");

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">时间日历</View>
      <NavBar title='选项时间' bgHeight={106} center/>
      <View className="viewport__main tabs">
        <Button
          style={{ width: '150px' }}
          type='primary'
          className='list_entry'
          onClick={() => setIsOpen(true)}
        >点击
        </Button>
        <TimeBSelect
          isOpen={isOpen}
          onChange={(day) => { console.log(day); setIsOpen(false) }}
          name={"选择时间"}
          value={time}
          onClose={function (){
            setIsOpen(false)
          }}></TimeBSelect>

      </View>
       <View className="calendar__page">{ time || "请选择日期"}</View>
    </View>
  );
};
```
