import { Component } from "react";
import { View, Image } from "@tarojs/components";
import "./index.scss";
import CloseSvg from '@/images/close.svg'
import { PopLayerPosition, PopLayerProps, PopLayerState } from "./types";


export class PopLayer extends Component<PopLayerProps, PopLayerState> {
    constructor(props) {
        super(props);
        this.state = { isOpen: this.props.isOpen || false };
    }
    init(props: PopLayerProps) {
        let position = props.position;
        let dom: React.ReactNode = null;
        switch (position) {
            case "top":
                dom = <PopLayerTop {...props}></PopLayerTop>;
                break;
            case "center":
                dom = <PopLayerCenter {...props}></PopLayerCenter>;
                break;
            case "bottom":
                dom = <PopLayerBottom {...props}></PopLayerBottom>;
                break;
            default:
                dom = <PopLayerCenter {...props}></PopLayerCenter>;
                break;
        }
        return dom;
    }
    render() {
        let props = this.props;
        let PopLayerDom = this.init(props);
        return <View>{PopLayerDom}</View>;
    }
}
class PopLayerTop extends Component<PopLayerProps, PopLayerPosition> {
    state = { zIndex: -1, display: "block", isOpen: false };
    UNSAFE_componentWillReceiveProps(props) {
        let zIndex = props.isOpen ? 99 : -1;
        let time = props.isOpen ? 0 : 200;
        setTimeout(() => {
            this.setState(
                { zIndex, display: props.isOpen ? "block" : "none" },
                () => {
                    if (!props.isOpen) return;
                    let time1 = props.isOpen ? 200 : 0;
                    setTimeout(() => {
                        this.setState({ isOpen: props.isOpen });
                    }, time1);
                }
            );
        }, time);
        if (props.isOpen) return true;
        this.setState({ isOpen: props.isOpen });
        return true;
    }
    componentDidMount() {
        if (!this.state.isOpen) {
            setTimeout(() => {
                this.setState({
                    display: "none",
                });
            }, 500);
        }
    }
    //   关闭页面
    closeCurrentPage(type = 0) {
        if (type == 1 && this.props.closeCoverLayer) {
            return;
        }
        this.props.showLayer();
    }
    render() {
        let props = this.props;
        let isOpen = this.state.isOpen;
        let showBlock = isOpen ? " layerOut-open " : " ";
        let contentClass = isOpen ? " container_LayerOut_choiceBox_open_top " : " ";
        return (
            <View
                className={"container_LayerOut_f " + props.layerContentClass}
                style={{ zIndex: this.state.zIndex, display: this.state.display }}
                catchMove
                onTouchMove={(e) => e.stopPropagation()}
            >
                <View
                    className={
                        "container_LayerOut " + showBlock + props.coverLayerClass || ""
                    }
                    onClick={() => {
                        this.closeCurrentPage(1);
                    }}
                    style={{ zIndex: this.state.zIndex }}
                ></View>
                <View
                    className={
                        "container_LayerOut_choiceBox_top " +
                        contentClass +
                        props.insideContentClass
                    }
                    style={{ zIndex: this.state.zIndex + 1 }}
                >
                    <View className="container_LayerOut_content_top">
                        <View
                            className={
                                "container_LayerOut_content_top_box " + props.customContentClass
                            }
                        >
                            {props.children}
                        </View>
                    </View>
                    <View
                        className={
                            "container_LayerOut_choiceBox_option_top " +
                            props.insideSelectContentClass
                        }
                    >
                        <View
                            className={
                                "cancel_box cancel_box-top box " + props.centerCancelClass
                            }
                            onClick={() => {
                                this.closeCurrentPage(0);
                            }}
                            style={{ color: props.topCancelColor || "#565656" }}
                        >
                            {props.topCancelText || "取消"}
                        </View>
                        <View
                            className="confirm_box confirm_box-top  box"
                            onClick={this.props.confirm}
                            style={{ color: props.topConfirmColor || "#0090ff" }}
                        >
                            {props.topConfirmText || "确定"}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class PopLayerCenter extends Component<PopLayerProps, PopLayerPosition> {
    state = { zIndex: -1, display: "block", isOpen: false };
    UNSAFE_componentWillReceiveProps(props) {
        let zIndex = props.isOpen ? 99 : -1;
        let time = props.isOpen ? 0 : 200;
        setTimeout(() => {
            this.setState(
                { zIndex, display: props.isOpen ? "block" : "none" },
                () => {
                    if (!props.isOpen) return;
                    let time1 = props.isOpen ? 200 : 0;
                    setTimeout(() => {
                        this.setState({ isOpen: props.isOpen });
                    }, time1);
                }
            );
        }, time);
        if (props.isOpen) return true;
        this.setState({ isOpen: props.isOpen });
        return true;
    }
    componentDidCatchError() { }
    componentDidMount() {
        if (!this.state.isOpen) {
            setTimeout(() => {
                this.setState({
                    display: "none",
                });
            }, 500);
        }
    }
    closeCurrentPage(type = 0) {
        if (type == 1 && this.props.closeCoverLayer) {
            return;
        }
        this.props.showLayer();
    }
    render() {
        let props = this.props;
        let isOpen = this.state.isOpen;
        let showBlock = isOpen ? " layerOut-open " : " ";
        let contentClass = isOpen ? " container_LayerOut_choiceBox_open " : " ";

        return (
            <View
                catchMove
                onTouchMove={(e) => e.stopPropagation()}
                className={"container_LayerOut_f " + props.layerContentClass}
                style={{ zIndex: this.state.zIndex, display: this.state.display }}
            >
                <View
                    className={" container_LayerOut " + showBlock + props.coverLayerClass}
                    onClick={() => {
                        this.closeCurrentPage(1);
                    }}
                    style={{ zIndex: this.state.zIndex }}
                ></View>
                <View
                    className={
                        "container_LayerOut_choiceBox " +
                        contentClass +
                        props.insideContentClass
                    }
                    style={{ zIndex: this.state.zIndex + 1 }}
                >
                    <View
                        className={"container_LayerOut_content " + props.insideCenterContentClass}
                    >
                        <View
                            className={
                                "container_LayerOut_content_customBg " +
                                props.backgroundCenterContentClass
                            }
                        >
                            {props.customBg}
                        </View>
                        <View
                            className={
                                "container_LayerOut_content_textContent " +
                                props.textCenterContentClass
                            }
                        >
                            {props.textContent}
                        </View>
                    </View>
                    <View
                        className={
                            "container_LayerOut_choiceBox_option " +
                            props.insideSelectContentClass
                        }
                    >
                        <View
                            className={"cancel_box box " + props.centerCancelClass}
                            onClick={() => {
                                this.closeCurrentPage(0);
                            }}
                            style={{ color: props.centerCancelColor || "#565656" }}
                        >
                            {props.cancelText || "取消操作"}
                        </View>
                        <View
                            className={"confirm_box box " + props.centerConfirmClass}
                            onClick={this.props.confirm}
                            style={{ color: props.centerConfirmColor || "#0090ff" }}
                        >
                            {props.confirmText || "确定操作"}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

class PopLayerBottom extends Component<PopLayerProps, PopLayerPosition> {
    constructor(props) {
        super(props);
        this.state = { zIndex: -1, display: "block", isOpen: false };
    }
    UNSAFE_componentWillReceiveProps(nextProps: PopLayerProps) {
        if (this.props.isOpen === nextProps.isOpen) {
            return;
        }
        let zIndex = nextProps.isOpen ? 99 : -1;
        let time = nextProps.isOpen ? 0 : 200;
        setTimeout(() => {
            this.setState(
                { zIndex, display: nextProps.isOpen ? "block" : "none" },
                () => {
                    if (!nextProps.isOpen) return;
                    let time1 = nextProps.isOpen ? 200 : 0;
                    setTimeout(() => {
                        this.setState({ isOpen: nextProps.isOpen });
                    }, time1);
                }
            );
        }, time);
        if (nextProps.isOpen) return true;
        this.setState({ isOpen: nextProps.isOpen });
    }

    componentDidMount() {
        if (!this.state.isOpen) {
            setTimeout(() => {
                this.setState({
                    display: "none",
                });
            }, 500);
        }
    }

    closeCurrentPage(type = 0) {
        if (type == 1 && this.props.closeCoverLayer) {
            return;
        }
        this.props.showLayer();
    }
    render() {
        let props = this.props;
        let isOpen = this.state.isOpen;
        let showBlock = isOpen ? " layerOut-open " : " ";
        let contentClass = isOpen
            ? " container_LayerOut_choiceBox_open_bottom "
            : " ";
        let closeDom = (
            <Image src={CloseSvg} className="popLayer_show_svg_close"></Image>
        );
        return (
            <View
                className={"container_LayerOut_f " + props.layerContentClass}
                style={{ zIndex: this.state.zIndex, display: this.state.display }}
                catchMove
                onTouchMove={(e) => e.stopPropagation()}
            >
                <View
                    className={"container_LayerOut " + showBlock + props.coverLayerClass}
                    onClick={() => {
                        this.closeCurrentPage(1);
                    }}
                    catchMove
                    onTouchMove={(e) => e.stopPropagation()}
                    style={{ zIndex: this.state.zIndex }}
                ></View>
                <View
                    className={
                        "container_LayerOut_choiceBox_bottom " +
                        contentClass +
                        props.insideContentClass
                    }
                    style={{ zIndex: this.state.zIndex + 1 }}
                >
                    <View
                        className={
                            "container_LayerOut_content " + props.insideBottomContentClass
                        }
                    >
                        <View
                            className={
                                "container_LayerOut_content_title " +
                                props.titleContainerClass || ""
                            }
                        >
                            <View
                                className={props.titleClass || ""}
                                style={{ color: props.titleColor }}
                            >
                                {props.title || "标题"}
                            </View>
                            <View
                                className={
                                    "popLayer_customTitleClass " + props.customTitleClass
                                }
                            >
                                {props.customTitle}
                            </View>
                            <View
                                onClick={() => {
                                    this.closeCurrentPage(0);
                                }}
                                className={props.closeIconClass || ""}
                            >
                                {props.showClose ? closeDom : ""}
                            </View>
                        </View>
                        <View
                            className={
                                "container_LayerOut_content_box " + props.customContentClass
                            }
                        >
                            {props.children}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
