import { DownloadParam, Net, ShareParam, UploadParam } from "./index";

const currentWindow = window.top as any

export class AndroidNetController implements Net {
  private uploadTaskMap: Map<number, UploadParam>
  private downloadTaskMap: Map<number, DownloadParam>

  constructor() {
    if (!currentWindow.AndroidNet) {
      throw new Error("window中没有AndroidNet，无法创建AndroidNet")
    }
    this.uploadTaskMap = new Map<number, UploadParam>()

    currentWindow.onAndroidUploadSuccess = (taskId: number, response: string) => {
      if (this.uploadTaskMap.has(taskId)) {
        const success = this.uploadTaskMap.get(taskId)?.onSuccess
        success && success(response)
      }
    }

    currentWindow.onAndroidUploadError = (taskId: number, type: "network" | "noSelect" | "exceedLimit" | "extendNameError" | "exceedCount") => {
      if (this.uploadTaskMap.has(taskId)) {
        const onError = this.uploadTaskMap.get(taskId)?.onError
        onError && onError(type)
      }
    }

    currentWindow.onAndroidUploadProgress = (taskId: number, progress: number) => {
      if (this.uploadTaskMap.has(taskId)) {
        const onProgress = this.uploadTaskMap.get(taskId)?.onProgress
        onProgress && onProgress(progress)
      }
    }

    this.downloadTaskMap = new Map<number, DownloadParam>()

    currentWindow.onAndroidDownProgress = (taskId: number, progress: number) => {
      if (this.downloadTaskMap.has(taskId)) {
        const onProgress = this.downloadTaskMap.get(taskId)?.onProgress
        onProgress && onProgress(progress)
      }
    }

    currentWindow.onAndroidDownSuccess = (taskId: number, path: string) => {
      if (this.downloadTaskMap.has(taskId)) {
        const success = this.downloadTaskMap.get(taskId)?.onSuccess
        success && success(path)
      }
    }

    currentWindow.onAndroidDownError = (taskId: number, type: "network" | "noPermission") => {
      if (this.downloadTaskMap.has(taskId)) {
        const onError = this.downloadTaskMap.get(taskId)?.onError
        onError && onError(type)
      }
    }
  }

  downloadFile(param: DownloadParam): void {
    const id = new Date().getTime() % 2147483647
    this.downloadTaskMap.set(id, param)
    currentWindow.AndroidNet.downloadFile(id, param.url, param.fileName)
  }

  uploadFile(param: UploadParam): void {
    const id = new Date().getTime() % 2147483647
    this.uploadTaskMap.set(id, param)
    currentWindow.AndroidNet.uploadFile(id,
      param.url,
      param.fileType,
      param.limit,
      param.header ? JSON.stringify(param.header) : "",
      param.count || 1)
  }


  shareFile(param: ShareParam): void {
    const { type, value } = param
    switch (type) {
      case "text": currentWindow.AndroidDevice.shareText(value); break;
      case "image": currentWindow.AndroidDevice.shareImage(value); break;
      case "file": currentWindow.AndroidDevice.shareFile(value); break;
      default: currentWindow.AndroidDevice.shareText(value); break;
    }
  }
}
