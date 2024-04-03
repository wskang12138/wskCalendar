|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **type**  | 单个日期或者日期范围 |  `'radio' \| 'range' ` | `--`
| **data**  | 当前选中日期活选中日期范围 |  `string \| stirng[] ` | `--`
| **disableDate**  | 禁用的日期 |  `Function` | `--`
| **onDayClick**  | 点击日期 |  `Function` | `--`
| **isOpen**  | 是否显示弹出层 |  `boolean` | `false`
| **confirm**  | 确认 |  `(selectedDay:string) => void` | `--`
| **OnClose**  | 取消 |  `() => void` | `--`
| **minDay**  | 最小天 |  `string` | `--`
| **maxDay**  | 最大天 |  `string` | `--`
| **canCancel**  | 取消 |  `boolean` | `false`
