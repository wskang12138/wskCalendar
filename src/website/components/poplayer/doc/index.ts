import { Jsx as JsxA, __html as htmlA, __code as codeA } from '../code/LgPopLayer-A.md';
import { Jsx as JsxB, __html as htmlB, __code as codeB } from '../code/LgPopLayer-B.md';
import { Jsx as JsxC, __html as htmlC, __code as codeC } from '../code/LgPopLayer-C.md';
import { __html as props } from './props.md';

export const doc = {
  title: 'PopLayer 弹出层',
  description: '从屏幕滑出或弹出一块自定义内容区。',
  whenUse: '适用于展示弹窗、信息提示、选择输入、切换等内容，支持多个弹出层叠加展示。',
  props: props,
  src: 'poplayer/demo',
  preview: [
    {
      html: htmlA,
      code: codeA,
      subTitle: '中间弹出',
      supplement: '样式有点难调，可以F12慢慢试'
    },
    {
      html: htmlB,
      code: codeB,
      subTitle: '上方弹出',
      supplement: ''
    },
    {
      html: htmlC,
      code: codeC,
      subTitle: '下方弹出',
      supplement: ''
    }
  ]
}

export const demo = [
  JsxA,
  JsxB,
  JsxC
]