import { MyStorage } from "./index";

const currentWindow = window.top as any

export class AndroidStorage implements MyStorage {

  constructor() {
    if (!currentWindow.AndroidStorage) {
      throw new Error("window中没有AndroidStorage，无法创建AndroidStorage")
    }
  }

  get(key: string): string {
    return currentWindow.AndroidStorage.get(key)
  }

  set(key: string, value: string) {
    currentWindow.AndroidStorage.set(key, value)
  }

}
