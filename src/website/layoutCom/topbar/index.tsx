import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { View, Image } from "@tarojs/components"
import { guideSidebarTabs, componentsSidebarTabs } from "@/website/routers";
import event from "@/website/index/event";
import ic_empty from '@/website/assets/images/svg/empty.svg';
import ic_day from '@/website/assets/images/svg/day.svg';
import ic_night from '@/website/assets/images/svg/night.svg';
import './index.scss';

interface Tab {
  title: string;
  link: string;
}

interface TopbarProps {
  className?: string;
  style?: object;
  tabs?: Tab[];
  isNightMode: boolean;
  onChange?: (index: number, link: string) => void;
}

type Associate = {
  title: string;
  link: string;
  isSeparator?: boolean;
}

export const Topbar: FC<TopbarProps> = React.memo(
  function (props) {

    const {
      className,
      style,
      tabs,
      isNightMode,
      onChange
    } = props;

    // 搜索框Ref
    const inputRef = useRef<any>();

    // 跳转函数
    const navigate = useNavigate();

    // 搜索框内容
    const [value, setValue] = useState('');

    // 显示模式下拉框
    const [dropDownShow, setDropDownShow] = useState(false);

    // 联想
    const [associates, setAssociates] = useState<Associate[]>([]);

    // 高亮联想索引
    const [highLightIndex, setHighLightIndex] = useState(-1);

    // 键盘聚焦
    const [focus, setFocus] = useState(false);

    // 输入事件
    const onInput = useCallback((e) => {
      !focus && setFocus(true);
      const _value = e.target.value;
      setValue(_value);
      // 重置高光
      highLightIndex !== -1 && setHighLightIndex(-1);
      // 搜索字典
      const searchDict = [...guideSidebarTabs, ...componentsSidebarTabs];
      // 新联想
      const _associates = searchDict.filter(item => {
        // 转为小写字母再比较
        const lowerCaseTitle = item.title.toLowerCase();
        return _value.trim() && item.link && lowerCaseTitle.includes(_value.toLowerCase());
      })
      setAssociates(_associates);
    }, [focus, highLightIndex]);

    // 跳转
    const navigateToNav = useCallback((tab: Tab, index: number) => {
      onChange && onChange(index, tab.link);
    }, [onChange]);

    // 联想点击跳转
    const associateToNav = useCallback((link: string, e?) => {
      e?.stopPropagation();
      navigate(link);
      // 重置数据
      setValue('');
    }, [navigate]);

    // 联想悬停事件
    const onMouseOver = useCallback((index: number) => {
      index !== highLightIndex && setHighLightIndex(index);
    }, [highLightIndex]);

    // 联想取消悬停事件
    const onMouseOut = useCallback((index: number) => {
      index === highLightIndex && setHighLightIndex(-1);
    }, [highLightIndex]);

    // 联想高亮判断滚动
    const changeHightLightToScroll = useCallback((_highLightIndex: number, direction: 'up' | 'down') => {
      // 联想盒子节点
      const associateContainer = document.getElementById("associate-container");
      // 联想节点列表
      const associateList = document.getElementsByClassName("associate__item") as any as HTMLElement[];
      // 目标联想节点
      const associateNode = associateList?.[_highLightIndex];
      // 非空判断
      if (!(associateNode && associateContainer)) {
        return;
      }
      switch (direction) {
        case 'up': {
          // 如果目标节点在视图外，滚动到视图内
          if (associateNode.offsetTop <= associateContainer.scrollTop) {
            associateContainer.scrollTop = associateNode.offsetTop;
          }
        }; break;
        case 'down': {
          // 如果目标节点在视图外，滚动到视图内
          if (associateNode.offsetTop + 35 >= associateContainer.scrollTop + associateContainer.offsetHeight) {
            associateContainer.scrollTop = associateNode.offsetTop + 35 - associateContainer.offsetHeight;
          }
        }
      }
    }, []);

    // 键盘按下事件
    const onKeyDown = useCallback((e) => {
      console.log(e.keyCode);
      switch (e.keyCode) {
        // 回车键
        case 13: {
          const associate = associates[highLightIndex];
          associate && associateToNav(associate.link);
        }; break;
        // ↑键
        case 38: {
          const _highLightIndex = highLightIndex - 1;
          setHighLightIndex(Math.max(_highLightIndex, 0));
          changeHightLightToScroll(_highLightIndex, 'up');
        }; break;
        // ↓键
        case 40: {
          const _highLightIndex = highLightIndex + 1;
          setHighLightIndex(Math.min(_highLightIndex, associates.length - 1));
          changeHightLightToScroll(_highLightIndex, 'down');
        }; break;
      }
    }, [associateToNav, associates, changeHightLightToScroll, highLightIndex]);

    // 输入框获得焦点
    const onFocus = useCallback((e) => {
      e.stopPropagation();
      !focus && setFocus(true);
    }, [focus]);

    // 显示模式下拉框
    const handleDropDown = useCallback((e) => {
      e.stopPropagation();
      setDropDownShow(!dropDownShow);
    }, [dropDownShow]);

    // 隐藏模式下拉框
    const hideDropDown = useCallback(() => {
      dropDownShow && setDropDownShow(false);
      focus && setFocus(false);
    }, [dropDownShow, focus]);

    // 切换白天/夜晚模式
    const emitHandleNightMode = useCallback((_isNightMode: boolean) => {
      return (e) => {
        e.stopPropagation();
        setDropDownShow(false);
        event.emit('handleNightMode', _isNightMode);
      }
    }, []);

    useEffect(() => {
      // 监听收起模式下拉框
      event.on('hideDropDown', hideDropDown);

      return () => {
        // 监听收起模式下拉框
        event.off('hideDropDown');
      }
    }, [hideDropDown])

    // 是否显示联想
    const isShow = useMemo(() => !!value.trim() && focus, [value, focus]);

    const Jsx = useMemo(() => (
      <View className={`topbar ${className}`} style={style}>
        <View className='topbar--left'>
          <Link className='topbar--left__logo' to='/'>wskCalendar</Link>
          <View className='topbar--left__search'>
            <input
              ref={inputRef}
              className={`topbar__search__input ${focus && 'focus'}`}
              value={value}
              onInput={onInput}
              onKeyDown={onKeyDown}
              onClick={onFocus}
            />
            <View
              id='associate-container'
              className={`topbar__search__associate ${isShow && (!!associates.length ? 'active' : 'empty')}`}
            >
              {
                isShow && (
                  !!associates.length ?
                    associates.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`associate__item ${highLightIndex === itemIndex && 'item--hover'}`}
                        onClick={associateToNav.bind(null, item.link)}
                        onMouseOver={onMouseOver.bind(null, itemIndex)}
                        onMouseOut={onMouseOut.bind(null, itemIndex)}
                      >
                        {item.title}
                      </div>
                    )) :
                    <Image
                      className='associate__empty'
                      src={ic_empty}
                      mode='aspectFit'
                    />
                )
              }
            </View>
          </View>
        </View>
        <View className='topbar--right'>
          <View className='topbar__tabs'>
            {
              tabs?.map((item, itemIndex) =>
                <NavLink
                  key={itemIndex}
                  className={({ isActive }) => `tabs__item ${isActive && 'active'}`}
                  onClick={navigateToNav.bind(null, item, itemIndex)}
                  to={item.link}
                >
                  {item.title}
                </NavLink>
              )
            }
          </View>
          <View className='topbar__mode'>
            <View className='mode__btn'>
              <img
                className='mode__image'
                src={!isNightMode ? ic_day : ic_night}
                onClick={handleDropDown}
              />
            </View>
            {
              dropDownShow &&
              <View className='mode__drop-down'>
                <View className='drop-down__btn'>
                  <img
                    className='btn__image'
                    src={isNightMode ? ic_day : ic_night}
                    onClick={emitHandleNightMode(!isNightMode)}
                  />
                </View>
              </View>
            }
          </View>
        </View>
      </View >
    ), [
      className,
      style,
      focus,
      value,
      onInput,
      onFocus,
      isShow,
      associates,
      tabs,
      handleDropDown,
      dropDownShow,
      isNightMode,
      emitHandleNightMode,
      highLightIndex,
      associateToNav,
      onMouseOver,
      onMouseOut,
      onKeyDown,
      navigateToNav
    ]);

    return Jsx;
  }
)
