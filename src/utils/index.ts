import Taro from "@tarojs/taro";

export * from "./BrowserController"
export * from "./Stroage"
export * from "./Net"
export * from "./DeviceController"
export * from './WxSdk'
export * from './classNameUtils'

export const transformToRemOrRpx1 = function (size) {
  let width = 1
  try {
    width = Taro.getSystemInfoSync().windowWidth;
  } catch (error) {

  }
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


export const transformToRemOrRpx = function (size: number): string {
  var transSize = "0";
  Taro.getSystemInfo({
    success: (res) => {
      const width = res.windowWidth;
      const pixelRatio = 750 / width;
      if (process.env.TARO_ENV === "weapp") {
        transSize = size * pixelRatio + "rpx";
      } else {
        //if (process.env.TARO_ENV === 'h5')
        if (width >= 640) {
          var baseSize = 40;
        } else if (width <= 320) {
          var baseSize = 20;
        } else {
          var baseSize = (width / 320) * 20;
        }
        transSize = size / baseSize + "rem";
      }
    },
  });
  return transSize;
};
interface AnyObject {
  [prop: string]: any
}

export function isEqual(source: AnyObject, comparison) {
  const _source = JSON.stringify(source)
  const _comparison = JSON.stringify({ ...source, ...comparison })
  return _source === _comparison
}
