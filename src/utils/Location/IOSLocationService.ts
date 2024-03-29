import { LocationService, LocationServiceResult } from "./index";

let currentWindow = window.top as any

interface Callback {
  resolve(string): void
  reject(err: Error): void
}

export class IOSLocationService implements LocationService {

  private taskQueue: Map<number, Callback>
  private taskId: number

  private getTaskId(): number {
    return this.taskId++
  }

  constructor() {
    const iosDevices = currentWindow.webkit?.messageHandlers?.IosDevices;
    if (!iosDevices) {
      throw new Error("window中没有iosDevices，无法创建IosDeviceController")
    }

    this.taskId = 0
    this.taskQueue = new Map<number, Callback>()

    currentWindow.onIosLocationSuccess = (taskId: number, result: string) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.resolve(JSON.parse(result))
      }
    }

    currentWindow.onIosLocationError = (taskId: number, err: string) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.reject(new Error(err))
      }
    }
  }

  getLocation(): Promise<LocationServiceResult> {
    return new Promise<LocationServiceResult>((resolve, reject) => {
      let taskId = this.getTaskId();
      this.taskQueue.set(taskId, {
        resolve,
        reject
      })
      currentWindow.webkit.messageHandlers.IosDevices.postMessage({ "method": "getLocation", "taskId": taskId });
    })
  }
}
