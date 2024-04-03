import { Jsx as JsxA, __html as htmlA, __code as codeA } from '../code/popCalendar-A.md';
import { Jsx as JsxB, __html as htmlB, __code as codeB } from '../code/popCalendar-B.md';

import { __html as props } from './props.md';

export const doc = {
  title: 'popCalendar 弹窗日历',
  description: '需要展示弹窗日历的时候。',
  whenUse: '适用于展示弹窗弹窗日历',
  props: props,
  src: 'popCalendar/demo',
  preview: [
    {
      html: htmlA,
      code: codeA,
      subTitle: '常规样式',
      supplement: '样式有点难调，可以F12慢慢试'
    },
     {
      html: htmlB,
      code: codeB,
      subTitle: '范围选择',
      supplement: '样式有点难调，可以F12慢慢试'
    }

  ]
}

export const demo = [
  JsxA,
  JsxB
]