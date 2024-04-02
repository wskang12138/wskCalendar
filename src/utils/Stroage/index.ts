import Taro from '@tarojs/taro';
import { AndroidStorage } from "./AndroidStorage";
import { WebStorage } from "./WebStorage";
import { IosStorage } from "./IosStorage";
import { WeappStorage } from "./WeappStorage";
let ENV_TYPE = Taro.ENV_TYPE;
export interface MyStorage {
  set: (key: string, value: string) => void
  get: (key: string) => string
}

let storage: MyStorage | null = null

export function getStorage(): MyStorage {
  if (!storage) {
    storage = newStorage()
  }
  return storage
}

function newStorage() {
  if (Taro.getEnv() === ENV_TYPE.WEB) {
    try {
      return new AndroidStorage()
    } catch {
    }
    try {
      return new IosStorage()
    } catch {
    }
    try {
      return new WebStorage()
    } catch {
    }
  } else if (Taro.getEnv() === ENV_TYPE.WEAPP) {
    return new WeappStorage()
  }
  throw new Error("还未实现当前环境的MyStorage")
}
