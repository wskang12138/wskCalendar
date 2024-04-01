```jsx
import React, { useState, useCallback, useRef } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
// import { NavBar, LgSearch  } from "wskcalendar";
import "../index.scss";

export const Jsx = () => {
  return (
    <View className="iframe__viewport">
      <View className="viewport__title">顶部带菜单</View>
      <View className="viewport__main page_grid">
      </View>
    </View>
  );
};
```
