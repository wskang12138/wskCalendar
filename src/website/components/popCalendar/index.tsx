import { useCallback, useMemo, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components'
import { Anchor, PageScrollTop } from "@/website/layoutCom";
import ic_copy from '@/website/assets/images/svg/copy.svg';
import { doc } from './doc';

const anchorList = [
  {
    title: '简介',
    href: 'title'
  },
  {
    title: '何时使用',
    href: 'whenuse'
  },
  {
    title: '示例',
    href: 'example',
    subAnchorList:
      doc.preview.map((item, itemIndex) => ({
        title: item.subTitle,
        href: `example-${itemIndex}`
      }))
  },
  {
    title: '属性',
    href: 'props'
  }
]

function Index() {

  const [activeHref, setActiveHref] = useState('');

  // 锚点滚动事件
  const onScroll = useCallback((href) => {
    setActiveHref(href);
  }, [])

  // 锚点点击事件
  const onClick = useCallback((href) => {
    setActiveHref(href);
  }, [])

  // 复制代码
  const copyCode = useCallback((code) => {
    Taro.setClipboardData({
      data: code,
      success: () => Taro.showToast({
        title: '复制代码成功',
        icon: 'none'
      }),
      fail: () => Taro.showToast({
        title: '复制代码失败',
        icon: 'none'
      })
    })
  }, [])

  const Jsx = useMemo(() => (
    <PageScrollTop className='doc'>
      <Anchor
        className='doc__anchor'
        anchorList={anchorList}
        activeHref={activeHref}
        containerId='index'
        onScroll={onScroll}
        onClick={onClick}
      />
      <View id='title'>
        <View className='doc__title'>{doc.title}</View>
        <View className='doc__description'>{doc.description}</View>
      </View>
      <View id='whenuse'>
        <View className='doc__when-use-title'>何时使用</View>
        <View className='doc__when-use'>{doc.whenUse}</View>
      </View>
      <View id='example'>
        <View className='doc__example'>示例</View>
        {
          doc.preview.map((item, itemIndex) =>
            <View key={itemIndex} id={`example-${itemIndex}`}>
              {item.subTitle && <View className='doc__sub-title'>{item.subTitle}</View>}
              {item.supplement && <View className='doc__supplement'>{item.supplement}</View>}
              <View className='doc__previewer'>
                <View className='previewer__detail'>
                  <View className='detail__topbar'>
                    <Image
                      className='topbar__ic'
                      src={ic_copy}
                      mode='aspectFit'
                      onClick={copyCode.bind(null, item.code)}
                    />
                  </View>
                  <View
                    className='detail__code'
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                </View>
                <iframe
                  className='previewer__iframe'
                  src={`/~demos/${doc.src}${itemIndex}`}
                />
              </View>
            </View>
          )
        }
      </View>
      <View id='props'>
        <View className='doc__props--title'>属性</View>
        <View
          className='doc__props'
          dangerouslySetInnerHTML={{ __html: doc.props }}
        />
      </View>
    </PageScrollTop>
  ), [activeHref, copyCode, onClick, onScroll]);

  return Jsx;
}

export default Index;