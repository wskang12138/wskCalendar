import Taro from "@tarojs/taro";
import { AndroidDeviceController } from "./AndroidDeviceController";
import { IosDeviceController } from "./IosDeviceController";
import { WeappDeviceController } from "./WeappDeviceController";

export interface DeviceController {
  scanCode(): Promise<string>

}


let deviceController: DeviceController | null = null

export function getDeviceController(): DeviceController {

  if (!deviceController) {
    deviceController = newDeviceController()
  }

  return deviceController
}

function newDeviceController(): DeviceController {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    try {
      return new AndroidDeviceController()
    } catch {
    }

    try {
      return new IosDeviceController()
    } catch {
    }
  }

  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    return new WeappDeviceController()
  }

  return new EmptyDeviceController()
}

class EmptyDeviceController implements DeviceController {
  scanCode(): Promise<string> {
    return Promise.resolve("");
  }

}
