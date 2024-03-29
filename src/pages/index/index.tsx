import { useCallback } from 'react';
import Taro from '@tarojs/taro';
import { Button, View } from '@tarojs/components';
import { Routes } from '@/routes';
import './index.scss';
import { NavBar } from '@/components';

export default function Index() {

  const navigatePage = useCallback((url: string) => {
    Taro.navigateTo({ url });
  }, []);

  return (
    <View className='page'>
      <NavBar title='测试目录' bgHeight={106}/>
      <View className='page_content'>
        <View className='content_list'>
          {
            Routes.map(({ name, url }, index) => (
              <Button
                key={index}
                type='primary'
                className='list_entry'
                onClick={() => navigatePage(url)}
              >{ name }</Button>
            ))
          }
        </View>
      </View>
    </View>
  )
}
