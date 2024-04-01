import { lazy } from 'react';

// 页面
const HomePage = lazy(() => import('@/website/home/index'));
const GuidePage = lazy(() => import('@/website/guide/index'));
const ComponentPages = lazy(() => import('@/website/components/index'));
const ApiPages = lazy(() => import('@/website/api/index'));

// 指南
const QuickStart = lazy(() => import('@/website/guide/quick-start'));
const Log = lazy(() => import('@/website/guide/log'));
const FontStandard = lazy(() => import('@/website/guide/font-standard'));
const ColorStandard = lazy(() => import('@/website/guide/color-standard'));
const LayoutStandard = lazy(() => import('@/website/guide/layout-standard'));

// 组件
const NavBar = lazy(() => import('@/website/components/navBar'));


// API
const BrowserController = lazy(() => import('@/website/api/browser-controller'));
const Storage = lazy(() => import('@/website/api/storage'));
const UploadDownload = lazy(() => import('@/website/api/upload-download'));
const AppletLogin = lazy(() => import('@/website/api/applet-login'));
const RequestProxy = lazy(() => import('@/website/api/request-proxy'));
const DeviceController = lazy(() => import('@/website/api/device-controller'));


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
        path: 'log',
        component: Log
      },
      {
        path: 'font-standard',
        component: FontStandard
      },
      {
        path: 'color-standard',
        component: ColorStandard
      },
      {
        path: 'layout-standard',
        component: LayoutStandard
      }
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
  {
    path: 'api',
    component: ApiPages,
    subRoutes: [
      {
        path: 'browser-controller',
        component: BrowserController
      },
      {
        path: 'storage',
        component: Storage
      },
      {
        path: 'upload-download',
        component: UploadDownload
      },
      {
        path: 'applet-login',
        component: AppletLogin
      },
      {
        path: 'request-proxy',
        component: RequestProxy
      },
      {
        path: 'device-controller',
        component: DeviceController
      }
    ]
  }
]
