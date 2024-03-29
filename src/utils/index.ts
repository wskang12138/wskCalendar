import Taro from "@tarojs/taro";

export * from "./BrowserController"
export * from "./Stroage"
export * from "./Net"
export * from "./DeviceController"
export * from './WxSdk'
export * from './classNameUtils'

export const transformToRemOrRpx = function (size) {
  const width = Taro.getSystemInfoSync().windowWidth;
  const pixelRatio = 750 / width;
  if (process.env.TARO_ENV === 'weapp') {
    return size * pixelRatio + "rpx";
  }
  else {
    if (width >= 640) {
      var baseSize = 40;
    }
    else if (width <= 320) {
      var baseSize = 20;
    }
    else {
      var baseSize = width / 320 * 20;
    }
    return size / baseSize + "rem";
  }
};

interface AnyObject {
  [prop: string]: any
}

export function isEqual(source: AnyObject, comparison) {
  const _source = JSON.stringify(source)
  const _comparison = JSON.stringify({ ...source, ...comparison })
  return _source === _comparison
}
