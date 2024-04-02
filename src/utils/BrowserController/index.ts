import Taro from '@tarojs/taro';
import { AndroidBrowserController } from "./AndroidBrowserController";
import { IosBrowserController } from "./IosBrowserController";
import { WeappBrowserController } from "./WeappBrowserController";
import { WXWebViewController } from "./WXWebViewController";
import { BrowserController, DeviceType } from '../types';

const ENV_TYPE = Taro.ENV_TYPE;



let browserController: BrowserController | null = null


export function getBrowserController(): BrowserController {
  if (!browserController) {
    browserController = newBrowserController()
  }
  return browserController
}

function newBrowserController(): BrowserController {
  if (Taro.getEnv() === ENV_TYPE.WEB) {
    try {
      return new AndroidBrowserController()
    } catch {
    }
    try {
      return new IosBrowserController()
    } catch {
    }
    try {
      return new WXWebViewController()
    } catch {
      console.log("创建WXWebViewController失败")
    }
  }

  if (Taro.getEnv() === ENV_TYPE.WEAPP) {
    return new WeappBrowserController()
  }

  return new EmptyBrowserController()
}

class EmptyBrowserController implements BrowserController {
  getFooterHeight: () => 0
  back(): void {
    Taro.navigateBack().then(null)
  }

  deviceType(): DeviceType {
    return "web";
  }

  getDeviceId(): string {
    return "";
  }

  getDeviceIp(): string {
    return "";
  }

  getStatusBarHeight(): number {
    return 0;
  }

  goHome(): void {

  }

  logout(): void {
  }

  openFileReader(_path: string): boolean {
    return false;
  }

  openFileForWebview() { }

  cacheSize(): number {
    return 0;
  }

  clearCache(): void {
  }

  appVersion(): string {
    return "5.0.0";
  }

  gotoUpdate(): void {
  }

  hasNewVersion(): boolean {
    return false;
  }

  getAppName(): string {
    return "notOnApp";
  }

  getEnvironmentVariable(_key: string): string {
    return "";
  }

  logSuccess(): void {
  }

  saveImageToPhotosAlbum(_path: string): Promise<void> {
    return Promise.reject();
  }


  navigateToMiniProgramForWebview(): void {
  }
}
