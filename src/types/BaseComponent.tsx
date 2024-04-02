import {Component, CSSProperties, ReactNode} from "react";
import classNames, {Argument} from "classnames"
import {paddingPrefix} from "../components/utils/classNameUtils";

export interface BaseProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | string;
}

export abstract class BaseComponent<P = {}, S = {}, SS = any> extends Component<P & BaseProps, S, SS> {

  constructor(props, context?) {
    super(props, context);
    this.setClassNamePrefix(this.getClassNamePrefix())
  }
  
  protected classNamePrefix: string

  protected setClassNamePrefix(prefix: string){
    let words = prefix.split(/(?=[A-Z])/);
    words = words.map(word => word.toLocaleLowerCase())
    let realPrefix = words.join("-");
    this.classNamePrefix = realPrefix.startsWith("wsk-")? realPrefix: `wsk-${realPrefix}`;
  }

  abstract getClassNamePrefix(): string;

  protected rootClass(...args: Argument[]): string {
    return classNames(`${this.classNamePrefix}-root`,this.class(args),
      {
        [`${this.props.className}`]: !!this.props.className
      })
  }

  protected class(...args: Argument[]): string {
    return classNames(paddingPrefix(this.classNamePrefix, args))
  }

  protected classNames(...args: Argument[]) {
    return classNames(...args, {
      [`${this.props.className}`]: !!this.props.className
    })
  }

  protected rootClassNames(...args: Argument[]){
    return classNames(...args, `${this.classNamePrefix}-root`,{
      [`${this.props.className}`]: !!this.props.className
    })
  }
}


