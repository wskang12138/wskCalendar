import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { View } from "@tarojs/components";
import { SideBar } from "@/website/layoutCom";
import { guideSidebarTabs } from "@/website/routers";
import './index.scss';

function Index() {

  return (
    <View className='guide-pages'>
      <SideBar className='pages__sidebar' tabs={guideSidebarTabs} />
      <View className='pages__views'>
        <Suspense fallback={<View className='lazy-fallback'>loading...</View>}>
          <Outlet />
        </Suspense>
      </View>
    </View>
  )
}

export default Index;
