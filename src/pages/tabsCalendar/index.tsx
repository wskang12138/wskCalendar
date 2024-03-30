import { View } from "@tarojs/components";
import './index.scss'
import { NavBar, TabsCandlendar } from "@/components";
import { useEffect, useState } from "react";
import { TabItemDataApi } from "@/components/tabsCanlendar/types";
import { getRecentMonths } from "@/utils/calendar";

export default function Index() {

  // 月份信息
  const [months, setMonths] = useState<TabItemDataApi[]>([]);
  const [month, setMonth] = useState<any>();

  useEffect(() => {
    if (!months?.length) {
      const mlist:any = getRecentMonths(5);
      if (!month || !mlist.find((i) => i.value === month))
        setMonth(mlist[mlist.length - 1].value || "");
      setMonths(mlist);
    }
  }, []);

  return (
    <View className='page'>
      <NavBar title='选项日历' bgHeight={106} />
      <View className='pages_content'>
        <TabsCandlendar
          list={months}
          value={month}
          onClick={(i: TabItemDataApi) => {
            if (i && i.value !== month) setMonth(i.value);
          }}
        />
        <View className="">{month}</View>
      </View>
    </View >
  )
}

