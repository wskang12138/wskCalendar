import Taro from "@tarojs/taro";
import { BrowserController, DeviceType, logSuccessKey } from "./index";
let pixelRatio = 1
try {
    pixelRatio  = Taro.getSystemInfoSync().pixelRatio
} catch (error) {

}


const currentWindow = window.top as any

export class AndroidBrowserController implements BrowserController {

  constructor() {
    if (!currentWindow.AndroidDevice) {
      throw new Error("window中没有AndroidDevice，无法创建AndroidBrowserController")
    }
  }

  back(): void {
    currentWindow.AndroidDevice.back()
  }

  getDeviceId(): string {
    return currentWindow.AndroidDevice.getId();
  }

  getDeviceIp(): string {
    return currentWindow.AndroidDevice.getIp();
  }

  getStatusBarHeight(): number {
    return currentWindow.AndroidDevice.getStatusBarHeight() / pixelRatio;
  }

  deviceType(): DeviceType {
    return "android";
  }

  goHome(): void {
    return currentWindow.AndroidDevice.goHome()
  }

  logout(): void {
    return currentWindow.AndroidDevice.logout()
  }

  openFileReader(path: string): boolean {
    return currentWindow.AndroidDevice.openFileReader(path);
  }

  openFileForWebview() { }

  cacheSize(): number {
    return currentWindow.AndroidDevice.cacheSize();
  }

  clearCache(): void {
    currentWindow.AndroidDevice.clearCache();
  }

  getFooterHeight(): number {
    return 0;
  }

  appVersion(): string {
    if (currentWindow.AndroidDevice.getAppVersion) {
      return currentWindow.AndroidDevice.getAppVersion()
    }
    return "5.0.0";
  }

  gotoUpdate(): void {
    currentWindow.AndroidDevice.gotoUpdate && currentWindow.AndroidDevice.gotoUpdate()
  }

  hasNewVersion(): boolean {
    if (currentWindow.AndroidDevice.hasNewVersion) {
      return currentWindow.AndroidDevice.hasNewVersion()
    }
    return false;
  }

  getAppName(): string {
    if (currentWindow.AndroidDevice.getAppName) {
      return currentWindow.AndroidDevice.getAppName()
    }
    return "wisecampus";
  }

  getEnvironmentVariable(key: string): string {
    if (currentWindow.AndroidDevice.getEnvironmentVariable) {
      return currentWindow.AndroidDevice.getEnvironmentVariable(key)
    }
    return "";
  }

  logSuccess(): void {
    currentWindow.AndroidStorage.set(logSuccessKey, "true")
  }

  saveImageToPhotosAlbum(path: string): Promise<void> {
    currentWindow.AndroidDevice.save2Album(path)
    return Promise.resolve();
  }

  navigateToMiniProgramForWebview(): void {
  }

}
