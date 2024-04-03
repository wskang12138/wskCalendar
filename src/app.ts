import { PropsWithChildren } from 'react'
import { useDidShow, useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')
  })
  useDidShow(() => {
    document.title = 'wskCalendar';
     window.history.replaceState(null, '', window.location.href.replace('pages/website/index', ''));
  })

  // children 是将要会渲染的页面
  return children
}

export default App
