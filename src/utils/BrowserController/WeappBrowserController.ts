import Taro from "@tarojs/taro"
import { BrowserController, DeviceType } from "./../types";
export class WeappBrowserController implements BrowserController {
  appVersion(): string {
    return "";
  }

  back(): void {
  }

  cacheSize(): number {
    return 0;
  }

  clearCache(): void {
  }

  deviceType(): DeviceType {
    return "weapp";
  }

  getDeviceId(): string {
    return "";
  }

  getDeviceIp(): string {
    return "";
  }

  getFooterHeight(): number {
    return 0;
  }

  getStatusBarHeight(): number {
    return 0;
  }

  goHome(): void {
  }

  gotoUpdate(): void {
  }

  hasNewVersion(): boolean {
    return false;
  }

  logout(): void {
  }

  openFileReader(path: string): boolean {
    Taro.openDocument({
      filePath: path
    }).then()

    return false;
  }

  openFileForWebview() { }

  getAppName(): string {
    return "weapp";
  }

  getEnvironmentVariable(_key: string): string {
    return "";
  }

  logSuccess(): void {
  }

  saveImageToPhotosAlbum(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: path,
        success: () => resolve(),
        fail: () => reject()
      })
    })
  }

  navigateToMiniProgramForWebview(): void {
  }

}
