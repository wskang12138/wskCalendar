import { LocationService, LocationServiceResult } from "./index";

const messageMap = new Map<string, string>()
messageMap.set("getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF", "系统没有开启定位")
messageMap.set("getLocation:fail system permission denied", "未授权微信定位")
messageMap.set("getLocation:fail auth deny", "小程序未授权定位")
messageMap.set("getLocation:fail auth deny", "小程序未授权定位")
messageMap.set("getLocation:fail system permission denied", "系统没有开启定位或系统未授权微信定位")

export class WeappLocationService implements LocationService {

  getLocation(): Promise<LocationServiceResult> {
    return new Promise<LocationServiceResult>((resolve, reject) => {
      wx.getLocation({
        type: "wgs84",
        success: res => {
          resolve({
            longitude: res.longitude,
            latitude: res.latitude
          })
        },
        fail: res => {
          reject(new Error(messageMap.get(res.errMsg)))
        }
      })
    })
  }
}
