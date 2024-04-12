import { Button, View } from "@tarojs/components";
import './index.scss'
import { NavBar, TimeBSelect } from "@/components";
import { useState } from "react";
import dayjs from "dayjs";

export default function Index() {
  
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const today = dayjs();
  let currentTime = `${today.hour()}:${today.minute()}:${today.second()}`
  
  return (
    <View className='page'>
      <NavBar title='时间选择日历' bgHeight={106} />
      <View className='page_content'>
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
          value={currentTime}
          onClose={function (): void {
            setIsOpen(false)
          }}></TimeBSelect>
      </View>
    </View >
  )
}
