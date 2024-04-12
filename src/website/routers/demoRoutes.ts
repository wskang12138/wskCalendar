import { demo as commonCalendar_demo } from '@/website/components/commonCalendar/doc';
import { demo as popCalendar_demo } from "@/website/components/popCalendar/doc";
import { demo as swipeCalendar_demo } from "@/website/components/swipeCalendar/doc";
import { demo as simpleCalendar_demo } from "@/website/components/simpleCalendar/doc";
import { demo as tabsCalendar_demo } from "@/website/components/tabsCalendar/doc";
import { demo as weekCalendar_demo } from '@/website/components/weekCalendar/doc';
import { demo as timeSelectCalendar_demo } from '@/website/components/timeSelectCalendar/doc';

// 示例路由配置
export const demosRoutes = [
    ...commonCalendar_demo.map((item, itemIndex) => ({
    path: `commonCalendar/demo${itemIndex}`,
    component: item,
  })),
  ...popCalendar_demo.map((item, itemIndex) => ({
    path: `popCalendar/demo${itemIndex}`,
    component: item,
  })),
  ...swipeCalendar_demo.map((item, itemIndex) => ({
    path: `swipeCalendar/demo${itemIndex}`,
    component: item,
  })),
  ...simpleCalendar_demo.map((item, itemIndex) => ({
    path: `simpleCalendar/demo${itemIndex}`,
    component: item,
  })),
  ...tabsCalendar_demo.map((item, itemIndex) => ({
    path: `tabsCalendar/demo${itemIndex}`,
    component: item,
  })),
    ...weekCalendar_demo.map((item, itemIndex) => ({
    path: `weekCalendar/demo${itemIndex}`,
    component: item,
    })),
   ...timeSelectCalendar_demo.map((item, itemIndex) => ({
    path: `timeSelectCalendar/demo${itemIndex}`,
    component: item,
  })),
];
