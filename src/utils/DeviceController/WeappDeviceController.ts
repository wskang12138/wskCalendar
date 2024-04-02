import Taro from "@tarojs/taro"
import { DeviceController } from "../types";

export class WeappDeviceController implements DeviceController {
  scanCode(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      Taro.scanCode({
        success: res => {
          resolve(res.result)
        },
        fail: () => {
          reject()
        }
      }).then()
    })
  }
}
