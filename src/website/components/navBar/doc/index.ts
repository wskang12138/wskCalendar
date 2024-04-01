import { Jsx as JsxA, __html as htmlA, __code as codeA } from '../code/navBar-A.md';
import { Jsx as JsxB, __html as htmlB, __code as codeB } from '../code/navBar-B.md';
import { __html as props } from './props.md';

export const doc = {
  title: 'navBar 顶部导航栏',
  description: '需要使用顶部导航栏得时候可以使用',
  whenUse: '--',
  props: props,
  src: 'NavBar/demo',
  preview: [
    {
      html: htmlA,
      code: codeA,
      subTitle: "基本用法",
      supplement: ''
    },
    {
      html: htmlB,
      code: codeB,
      subTitle: '顶部带搜索',
      supplement: ''
    }
  ]
}

export const demo = [
  JsxA,
  JsxB,
]