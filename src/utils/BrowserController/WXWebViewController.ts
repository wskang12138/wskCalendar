import Taro from "@tarojs/taro";
import { BrowserController, DeviceType } from "./index";
import { concatParamsStr } from "../WxSdk";

const currentWindow = window as any


export class WXWebViewController implements BrowserController {
  constructor() {
    const ua = currentWindow.navigator.userAgent.toLowerCase()
    if (!(ua.match(/micromessenger/i) == 'micromessenger')) {
      throw new Error("window用户设备信息中没有micromessenger，无法创建WXWebViewController")
    }
  }

  getFooterHeight: () => 0

  back(): void {
    Taro.navigateBack().then(null)
  }

  deviceType(): DeviceType {
    return "wx-webview";
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
    return false
  }

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

  openFileForWebview(wx, { fileUrl, fileType }) {
    if (!fileUrl) {
      throw new Error('fileUrl参数不能为空')
    }

    let confirmFileType: string
    if (!fileType) {
      const permissions = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt"]//文件类型
      let tempFileSplit = fileUrl.split('.')
      confirmFileType = tempFileSplit[tempFileSplit.length - 1] || ''
      if (!permissions.find(item => item == confirmFileType)) {//仅允许微信支持的文件
        throw new Error('当前文件类型不支持，请参考["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt"]')
        return;
      } else if (!confirmFileType) {//识别不出文件类型
        throw new Error('无法识别文件类型')
        return;
      }
    }
    wx.miniProgram.navigateTo({
      url: `/pages/fileDownload/index?fileUrl=${encodeURIComponent(fileUrl)}&fileType=${fileType}`,
    })
  }

  navigateToMiniProgramForWebview(wx, params) {
    const passParams = {
      ...params,
      extraData: JSON.stringify(params.extraData || {}),
      type: 'navigateToMiniProgram'
    }
    const url = `/pages/webviewMiddlePage/index?${concatParamsStr(passParams)}`
    wx.miniProgram.navigateTo({ url })
  }

}
