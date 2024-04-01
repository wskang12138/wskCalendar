import { Link } from 'react-router-dom';
import { View, Image } from '@tarojs/components';
// import img_logo from '@/images/png/logo.png';
// import img_box from '@/images/png/box.png';
// import img_code from '@/images/png/code.png';
// import img_tree from '@/images/png/tree.png';
// import ic_book from '@/images/svg/book.svg';
import './index.scss';

// const dataList = [
//   {
//     icon: img_box,
//     title: '开箱即用',
//     description: '考究的默认配置和约定式的目录结构，帮助开发者零成本上手，让所有注意力都能放在开发上。'
//   },
//   {
//     icon: img_code,
//     title: '可定制',
//     description: '可以高效地对组件外观进行调整或创造自己的主题。'
//   },
//   {
//     icon: img_tree,
//     title: '流畅感',
//     description: '拥有流畅的手势和细腻的动画，助力产品打造出极致体验。'
//   }
// ]

function Index() {
  return (
    <View className='home-pages'>
      {/* <View className='pages__banner'>
        <Image className='banner__logo' src={img_logo} mode='aspectFit' />
        <View className='banner__supplement'>
          <Image className='supplement__icon' src={ic_book} />
          <View className='supplement__text'>移动端组件库</View>
        </View>
        <Link className='banner__btn' to='/website/guide/quick-start'>快速上手</Link>
      </View>
      <View className='pages__lists'>
        {
          dataList.map((item, itemIndex) =>
            <View className='lists__item' key={itemIndex}>
              <Image className='item__icon' src={item.icon} />
              <View className='item__title'>{item.title}</View>
              <View className='item__description'>{item.description}</View>
            </View>
          )
        }
      </View> */}
    </View>
  )
}

export default Index;
