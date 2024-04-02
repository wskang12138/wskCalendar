import { DownloadParam, Net, UploadParam } from "./index";

const currentWindow = window.top as any

export class IosNet implements Net {
  private uploadTaskMap: Map<number, UploadParam>
  private downloadTaskMap: Map<number, DownloadParam>
  constructor() {
    const iosNet = currentWindow.webkit?.messageHandlers?.IosNet;
    if (!iosNet) {
      throw new Error("window中没有iosNet，无法创建IosNet")
    }

    this.uploadTaskMap = new Map<number, UploadParam>()

    currentWindow.onIosUploadSuccess = (taskId: number, response: string) => {
      if (this.uploadTaskMap.has(taskId)) {
        const success = this.uploadTaskMap.get(taskId)?.onSuccess
        this.uploadTaskMap.delete(taskId)
        success && success(response)
      }
    }

    currentWindow.onIosUploadError = (taskId: number, type: "network" | "noSelect" | "exceedLimit" | "extendNameError" | "exceedCount") => {
      if (this.uploadTaskMap.has(taskId)) {
        const onError = this.uploadTaskMap.get(taskId)?.onError
        this.uploadTaskMap.delete(taskId)
        onError && onError(type)
      }
    }

    currentWindow.onIosUploadProgress = (taskId: number, progress: number) => {
      if (this.uploadTaskMap.has(taskId)) {
        const onProgress = this.uploadTaskMap.get(taskId)?.onProgress
        onProgress && onProgress(progress)
      }
    }

    this.downloadTaskMap = new Map<number, DownloadParam>()
    currentWindow.onIosDownProgress = (taskId: number, progress: number) => {
      if (this.downloadTaskMap.has(taskId)) {
        const onProgress = this.downloadTaskMap.get(taskId)?.onProgress
        onProgress && onProgress(progress)
      }
    }

    currentWindow.onIosDownSuccess = (taskId: number, path: string) => {
      if (this.downloadTaskMap.has(taskId)) {
        const success = this.downloadTaskMap.get(taskId)?.onSuccess
        this.downloadTaskMap.delete(taskId)
        success && success(path)
      }
    }

    currentWindow.onIosDownError = (taskId: number, type: "network" | "noPermission") => {
      if (this.downloadTaskMap.has(taskId)) {
        const onError = this.downloadTaskMap.get(taskId)?.onError
        this.downloadTaskMap.delete(taskId)
        onError && onError(type)
      }
    }
  }

  downloadFile(param: DownloadParam): void {
    const id = new Date().getTime() % 2147483647
    this.downloadTaskMap.set(id, param)
    currentWindow.webkit.messageHandlers.IosNet.postMessage({ "method": "downloadFile", "taskId": id, "url": param.url, "fileName": param.fileName })
  }

  uploadFile(param: UploadParam): void {
    const id = new Date().getTime() % 2147483647
    this.uploadTaskMap.set(id, param)
    currentWindow.webkit.messageHandlers.IosNet.postMessage({
      "method": "uploadFile",
      "taskId": id,
      "url": param.url,
      "fileType": param.fileType,
      "limit": param.limit,
      "header": param.header ? JSON.stringify(param.header) : "",
      "count": param.count || 1
    })
  }

  shareFile(): void {
    throw new Error("请长按文件进行分享")
  }

}
