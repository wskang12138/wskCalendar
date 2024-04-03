```jsx
import { Button, View } from "@tarojs/components";
import { NavBar,TabsCandlendar } from "wskcalendar";
import { useState,useEffect } from "react";
import dayjs from "dayjs";
import '../index.scss';
import { getRecentMonths } from "@/utils/calendar";

export const Jsx = () => {

  // 月份信息
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState();

  useEffect(() => {
    if (!months?.length) {
      const mlist = getRecentMonths(5);
      if (!month || !mlist.find((i) => i.value === month))
        setMonth(mlist[mlist.length - 1].value || "");
      setMonths(mlist);
    }
  }, []);

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">选项日历</View>
      <NavBar title='选项日历' bgHeight={106} center/>
      <View className="viewport__main tabs">
        <TabsCandlendar
          list={months}
          value={month}
          onClick={(i) => {
            if (i && i.value !== month) setMonth(i.value);
          }}
        />
        <View className="">{month}</View>
      </View>
    </View>
  );
};
```
