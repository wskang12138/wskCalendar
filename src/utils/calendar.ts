import dayjs from "dayjs";

export interface DayItemApi {
  day: string;
  date?: string;
  month?: number;
  year?: number;
  disabled?: boolean; // 是否可选
  isToday?: boolean; // 是否今天
}
export const DateFormatStr = "YYYY-MM-DD";
/**
 * 获取月份信息
 * @param month
 * @returns month各周次信息
 */
export const getMonthInfo = (month: string | number) => {
  const currentDay = dayjs().format(DateFormatStr);
  const date = dayjs(month);

  const monthNum = date.daysInMonth();
  const weeks: DayItemApi[][] = [];
  let curWeek: DayItemApi[] = [];
  // 第一天星期
  let startDay = date.startOf("month").day();
  if (startDay === 0) startDay = 7;
  if (startDay > 1) {
    const preMonthDays = date.subtract(1, "month").daysInMonth();
    for (let i = startDay - 1; i > 0; i--) {
      curWeek.push({
        day: String(preMonthDays - i + 1),
        disabled: true,
      });
    }
  }

  for (let i = 1; i <= monthNum; i++) {
    const dateStr = date.date(i).format(DateFormatStr);
    curWeek.push({
      day: String(i),
      date: dateStr,
      month: date.month() + 1,
      year: date.year(),
      isToday: dateStr === currentDay,
    });
    if (curWeek.length === 7) {
      weeks.push(curWeek);
      curWeek = [];
    }
  }
  const curWeekLength = curWeek.length;
  if (curWeekLength) {
    if (curWeekLength < 7) {
      for (let i = 0; i < 7 - curWeekLength; i++) {
        curWeek.push({
          day: String(i + 1),
          disabled: true,
        });
      }
    }
    weeks.push(curWeek);
  }

  return { weeks, month: date.format("YYYY年M月") };
};

export interface MonthsApi {
  month: string;
  isCurrent?: boolean;
}

export const getRecentMonth = (recent: number = 5, initMonth?: string) => {
  const months: MonthsApi[] = [];
  let month = initMonth ? dayjs(initMonth) : dayjs();
  months.push({
    month: month.format("YYYY-MM"),
    isCurrent: true,
  });
  for (let i = 1; i <= recent; i++) {
    months.push({
      month: month.add(i, "month").format("YYYY-MM"),
    });
    months.unshift({
      month: month.subtract(i, "month").format("YYYY-MM"),
    });
  }
  return months;
};

/**
 * 添加月份
 * @param type 往前、往后添加
 * @param list 已有月份
 * @param num 一次添加月份数量
 * @param maxNum 显示最大月份
 * @returns
 */
export const addMonthByMonths = (
  type: "prev" | "next",
  list: MonthsApi[],
  num = 2,
  maxNum = 30
) => {
  let months = [...list];
  if (type === "prev") {
    let month = dayjs(months[0]?.month);
    let i = 0;
    while (i < num) {
      month = month.subtract(1, "month");
      months.unshift({
        month: month.format("YYYY-MM"),
      });
      i++;
    }
    if (months.length > maxNum) months = months.slice(0, maxNum);
  } else {
    let month = dayjs(months[months.length - 1]?.month);
    let i = 0;
    while (i < num) {
      month = month.add(1, "month");
      months.push({
        month: month.format("YYYY-MM"),
      });
      i++;
    }
    if (months.length > maxNum) months = months.slice(months.length - maxNum);
  }

  return { list: months };
};

// 防频
export const requestAniFrame = (function () {
  if (typeof window !== "undefined") {
    const _window = window as any;
    return (
      _window.requestAnimationFrame ||
      _window.webkitRequestAnimationFrame ||
      function (callback: any) {
        _window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  return (callback: any) => {
    setTimeout(callback, 1000 / 60);
  };
})();

export function throttle(fn: any, wait = 1000) {
  let handle = false;
  return function (...args: any[]) {
    if (handle) return;
    handle = true;
    fn(...args);
    setTimeout(() => {
      handle = false;
    }, wait);
  };
}

export function debounce(fn: any, wait = 1000) {
  let timer: any;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
