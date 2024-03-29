import { BaseProps } from "@/types/BaseComponent";

export interface CalendarPropsType extends BaseProps {
  type?: "radio" | "range"; // 单个日期 | 日期范围
  data?: string | string[]; // 当前选中日期 | 选中日期范围
  disableDate?: any;
  onDayClick?: any;
}

export interface PropsType extends CalendarPropsType {
  isOpen: boolean;
  confirm?: (selectedDay: any) => void;
  onClose: () => void;
  minDay?: string;
  maxDay?: string;
  canCancel?: boolean;
}
