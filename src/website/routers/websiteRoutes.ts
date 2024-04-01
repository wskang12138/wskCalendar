import { lazy } from 'react';

// 页面
const HomePage = lazy(() => import('@/website/home/index'));
const GuidePage = lazy(() => import('@/website/guide/index'));
const ComponentPages = lazy(() => import('@/website/components/index'));

// 指南
const QuickStart = lazy(() => import('@/website/guide/quick-start'));
const ColorStandard = lazy(() => import('@/website/guide/color-standard'));

// 组件
const NavBar = lazy(() => import('@/website/components/navBar'));

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
        path: 'navBar',
        component: NavBar
      },
    ]
  },

]
