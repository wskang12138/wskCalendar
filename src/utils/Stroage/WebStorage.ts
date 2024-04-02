import { MyStorage } from "./index";

const currentWindow = window.top as any

export class WebStorage implements MyStorage {
  constructor() {
    if (!currentWindow.localStorage) {
      throw new Error("window中没有localStorage，无法创建WebStorage")
    }
  }

  get(key: string): string {
    if (process.env.NODE_ENV === 'production') {
      return ""
    }
    return currentWindow.localStorage.getItem(key);
  }

  set(key: string, value: string) {
    if (process.env.NODE_ENV !== 'production') {
      currentWindow.localStorage.setItem(key, value)
    }
  }
}
