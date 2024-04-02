import React, { useMemo } from 'react';
import Taro from "@tarojs/taro";
import { View, Image } from '@tarojs/components';
import { getBrowserController } from '@/utils/BrowserController';
import { NavBarProps } from './types';
import ic_back from '../../images/back.svg';
import ic_home from '../../images/home.svg';
import './index.scss';


export const NavBar = React.memo((props: NavBarProps) => {

  const {
    className,
    style,
    title,
    center,
    home,
    titleWidth,
    bgHeight,
    onBackLastPage,
    onBackHome: backHome,
    children,
  } = props;


  // 控制器
  const browserController = getBrowserController();


  // 编译环境
  const ENV = process.env.TARO_ENV;


  // 状态栏高度
  const statusBarHeight = useMemo(() => {
    switch (ENV) {
      case 'weapp': {
        const systemInfo = Taro.getSystemInfoSync();
        return systemInfo.statusBarHeight || 84;
      };
      default: {
        return browserController.getStatusBarHeight() || 84;
      }
    }
  }, []);


  // 返回上一页
  const backLastPage = onBackLastPage ?? (() => {
    Taro.navigateBack();
    browserController.back();
  });

  return (
    <View
      className={`nav-bar ${className}`}
      style={{
        height: bgHeight && Taro.pxTransform(bgHeight),
        minHeight: Taro.pxTransform(statusBarHeight + 50),
        paddingTop: Taro.pxTransform(statusBarHeight -30),
        ...style,
      }}
    >
      <View
        className='nav-bar_main'
        onClick={home ? undefined : backLastPage}
      >
        <Image
          className='main_icon'
          style={{ display: home ? 'none' : 'block' }}
          src={ic_back}
          onClick={backLastPage}
        />
        <View
          className='main_icon-wrap'
          style={{ display: home ? 'flex' : 'none' }}
        >
          <Image
            className='icon-wrap_icon icon-back'
            src={ic_back}
            onClick={backLastPage}
          />
          <Image
            className='icon-wrap_icon icon-home'
            src={ic_home}
            onClick={backHome}
          />
        </View>
        <View
          className={`main_title ${center && 'title-center'}`}
          style={{ maxWidth: Taro.pxTransform(titleWidth ?? 400) }}
        >
          {title}
        </View>
      </View>
      {children}
    </View >
  )
});
