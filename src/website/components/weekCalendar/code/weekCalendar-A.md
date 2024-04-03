```jsx
import { Button, View } from "@tarojs/components";
import { NavBar,WeekCalendar } from "wskcalendar";
import { useState,useEffect,useCallback } from "react";
import dayjs from "dayjs";
import '../index.scss';
import { getRecentMonths } from "@/utils/calendar";

export const Jsx = () => {
 const [datas, setDatas] = useState([
    {
      date: "01-07",
      week: "第1周",
    },
    {
      date: "08-14",
      week: "本周",
      isThisWeek: true,
      isSelected: true,
    },
    {
      date: "15-21",
      week: "第3周",
    },
    {
      date: "22-28",
      week: "第4周",
    },
    {
      date: "29-04",
      week: "第5周",
    },
  ]);

  const changeDate = useCallback(
    (_data) => {
      // 重置并更新isSelected
      const newDatas = datas.map((item) => ({
        ...item,
        isSelected: item.date === _data.date,
      }));
      setDatas(newDatas);
    },
    [datas]
  );

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">选项日历</View>
      <NavBar title='选项日历' bgHeight={106} center/>
      <View className="viewport__main tabs">
        <WeekCalendar
          datas={datas}
          onChange={changeDate}
        />
      </View>
    </View>
  );
};
```
