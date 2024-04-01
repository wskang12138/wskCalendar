import React, { FC, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { View } from '@tarojs/components';
import './index.scss';

interface Tab {
  title: string;
  link: string;
  isSeparator?: boolean;
}

interface SidebarProps {
  className?: string;
  style?: object;
  tabs?: Tab[];
  onChange?: (index: number, link: string) => void;
}

export const SideBar: FC<SidebarProps> = React.memo(

  function (props) {

    const {
      className,
      style,
      tabs,
      onChange
    } = props;

    // 跳转
    const navigateToNav = useCallback((tab: Tab, index: number) => {
      onChange && onChange(index, tab.link);
    }, [onChange])

    const Jsx = useMemo(() => (
      <View className={`sidebar ${className}`} style={style}>
        {
          tabs?.map((item, itemIndex) =>
            item.isSeparator ?
              <View
                key={itemIndex}
                className='sidebar__separator'
              >
                {item.title}
              </View> :
              <NavLink
                key={itemIndex}
                className={({ isActive }) => `sidebar__item ${isActive && 'active'}`}
                onClick={navigateToNav.bind(null, item, itemIndex)}
                to={item.link}
              >
                {item.title}
              </NavLink>
          )
        }
      </View>
    ), [className, navigateToNav, style, tabs]);

    return Jsx;
  }
)
