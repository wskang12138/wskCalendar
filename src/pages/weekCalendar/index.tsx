import { View } from "@tarojs/components";
import './index.scss'
import { NavBar } from "@/components";
import { useCallback, useState } from "react";
import { WeekCalendar } from "@/components/weekCalendar";


export default function Index() {

  const [datas, setDatas] = useState<any>([
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
    <View className='page'>
      <NavBar title='滑动星期日历' bgHeight={106} />
      <View className='page_content'>
        <WeekCalendar
          datas={datas}
          onChange={changeDate}
        />
      </View>
    </View >
  )
}
