|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **datas**  | 日期数据 |  `DataItem[]` | `-`
| **onChange**  | 改变日期事件 |  `(data: DataItem) => void` | `-`

### DataItem
### TimeSelect

|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **type**  | 时分选择款式 |  `'A' \| 'B'` | `A`

### TimeSelectA

|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **isOpen**  | 是否显示时分选择弹窗 |  `boolean` | `false`
| **onClose**  | 关闭事件 |  `() => void` | `-`
| **confirm**  | 确认事件 |  `(data: ConfirmData) => void` | `-`
| **morning**  | 上午数据 |  `ItemData[]` | `-`
| **afternoon**  | 下午数据 |  `ItemData[]` | `-`
| **night**  | 晚上数据 |  `ItemData[]` | `-`

### ItemData 

|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **name**  | 时分 |  `string` | `-`
| **isSelected**  | 是否选中 |  `boolean` | `false`
| **CustomData**  | 自定义数据（不知道是啥） |  `any` | `-`
| **disabled**  | 不可选 |  `boolean` | `false`

### TimeSelectA

|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **isOpen**  | 是否显示时分选择弹窗 |  `boolean` | `false`
| **onClose**  | 关闭事件 |  `() => void` | `-`
| **name**  | 名称（不知道是啥） |  `string` | `-`
| **value**  | 值（不知道是啥) |  `string` | `-`
| **onChange**  | 修改事件 |  `(value: string) => void` | `-`
