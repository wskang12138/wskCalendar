
import { View } from "@tarojs/components";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import "./index.scss";
import { createClassName } from "@/utils";
import { getRecentMonth ,DayItemApi, getMonthInfo,} from "@/utils/calendar";
import { MonthPropsType, PropsType } from "./types";



const { rootClassNames, classNames } = createClassName("simple-calendar");

const MonthItem: FC<MonthPropsType> = (props) => {
  const { month, startDate, disableDate, onDayClick, data = [] } = props;
  const weekdayHeader = ["一", "二", "三", "四", "五", "六", "日"];
  const monthInfo = useMemo(() => {
    return getMonthInfo(month);
  }, [month]);
  console.log(month,66666666)
  // 点击day
  const handleDayClick = (day: DayItemApi) => {
    if(!isValidDay(day)) return
    // console.log(day, startDate);
    onDayClick && onDayClick?.(day)
  };

  // 日期是否有效 、 可选
  const isValidDay = (day: DayItemApi) => {
    if (!day || !day?.date) return false;
    if (startDate && day.date < startDate) return false;
    if (disableDate && !disableDate(day)) return false;
    return true;
  };

  // class
  const getDayClass = (day: DayItemApi) => {
    const isValid = isValidDay(day)
    const isActive = !!(isValid && data?.length && data.find(i => i===day.date))
    const preDay = dayjs(day.date).subtract(1, 'day').format('YYYY-MM-DD')
    const nextDay = dayjs(day.date).add(1, 'day').format('YYYY-MM-DD')
    const isMiddle = isActive && data.find(i => i===preDay) && data.find(i => i===nextDay)
    return {
      "month-day-disabled": !isValid,
      "month-day-active": isActive,
      "month-day-middle": !!isMiddle,
    }
  }

  return (
    <View className={classNames("month")}>
      <View className={classNames("month-title")}>{monthInfo.month}</View>
      <View className={classNames("month-row", "month-header")}>
        {weekdayHeader.map((w) => (
          <View className={classNames("month-col")} key={w}>
            {w}
          </View>
        ))}
      </View>
      {monthInfo.weeks.map((w: DayItemApi[], ind: number) => (
        <View className={classNames("month-row", "month-week")} key={ind}>
          {w.map((day: DayItemApi, iind: number) => {
            return (
              <View
                className={classNames("month-col", "month-day", getDayClass(day))}
                key={iind}
                onClick={() => handleDayClick(day)}
              >
                {day.day}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export const SimpleCalendar: FC<PropsType> = (props) => {
  /* 属性 */
  const { startDate, disableDate, onDayClick, data } = props;

  /* hook */

  /* render */
  return (
    <View className={rootClassNames("")}>
      {getRecentMonth(3).map((m) => (
        <MonthItem
          month={m.month}
          startDate={startDate}
          disableDate={disableDate}
          onDayClick={onDayClick}
          data={data}
        ></MonthItem>
      ))}
    </View>
  );
};

