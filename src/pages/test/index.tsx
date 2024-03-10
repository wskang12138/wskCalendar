import { View, Text, Button } from "@tarojs/components";
import Taro, { useDidShow, useLoad, useReady } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import "./index.scss";

export default function Index() {
  let [count, setCount] = useState<number>(1);
  // let [count, setCount] = useState<number>(1);
  useLoad(() => {
    console.log("test Page loaded.");
  });
  useReady(() => {
    // 初次渲染时，在小程序触发 onReady 后，才能获取小程序的渲染层节点
    console.log("ready---------------");
    Taro.createSelectorQuery()
      .select("#target")
      .boundingClientRect()
      .exec((res) => console.log("target-位置信息：", res));
  });
  useDidShow(() => {
    console.log("test Page show.");
  });

  const add = () => {
    count += 1;
    setCount(count);
  };
  // onload;
  return (
    <View className="index-wrapper">
      <Text>Test!</Text>
      <br />
      <View className="flex-row-between-center m-b-16">
        <Text>当前值:{count}</Text>&nbsp;
        <Button plain type="primary" onClick={add} className="add-btn">
          加一
        </Button>
      </View>
      <View className="w-60">
        <Button type="primary">页面主操作 Normal</Button>
        <View className="flex-row-center-center">
          <Button className="mini-btn" type="primary" size="mini">
            按钮1
          </Button>
          <Button className="mini-btn" type="default" size="mini">
            按钮
          </Button>
          <Button className="mini-btn" type="warn" size="mini">
            按钮
          </Button>
        </View>
      </View>
      <View className="flex-row-center-center">
        <Text>按钮1</Text>
        <Text>按钮2</Text>
        <Text>按钮3</Text>
      </View>
      <View id="target"></View>
    </View>
  );
}
