import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { View } from "@tarojs/components";
import { SideBar } from "@/website/layoutCom";
import { apiSidebarTabs } from "@/website/routers";
import './index.scss';

function Index() {

  return (
    <View className='api-pages'>
      <SideBar className='pages__sidebar' tabs={apiSidebarTabs} />
      <View className='pages__views'>
        <Suspense fallback={<View className='lazy-fallback'>loading...</View>}>
          <Outlet />
        </Suspense>
      </View>
    </View>
  )
}

export default Index;