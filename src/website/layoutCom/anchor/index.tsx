import React, { Component } from 'react'
import { View } from '@tarojs/components';
import './index.scss'

type IScrollToAnchor = Array<{ href: string; offsetTop: number }>// Map<number, string>

//单锚点信息
export interface AnchorInfo {
  title: string;
  href: string;
  subAnchorList?: AnchorInfo[];
}

export interface AnchorProps {
  className?: string;
  style?: object;
  type?: 'A' | 'B';
  anchorList: AnchorInfo[];
  activeHref: string;
  bound?: number;
  onClick?: (href: string) => void;
  onScroll?: (href: string) => void;
  containerId: string;
}

export class Anchor extends Component<AnchorProps> {

  constructor(props){
       super(props)
  }
  componentDidMount() {
    setTimeout(() => {
      const { props: { anchorList, activeHref }, bindScrollEvent, getScrollInfo } = this;
      getScrollInfo(anchorList);
      bindScrollEvent();
      document.getElementById(activeHref)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 1000)
  }

  // 定时器
  private timer;

  // 锚点位置信息
  anchorInfoList: IScrollToAnchor = [];

  // 解绑滚动事件
  unbindScrollEvent = () => {
    const { containerId, anchorList } = this.props;
    const container = containerId ? document.getElementById(containerId) : document.getElementById(anchorList?.[0]?.href)?.parentElement;
    if (!container) {
      console.log('未获取到滚动父元素');
      return;
    }
    container.onscroll = null;
  }

  // 绑定滚动事件
  bindScrollEvent = () => {
    const { props: { containerId, anchorList }, handleScroll } = this;
    const container = containerId ? document.getElementById(containerId) : document.getElementById(anchorList?.[0]?.href)?.parentElement;
    if (!container) {
      console.log('未获取到滚动父元素');
      return;
    }
    container.onscroll = handleScroll();
  }

  // 遍历出准线所在的锚点
  queryCurrentAnchor = (directrix: number) => {
    const { anchorInfoList } = this;
    let currentHref = '';
    const { bound = 0 } = this.props;
    for (const anchorInfo of anchorInfoList) {
      // 子元素起始高度
      const elementOffsetTop = anchorInfo.offsetTop;

      if (directrix >= elementOffsetTop + bound) {
        currentHref = anchorInfo.href;
      }
    }
    return currentHref;
  }

  // 滚动更改活动链接时侦听事件
  handleScroll = () => {
    let valve = true;
    const { containerId, onScroll } = this.props;
    const { queryCurrentAnchor } = this;

    return () => {
      const { anchorList } = this.props;
      // 盒子
      const container = containerId ? document.getElementById(containerId) : document.getElementById(anchorList?.[0]?.href)?.parentElement;
      // 无盒子，返回
      if (!container) {
        console.log('未获取到滚动父元素');
        return;
      }

      if (valve) {
        setTimeout(() => {
          // 获取准线高度
          const directrix = container.scrollTop + (container.scrollTop / (container.scrollHeight - container.clientHeight)) * container.clientHeight;
          // 获取当前准线所在的锚点区域
          const currentAnchorHref = queryCurrentAnchor(directrix);
          // 切换锚点
          onScroll && onScroll(currentAnchorHref);
          valve = true;
        }, 10);
      }
      valve = false;
    }
  }

  // 点击更改活动连接时侦听事件
  handleClick = (href: string) => {
    clearTimeout(this.timer);
    const { unbindScrollEvent, bindScrollEvent } = this;
    const { onClick } = this.props;
    // 先解绑滚动事件
    unbindScrollEvent();
    document.getElementById(href)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    // 触发点击事件
    onClick && onClick(href);
    // 1秒延迟后重新绑定滚动事件
    this.timer = setTimeout(bindScrollEvent, 1000);
  }

  // 获取锚点标签位置信息
  getScrollInfo = (subAnchorList: AnchorInfo[]) => {
    subAnchorList?.forEach(anchor => {
      const element = document.getElementById(anchor.href);

      this.anchorInfoList.push({
        href: anchor.href,
        offsetTop: element?.offsetTop || 0
      });
      if (anchor?.subAnchorList?.length) {
        this.getScrollInfo(anchor.subAnchorList);
      }
    })
  }

  // 获取下级锚点
  getSubAnchor = (subAnchorList: AnchorInfo[], grade = 1) => {
    const { props: { activeHref }, handleClick } = this;
    return (
      subAnchorList?.map((item, itemIndex) =>
        <React.Fragment key={itemIndex}>
          <View
            className={`anchor__subAnchor ${activeHref === item.href && 'active'}`}
            style={{ textIndent: `${grade * 15}px` }}
            onClick={handleClick.bind(this, item.href)}
          >
            {item.title}
          </View>
          {item.subAnchorList ? this.getSubAnchor(item.subAnchorList, grade + 1) : ''}
        </React.Fragment>
      )
    )
  }

  render() {
    const {
      anchorInfoList
    } = this;

    const {
      className,
      anchorList,
      activeHref
    } = this.props;

    // 锚点索引
    let anchorIndex = anchorInfoList.findIndex(item => item.href === activeHref);
    // 如果是-1，默认值为0
    anchorIndex = anchorIndex === -1 ? 0 : anchorIndex;

    return (
      <View className={`anchor ${className}`}>
        {this.getSubAnchor(anchorList)}
        <View className='anchor__bar' />
        <View className='anchor__bar--active' style={{ transform: `translateY(${26 * anchorIndex}px)` }} />
      </View>
    )
  }
}
