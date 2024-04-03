```jsx
import { Button, View } from "@tarojs/components";
import '../index.scss'
import { PageWrap,SimpleCalendar } from "wskcalendar";
import { useState } from "react";
import dayjs from "dayjs";

export const Jsx = () => {
  const [singleChoiceDateParent, setSingleChoiceDateParent] = useState([])
  return (
    <View className="iframe__viewport">
      <View className="viewport__title">滑动日历</View>
     <PageWrap
        title='简单日历'
        className={"view"}
      >
        <View className='page_content'>
          <SimpleCalendar
            startDate={dayjs().add(1, "day").format('YYYY-MM-DD')}
            disableDate={(date) => {
              return (
                !dayjs(date.date).isAfter(dayjs().add(30, "day")) // 在可选范围之前
              )
            }}
            onDayClick={(day) => {
              const date = day.date
              let newDate = [...singleChoiceDateParent]
              if (newDate.find((i) => i === date)) newDate = newDate.filter((i) => i !== date)
              newDate.push(date)
              newDate = newDate.sort()
              setSingleChoiceDateParent(newDate)
            }}
            data={singleChoiceDateParent}
          />
        </View>
        </PageWrap>
    </View>
  );
};
```
