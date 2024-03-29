export interface PopLayerProps {
    titleClass?: string;
    titleColor?: string;
    showCloseColor?: string;
    titleContainerClass?: string;
    insideBottomContentClass?: string;
    confirmText?: string;
    customTitleClass?: string;
    closeIconClass?: string;
    centerConfirmClass?: string;
    textCenterContentClass?: string;
    backgroundCenterContentClass?: string;
    cancelText?: string;
    insideCenterContentClass?: string;
    topConfirmText?: string;
    topCancelText?: string;
    centerCancelClass?: string;
    insideSelectContentClass?: string;
    customContentClass?: string;
    insideContentClass?: string;
    coverLayerClass?: string;
    layerContentClass?: string;
    isOpen: boolean;
    position: string;
    title?: string | React.ReactNode;
    textContent?: string;
    topCancelColor?: string;
    topConfirmColor?: string;
    centerCancelColor?: string;
    centerConfirmColor?: string;
    showClose?: boolean; // 是否展示关闭的小图标 默认false
    closeCoverLayer?: boolean; //默认false ， 为true：可以点击遮罩层关闭弹窗
    customTitle?: React.ReactNode;
    customBg?: React.ReactNode;
    children?: React.ReactNode;
    confirm?: () => void;
    showLayer: () => void;
}
export interface PopLayerState {
    isOpen: boolean;
}

export interface PopLayerPosition extends PopLayerState {
    zIndex: number;
    display: string;
}