import { BrowserController, DeviceType, logSuccessKey } from "./index";

const currentWindow = window.top as any

export class IosBrowserController implements BrowserController {

  constructor() {
    const iosDevices = currentWindow.webkit?.messageHandlers?.IosDevices;
    if (!iosDevices) {
      throw new Error("window中没有IosDevice，无法创建IosBrowserController")
    }
  }

  logSuccess(): void {
    currentWindow.webkit.messageHandlers.IosStorage.postMessage({ "method": "set", "key": logSuccessKey, "value": "true" })
  }

  back(): void {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "back" })
  }

  getDeviceId(): string {
    return currentWindow.prompt("getId")
  }

  getDeviceIp(): string {
    return currentWindow.prompt("getIp")
  }

  getStatusBarHeight(): number {
    return parseInt(currentWindow.prompt("getStatusBarHeight")) + 10;
  }

  deviceType(): DeviceType {
    return "ios";
  }

  goHome(): void {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "goHome" })
  }

  logout(): void {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "logout" })
  }

  openFileReader(path: string): boolean {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "openFileReader", "path": path })
    return true
  }

  openFileForWebview() { }

  cacheSize(): number {
    return parseInt(currentWindow.prompt("cacheSize"))
  }

  clearCache(): void {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "clearCache" })
  }

  getFooterHeight(): number {
    let footerHeight = parseInt(currentWindow.prompt("getFooterHeight"))
    return Number.isNaN(footerHeight) ? 0 : footerHeight
  }

  appVersion(): string {
    let appVersion = currentWindow.prompt("getAppVersion")
    appVersion = appVersion ? appVersion : "5.0.0"

    return appVersion;
  }

  gotoUpdate(): void {
    currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "gotoUpdate" })
  }

  hasNewVersion(): boolean {
    let hasNewVersion = currentWindow.prompt("hasNewVersion");
    return hasNewVersion === "true";
  }

  getAppName(): string {
    let appName = currentWindow.prompt("getAppName");
    return appName ? appName : "wisecampus";
  }

  getEnvironmentVariable(key: string): string {
    return currentWindow.prompt(`EnvironmentVariable|${key}`);
  }

  saveImageToPhotosAlbum(_path: string): Promise<void> {
    return Promise.reject();
  }

  navigateToMiniProgramForWebview(): void {
  }

}
