|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **datas**  | 日期数据 |  `DataItem[]` | `-`
| **onChange**  | 改变日期事件 |  `(data: DataItem) => void` | `-`

### DataItem

|  属性   | 说明  |   类型 | 默认值
|  ----  | ----  |  ----  | ----
| **date**  | 日期 |  `string` | `-`
| **dateColor**  | 日期颜色 |  `string` | `-`
| **week**  | 礼拜 |  `string` | `-`
| **passWeekColor**  | 过去礼拜颜色 |  `string` | `-`
| **futureWeekColor**  | 未到礼拜颜色 |  `string` | `-`
| **selectWeekColor**  | 选中礼拜颜色 |  `string` | `-`
| **isSelected**  | 是否被选中 |  `boolean` | `false`
| **isThisWeek**  | 是否当前礼拜 |  `boolean` | `false`