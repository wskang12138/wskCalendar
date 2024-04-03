```jsx
import { Button, View } from "@tarojs/components";
import { NavBar,SwipeCalendar } from "wskcalendar";
import { useState } from "react";
import dayjs from "dayjs";
import '../index.scss';

export const Jsx = () => {

  const [day, setDay] = useState(dayjs().format('YYYY-yy-MM'))
  function weekChange(day) {
    setDay(day)
  }

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">滑动日历</View>
      <NavBar title='弹窗日历' bgHeight={106} center/>
      <View className="viewport__main swipe">
        <SwipeCalendar
          onChange={(day) => { weekChange(day); }}  />
        <View className="">{day}</View>
      </View>
    </View>
  );
};
```
