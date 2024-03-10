import { View } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  useDidShow(() => {

  });

  return (
    <View className="index-wrapper">
      <View className="inner-wrapper">
        视图
      </View>
    </View>
  );
}
