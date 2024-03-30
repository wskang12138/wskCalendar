import { BaseProps } from "@/types/BaseComponent";

export  interface PropsType extends  BaseProps {
  list: TabItemDataApi[];
  value: number | string;
  onClick: any
}

export interface TabItemDataApi {
  value: number | string | undefined;
  label: string;
  subLabel?: string;
  info?: any;
}
