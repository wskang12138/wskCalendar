import { View, Text, ScrollView } from "@tarojs/components";
import classNames from "classnames";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { PopLayer } from "../popLayer";
import "./index.scss";
import {
  addMonthByMonths,
  DateFormatStr,
  DayItemApi,
  debounce,
  getMonthInfo,
  getRecentMonth,
  requestAniFrame,
} from "@/utils/calendar";
import { CalendarPropsType, PropsType } from "./types";


const WeekdaysText = ["一", "二", "三", "四", "五", "六", "日"];
export const CalendarPop: FC<PropsType> = (props) => {
  /* 属性 */
  const { isOpen, onClose, confirm, type = "radio", disableDate, data } = props;

  /* hook */
  const [selectData, setSelectData] = useState<string | string[]>(
    type === "range" ? ["", ""] : ""
  );
  useEffect(() => {
    if (data) {
      if (type === "range") {
        setSelectData(data instanceof Array ? data : ["", ""]);
      } else {
        setSelectData(typeof data === "string" ? data : "");
      }
    }
  }, [isOpen, data, type]);
  // 日期点击
  const onDayClick = (day: DayItemApi) => {
    const date = day?.date || "";
    if (type === "range") {
      if (selectData[0] &&  date >= selectData[0]) {
        setSelectData([selectData[0], date]);
      } else {
        setSelectData([date, ""]);
      }
    } else {
      setSelectData(date);
    }
  };

  const monthsRef = useRef<HTMLDivElement>();
  const getMonthsRef = () => {
    return monthsRef.current as HTMLDivElement;
  };
  const [months, setMonths] = useState(
    getRecentMonth(4, data instanceof Array ? data?.[0] : data)
  );

  const initData = () => {
    setMonths(getRecentMonth(4, data instanceof Array ? data?.[0] : data))
    setTimeout(() => {
      requestAniFrame(() => {
        const container = getMonthsRef();
        const selectMonth =
          container.getElementsByClassName("is-selected-month")?.[0];
        if (selectMonth) {
          selectMonth?.scrollIntoView();
        }
      });
    }, 0);
  };
  useEffect(() => {
    if (isOpen) initData();
  }, [isOpen]);

  // 一个月dom高度
  const monthHeight = useRef(0);
  const getMonthHeight = () => {
    if (monthHeight.current) return monthHeight.current;
    const height = getMonthsRef().getElementsByClassName(
      "calendar-table-month"
    )?.[0]?.clientHeight;
    if (height) monthHeight.current = height;
    return height || 320;
  };

  // 滚动面板信息
  const scrollInfo = useRef({
    scrollTop: 0,
    clientHeight: 0,
    scrollHeight: 0,
  });
  // 页面滚动
  const onScroll = (e: any) => {
    if (e?.target) {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      scrollInfo.current = {
        scrollTop,
        clientHeight,
        scrollHeight,
      };
      if (scrollTop < 50 || scrollHeight - 50 < scrollTop + clientHeight)
        addMonths();
      else checkMonths();
    }
  };
  const checkMonths = debounce(() => {
    addMonths();
  }, 500);
  // 添加月份数量
  const addMonths = () => {
    const addMonthNum = 3,
      needHeight = getMonthHeight() * addMonthNum; // 需要添加月份的高度界限
      const { scrollTop, clientHeight, scrollHeight } = scrollInfo.current;
    if (scrollTop < needHeight) {
      const { list } = addMonthByMonths("prev", [...months], addMonthNum);
      setMonths(list);
    } else if (scrollTop + clientHeight + needHeight > scrollHeight) {
      const { list } = addMonthByMonths("next", [...months], addMonthNum);
      setMonths(list);
    }
  };

  const handleConfirm = () => {
    confirm?.(selectData);
  };

  /* render */
  return (
    <PopLayer
      isOpen={isOpen}
      position="bottom"
      showLayer={onClose}
      showClose={true}
      customContentClass="calendar-pop-container"
    >
      <View className="calendar-pop-header">
        <Text className="calendar-pop-header-cancel" onClick={onClose}>
          取消
        </Text>
        <Text className="calendar-pop-header-title">选择日期</Text>
        <Text
          className="calendar-pop-header-confirm"
          onClick={() => {
            handleConfirm();
          }}
        >
          确定
        </Text>
      </View>
      <View className="calendar-pop-content">
        <View className="calendar-table-row calendar-table-weekdays">
          {WeekdaysText.map((w) => (
            <View className="calendar-table-col" key={w}>
              {w}
            </View>
          ))}
        </View>
        <ScrollView
          className="calendar-table-months"
          ref={monthsRef}
          onScroll={onScroll}
        >
          <View className="calendar-table-months-body">
            {months.map((m) => (
              <MonthItem
                key={m.month}
                month={m.month}
                type={type}
                disableDate={disableDate}
                onDayClick={onDayClick}
                data={selectData}
              ></MonthItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </PopLayer>
  );
};

interface MonthPropsType extends CalendarPropsType {
  month: string;
}
const MonthItem: FC<MonthPropsType> = (props) => {
  const { month, type, disableDate, onDayClick, data } = props;

  // 选中日期字符串
  const selectedDayStr = useMemo(() => {
    const selectedDay = data instanceof Array ? data[0] : data;
    return dayjs(selectedDay).format(DateFormatStr);
  }, [data]);
  // 当前选中月
  const isCurrent = useMemo(() => {
    return selectedDayStr.indexOf(month) !== -1;
  }, [selectedDayStr, month]);

  const monthInfo = useMemo(() => {
    return getMonthInfo(month);
  }, [month]);

  // 点击day
  const handleDayClick = (day: DayItemApi) => {
    if (!isValidDay(day)) return;
    onDayClick && onDayClick?.(day);
  };

  // 日期是否有效 、 可选
  const isValidDay = (day: DayItemApi) => {
    if (!day || !day?.date || day.disabled) return false;
    if (disableDate && !disableDate(day)) return false;
    return true;
  };

  // class
  const getDayClass = (day: DayItemApi) => {
    const isValid = isValidDay(day);
    const dayClass = {
      "is-disabled": !isValid,
    };
    const date = day.date || "";
    if (isValid && date) {
      // 日期选中
      if (type === "range") {
        const selectedRange = data || ["", ""];
        if (selectedRange[0]) {
          if (date === selectedRange[0]) {
            dayClass["is-range-active"] = true;
            dayClass["is-range-start"] = true;
          }
          if (selectedRange[1]) {
            if (date === selectedRange[1]) {
              dayClass["is-range-active"] = true;
              dayClass["is-range-end"] = true;
            } else if (date > selectedRange[0] && date < selectedRange[1]) {
              dayClass["is-range-active"] = true;
              dayClass["is-range-middle"] = true;
            }
          }
        }
      } else if (selectedDayStr && selectedDayStr === date) {
        dayClass["is-radio-active"] = true;
      }
    }
    return dayClass;
  };

  return (
    <View
      className={`calendar-table-month ${isCurrent ? "is-selected-month" : ""}`}
      id={`calendar-table-${month}`}
    >
      <View className="calendar-table-title">{monthInfo.month}</View>
      {monthInfo.weeks.map((w: DayItemApi[], ind: number) => (
        <View className="calendar-table-row" key={ind}>
          {w.map((day: DayItemApi, iind: number) => {
            return (
              <View
                className={classNames(
                  "calendar-table-col",
                  "calendar-table-day",
                  getDayClass(day)
                )}
                key={iind}
                onClick={() => handleDayClick(day)}
              >
                <View className="calendar-table-day-content">
                  {day.isToday ? "今天" : day.day}
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};