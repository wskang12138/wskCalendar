import { DeviceController } from "../types";
interface Callback {
  resolve(string): void

  reject(): void
}

const currentWindow = window.top as any

export class IosDeviceController implements DeviceController {

  private taskQueue: Map<number, Callback>

  private getTaskId(): number {
    return new Date().getTime() % 2147483647
  }

  constructor() {
    const iosDevices = currentWindow.webkit?.messageHandlers?.IosDevices;
    if (!iosDevices) {
      throw new Error("window中没有iosDevices，无法创建IosDeviceController")
    }
    this.taskQueue = new Map<number, Callback>()

    currentWindow.onIosScanCodeSuccess = (taskId: number, code: string) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.resolve(code)
      }
    }

    currentWindow.onIosScanCodeError = (taskId: number) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.reject()
      }
    }

  }

  scanCode(): Promise<string> {

    if (!window.prompt("hasScanCode")) {
      alert("请更新app，体验扫码功能")
      return Promise.reject()
    }

    return new Promise<string>((resolve, reject) => {
      let taskId = this.getTaskId();
      this.taskQueue.set(taskId, {
        resolve,
        reject
      })
      currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "scanCode", "taskId": taskId });
    });
  }
}
