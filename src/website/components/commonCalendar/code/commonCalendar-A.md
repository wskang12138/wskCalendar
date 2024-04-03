```jsx
import { Button, View } from "@tarojs/components";
import { NavBar, CommonCalendar } from "wskcalendar";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../index.scss";

export const Jsx = () => {
  return (
    <View className="iframe__viewport">
      <View className="viewport__title">常用日历</View>
      <NavBar title="常用日历" bgHeight={106} center />
      <View className="viewport__main common">
        <CommonCalendar
          selectedDay={dayjs().format("YYYY-MM-DD")}
          onDayChange={(value) => {
            let choDate = dayjs(value).format("YYYY-MM-DD");
          }}
          getOrderStatus={(date) => {}}
          choseDay={(chose) => {}}
        />
      </View>
    </View>
  );
};
```