import { useCallback, useMemo } from "react";
import { View } from "@tarojs/components";
import { __html } from "./index.md";
import { PageScrollTop } from "@/website/layoutCom";

function Index() {

  const previewImage = useCallback((src: string) => {
    return () => window['previewImage'](src);
  }, []);

  const Jsx = useMemo(() => (
    <PageScrollTop className='doc doc--guide'>
      <View className='doc__html--with-img'>
        <h1>颜色标准</h1>
        <h2>主界面风格-商务蓝</h2>
      </View>
      <View className='doc__html' dangerouslySetInnerHTML={{ __html }} />
      <View className='doc__html--with-img'>
        <h2>其他色系</h2>
      </View>
    </PageScrollTop>
  ), [previewImage]);

  return Jsx;
}

export default Index;