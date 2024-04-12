import { Outlet } from 'react-router-dom';
import { View } from '@tarojs/components';
import './index.scss';
import { useEffect } from 'react';

function Index() {

  return (
    <View id='iframe'>
      <Outlet />
    </View>
  )
}

export default Index;
