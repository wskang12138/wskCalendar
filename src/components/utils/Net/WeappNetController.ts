import { DownloadParam, Net, UploadParam } from "./index";
import Taro from "@tarojs/taro"

export class WeappNetController implements Net {


  downloadFile(param: DownloadParam): void {
    const downloadTask = wx.downloadFile({
      url: param.url,
      filePath: wx.env.USER_DATA_PATH + '/' + param.fileName,
      success: result => {
        param.onSuccess && param.onSuccess(result.filePath)
      },
      fail: () => {
        param.onError && param.onError("network")
      }
    });
    downloadTask.onProgressUpdate(res => {
      param.onProgress && param.onProgress(res.progress)
    })
  }

  uploadFile(param: UploadParam) {
    this.innerUploadFile(param).then()
  }

  private async innerUploadFile(param: UploadParam) {
    await Taro.chooseMessageFile({
      count: param.count || 1,
      extension: param.fileType,
      fail: res => {
      },
      success: res => {
      },
      type: "file"
    })
  }

  shareFile(): void {
    throw new Error("小程序不单独提供分享功能，请调用小程序特定的分享组件")
  }
}
