import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { View } from '@tarojs/components';
import { Topbar, PreviewImageRef } from "@/website/layoutCom";
import { topbarTabs } from '@/website/routers';
import event from './event';
import './index.scss';

function Index() {
  const previewImageRef = useRef<PreviewImageRef>(null);

  // 是否夜间模式
  const [isNightMode, setIsNightMode] = useState(false);

  // 预览图片
  const previewImage = useCallback((src) => {
    previewImageRef.current?.showPreview && previewImageRef.current?.showPreview(src);
  }, []);

  // 收起模式下拉框
  const emitHideDropDownEvent = useCallback(() => {
    event.emit('hideDropDown');
  }, []);

  // 切换日间/夜间模式
  const handleNightMode = useCallback((_isNightMode: boolean) => {
    localStorage.setItem('lancoo-ui-theme', _isNightMode ? 'night' : 'day');
    isNightMode !== _isNightMode && setIsNightMode(_isNightMode);
  }, [isNightMode])

  useEffect(() => {
    // 挂载到window上
    window['previewImage'] = previewImage;
    // 监听切换模式
    event.on('handleNightMode', handleNightMode);
    // 根据缓存切换主题
    const theme = localStorage.getItem('lancoo-ui-theme');
    if (theme === 'night' && !isNightMode) {
      setIsNightMode(true);
    }

    return () => {
      // 卸载监听
      event.off('handleNightMode');
    }
  }, [handleNightMode, previewImage, isNightMode]);

  const Jsx = useMemo(() => (
    <div
      id='index'
      className={String(isNightMode && 'night-mode')}
      onClick={emitHideDropDownEvent}
    >
      <Topbar tabs={topbarTabs} isNightMode={isNightMode} />
      <Suspense fallback={<View className='lazy-fallback'>loading...</View>}>
        <Outlet />
      </Suspense>
      {/* <PreviewImage ref={previewImageRef} /> */}
    </div>
  ), [emitHideDropDownEvent, isNightMode]);

  return Jsx;
}

export default Index;
