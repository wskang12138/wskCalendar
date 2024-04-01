```jsx
import React, { useState, useCallback } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { LgPopLayer, LgButton } from "lancoo-ui-mobile";
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
      <View className="viewport__title">中间弹出</View>
      <View className="viewport__main">
        <LgButton onClick={handleLayer}>显示中间弹出层</LgButton>
        <LgPopLayer
          position="center"
          isOpen={isOpen}
          showLayer={handleLayer}
          confirmText="确定"
          cancelText="取消"
          confirm={confirm}
          customBg={<View className="lg-poplayer__bg">背景图片</View>}
          textContent={<View className="lg-poplayer__text">文字提示</View>}
        />
      </View>
    </View>
  );
};
```
