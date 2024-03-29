import { BaseProps } from "@/types/BaseComponent";


export interface NavBarProps extends BaseProps {
  
  /**导航标题 */
  title: string;

  /**居中 */
  center?: boolean;

  /**显示返回首页 */
  home?: boolean;

  /**标题宽度 */
  titleWidth?: number;

  /**背景高度 */
  bgHeight?: number;

  /**返回首页事件 */
  onBackHome?: () => void;

  /**返回自定义事件 */
  onBackLastPage?: () => void;
}