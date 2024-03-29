import { MyStorage } from "./index";

const currentWindow = window.top as any

export class IosStorage implements MyStorage {

  constructor() {
    let iosStorage = currentWindow.webkit?.messageHandlers?.IosStorage;
    if (!iosStorage) {
      throw new Error("window中没有iosStorage，无法创建IosStorage")
    }
  }

  get(key: string): string {
    return currentWindow.prompt(`IosStorageGet|${key}`)
  }

  set(key: string, value: string) {
    currentWindow.webkit.messageHandlers.IosStorage.postMessage({ "method": "set", "key": key, "value": value })
  }
}
