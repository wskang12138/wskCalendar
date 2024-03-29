import Taro from "@tarojs/taro"
import { MyStorage } from "./index";

export class WeappStorage implements MyStorage {

  get(key: string): string {
    return Taro.getStorageSync<string>(key)
  }

  set(key: string, value: string) {
    Taro.setStorageSync(key, value)
  }
}
