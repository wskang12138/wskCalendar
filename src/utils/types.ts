import { NavigateToMiniProgramParams, OpenFileParams } from "./WxSdk/type"

export interface BrowserController {
  deviceType(): DeviceType
  getStatusBarHeight: () => number
  getFooterHeight: () => number
  back: () => void
  getDeviceId: () => string
  getDeviceIp: () => string
  openFileReader: (path: string) => boolean
  goHome: () => void
  logout: () => void
  logSuccess(): void
  cacheSize: () => number
  clearCache: () => void
  appVersion: () => string
  hasNewVersion: () => boolean
  gotoUpdate: () => void
  getAppName: () => string
  getEnvironmentVariable: (key: string) => string
  saveImageToPhotosAlbum(path: string): Promise<void>

  openFileForWebview: (wx: any, params: OpenFileParams) => void
  navigateToMiniProgramForWebview: (wx: any, params: NavigateToMiniProgramParams) => void
}
export type DeviceType = "ios" | "android" | "web" | "weapp" | "wx-webview";

export const logSuccessKey = "__APP_ONLY_LOG_SUCCESS_KEY__"

export interface DeviceController {
  scanCode(): Promise<string>

}
