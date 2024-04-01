```jsx
import React, { useState, useCallback, useRef } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "../index.scss";

export const Jsx = () => {
  return (
    <View className="iframe__viewport">
      <View className="viewport__title">基本用法</View>
      <View className="viewport__main page_grid">
      </View>
    </View>
  );
};
```
