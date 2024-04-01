import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { View } from "@tarojs/components";
import { SideBar } from "@/website/layoutCom";
import { componentsSidebarTabs } from "@/website/routers";
import './index.scss';

function Index() {

  return (
    <View className='component-pages'>
      <SideBar className='pages__sidebar' tabs={componentsSidebarTabs} />
      <View className='pages__views'>
        <Suspense fallback={<View className='lazy-fallback'>loading...</View>}>
          <Outlet />
        </Suspense>
      </View>
    </View>
  )
}

export default Index;