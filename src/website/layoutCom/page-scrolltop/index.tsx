import React, { FC, PropsWithChildren, useEffect } from "react";
import { View } from "@tarojs/components";

interface PageScrollTopProps extends PropsWithChildren {
  className?: string;
}

export const PageScrollTop: FC<PageScrollTopProps> = React.memo(
  function (props) {

    const { className } = props;

    useEffect(() => {
      const indexNode = document.getElementById('index');
      indexNode && (indexNode.scrollTop = 0);
    }, []);

    return (
      <View className={className}>
        {props.children}
      </View>
    )
  }
)

