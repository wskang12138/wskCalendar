import { useMemo } from "react";
import { View } from "@tarojs/components";
import { PageScrollTop } from "@/website/layoutCom";
import { __html } from "./index.md";

function Index() {
  
  const Jsx = useMemo(() => (
    <PageScrollTop className='doc doc--api'>
      <View className='doc__html' dangerouslySetInnerHTML={{ __html }} />
    </PageScrollTop>
  ), []);

  return Jsx;
}

export default Index;