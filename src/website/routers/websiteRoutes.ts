import { lazy } from 'react';

// 页面
const HomePage = lazy(() => import('@/website/home/index'));
const GuidePage = lazy(() => import('@/website/guide/index'));
const ComponentPages = lazy(() => import('@/website/components/index'));
// 指南
const QuickStart = lazy(() => import('@/website/guide/quick-start'));
const ColorStandard = lazy(() => import('@/website/guide/color-standard'));

// 组件
const PopCalendar = lazy(() => import('@/website/components/popCalendar'));
const SwipeCalendar =  lazy(()=> import('@/website/components/swipeCalendar'));



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
        path: 'popCalendar',
        component: PopCalendar
      },
      {
        path: 'swipeCalendar',
        component: SwipeCalendar
      },
    ]
  },

]
