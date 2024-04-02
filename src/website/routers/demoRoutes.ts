
import { demo as popCalendar_demo } from '@/website/components/popCalendar/doc';
import { demo as swipeCalendar_demo } from '@/website/components/swipeCalendar/doc';

// 示例路由配置
export const demosRoutes = [
  ...popCalendar_demo.map((item, itemIndex) => ({
    path: `popCalendar/demo${itemIndex}`,
    component: item
  })),
  ...swipeCalendar_demo.map((item, itemIndex) => ({
    path: `swipeCalendar/demo${itemIndex}`,
    component: item
  })),
]
