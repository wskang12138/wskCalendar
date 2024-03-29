import { BaseProps } from "@/types/BaseComponent";

export interface PropsType extends BaseProps {
  startDate?: string;
  disableDate?: any;
  onDayClick?: any;
  data?: string[];
}
export interface MonthPropsType extends PropsType {
  month:string;
}
