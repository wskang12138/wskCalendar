```jsx
import { Button, View } from "@tarojs/components";
import '../index.scss'
import { NavBar,CalendarPop } from "wskcalendar";
import { useState } from "react";
import dayjs from "dayjs";

export const Jsx = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [showTime, setShowTime] = useState(dayjs().format("YYYY-MM-DD"))

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">弹窗日历</View>
      <NavBar title='弹窗日历' bgHeight={106} />
      <View className="viewport__main">
        <Button
          style={{ width: "150px" }}
          type="primary"
          className="list_entry"
          onClick={() => setIsOpen(true)}
        >
          点击
        </Button>
         <View className="calendar__page">{showTime || "请选择日期"}</View>
        <CalendarPop
          canCancel={false}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          confirm={(day) => {
            setShowTime(day);
            setIsOpen(false);
          }}
          data={showTime}
          type="range"
        />
      </View>
    </View>
  );
};
```
