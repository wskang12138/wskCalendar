```jsx
import React, { useState, useCallback } from "react";
import Taro from "@tarojs/taro";
import { View , Button} from "@tarojs/components";
import { PopLayer } from "wskcalendar";
import "../index.scss";

export const Jsx = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLayer = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <View className="iframe__viewport">
      <View className="viewport__title">向上弹出</View>
      <View className="viewport__main">
        <Button onClick={handleLayer}>显示下方弹出层</Button>
        <PopLayer
          position="bottom"
          isOpen={isOpen}
          showLayer={handleLayer}
          showClose
          title="下方弹出层示例"
        >
          <View className="-poplayer__content">自定义内容</View>
        </PopLayer>
      </View>
    </View>
  );
};
```
