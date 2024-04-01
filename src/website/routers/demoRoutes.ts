
import { demo as Tabs_demo } from '@/website/components/navBar/doc';


// 示例路由配置
export const demosRoutes = [
  ...Tabs_demo.map((item, itemIndex) => ({
    path: `delimiter/demo${itemIndex}`,
    component: item
  })),
]
