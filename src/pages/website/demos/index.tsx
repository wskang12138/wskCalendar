import { Outlet } from 'react-router-dom';
import { View } from '@tarojs/components';
import './index.scss';

function Index() {

  return (
    <View id='iframe'>
      <Outlet />
    </View>
  )
}

export default Index;
