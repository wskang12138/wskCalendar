```jsx
import React, { useState, useCallback } from "react";
import Taro from "@tarojs/taro";
import {Button, View } from "@tarojs/components";
import { PopLayer } from "wskcalendar";
import "../index.scss";

export const Jsx = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLayer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const confirm = useCallback(() => {
    Taro.showToast({ title: "点击确定", icon: "none" });
    handleLayer();
  }, [handleLayer]);

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">向下弹出</View>
      <View className="viewport__main">
        <Button onClick={handleLayer}>显示上方弹出层</Button>
        <PopLayer
          position="top"
          isOpen={isOpen}
          confirm={confirm}
          showLayer={handleLayer}
        >
          <View className="-poplayer__content">自定义内容</View>
        </PopLayer>
      </View>
    </View>
  );
};
```
