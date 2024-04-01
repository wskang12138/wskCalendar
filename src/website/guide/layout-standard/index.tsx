import { useCallback, useMemo } from "react";
import { View } from "@tarojs/components";
import { PageScrollTop } from "@/website/layoutCom";
import { __html } from "./index.md";

function Index() {

  const previewImage = useCallback((src: string) => {
    return () => window['previewImage'](src);
  }, []);

  const Jsx = useMemo(() => (
    <PageScrollTop className='doc doc--guide'>
      <View className='doc__html' dangerouslySetInnerHTML={{ __html }} />
      <View className='doc__html--with-img'>
      </View>
    </PageScrollTop>
  ), [previewImage]);

  return Jsx;
}

export default Index;