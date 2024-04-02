import { createClassName } from "@/components/utils";
import { Text, View } from "@tarojs/components";
import { FC } from "react";
import "./index.scss";
import { PropsType } from "./types";
const { rootClassNames, classNames } = createClassName("tabs");

export  const TabsCandlendar: FC<PropsType> = (props) => {
  /* 属性 */
  const { list, value, onClick } = props;

  /* 方法 */

  /* hook */

  /* render */
  return (
    <View className={rootClassNames("")}>
      {list.map((i) => (
        <View key={i.value} className={classNames("tab", { active: i.value === value })} onClick={() => onClick?.(i)}>
          {i.label}
          {i.subLabel ? <Text className={classNames('sublabel')}>({i.subLabel})</Text> : <></>}
        </View>
      ))}
    </View>
  );
};

