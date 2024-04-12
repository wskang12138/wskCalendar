import { Jsx as JsxA, __html as htmlA, __code as codeA } from '../code/timeSelectCalendar-A.md';
import { Jsx as JsxB, __html as htmlB, __code as codeB } from '../code/timeSelectCalendar-B.md';
import { __html as props } from './props.md';

export const doc = {
  title: 'timeSelectCalendar 时间日历',
  description: '需要展示时间日历的时候。',
  whenUse: '适用于展示时间日历',
  props: props,
  src: 'timeSelectCalendar/demo',
  preview: [
    {
      html: htmlA,
      code: codeA,
      subTitle: 'A款样式',
      supplement: '样式有点难调，可以F12慢慢试'
    },
    {
      html: htmlB,
      code: codeB,
      subTitle: 'B款样式(注意在移动端才可以滑动)',
      supplement: '样式有点难调，可以F12慢慢试'
    },
  ]
}

export const demo = [
  JsxA,
  JsxB
]
