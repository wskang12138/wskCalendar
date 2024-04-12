import { lazy } from 'react';

// 页面
const HomePage = lazy(() => import('@/website/home/index'));
const GuidePage = lazy(() => import('@/website/guide/index'));
const ComponentPages = lazy(() => import('@/website/components/index'));
// 指南
const QuickStart = lazy(() => import('@/website/guide/quick-start'));
const ColorStandard = lazy(() => import('@/website/guide/color-standard'));

// 组件
const CommonCalendar = lazy(() => import('@/website/components/commonCalendar'));
const PopCalendar = lazy(() => import('@/website/components/popCalendar'));
const SwipeCalendar =  lazy(()=> import('@/website/components/swipeCalendar'));
const SimpleCalendar =  lazy(()=> import('@/website/components/simpleCalendar'));
const TabsCalendar = lazy(() => import('@/website/components/tabsCalendar'));
const WeekCalendar = lazy(() => import('@/website/components/weekCalendar'));
const TimeSelectCalendar = lazy(() => import('@/website/components/timeSelectCalendar'));

// 页面路由配置
export const websiteRoutes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'guide',
    component: GuidePage,
    subRoutes: [
      {
        path: 'quick-start',
        component: QuickStart
      },
      {
        path: 'color-standard',
        component: ColorStandard
      },
    ]
  },
  {
    path: 'components',
    component: ComponentPages,
    subRoutes: [
      {
        path: 'commonCalendar',
        component: CommonCalendar
      },
      {
        path: 'popCalendar',
        component: PopCalendar
      },
      {
        path: 'swipeCalendar',
        component: SwipeCalendar
      },
      {
        path: 'simpleCalendar',
        component: SimpleCalendar
      },
       {
        path: 'tabsCalendar',
        component: TabsCalendar
      },
      {
        path: 'weekCalendar',
        component: WeekCalendar
      },
      {
        path: 'timeSelectCalendar',
        component: TimeSelectCalendar
      },
    ]
  },

]
