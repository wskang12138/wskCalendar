import { LocationService, LocationServiceResult } from "./index";

let currentWindow = window.top as any

interface Callback {
  resolve(string): void
  reject(err: Error): void
}

export class AndroidLocationService implements LocationService {

  private taskQueue: Map<number, Callback>
  private taskId: number

  private getTaskId(): number {
    return this.taskId++
  }

  constructor() {
    if (!currentWindow.AndroidDevice) {
      throw new Error("window中没有AndroidDevice，无法创建AndroidDeviceController")
    }
    this.taskId = 0
    this.taskQueue = new Map<number, Callback>()

    currentWindow.onAndroidLocationSuccess = (taskId: number, result: string) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.resolve(JSON.parse(result))
      }
    }

    currentWindow.onAndroidLocationError = (taskId: number, err: string) => {
      if (this.taskQueue.has(taskId)) {
        let callback = this.taskQueue.get(taskId);
        this.taskQueue.delete(taskId)
        callback?.reject(new Error(err))
      }
    }

  }


  getLocation(): Promise<LocationServiceResult> {

    if (!currentWindow.AndroidDevice.getLocation) {
      return Promise.reject(new Error("该版本校园通无法获取定位信息"))
    }

    return new Promise<LocationServiceResult>((resolve, reject) => {
      let taskId = this.getTaskId();
      this.taskQueue.set(taskId, {
        resolve,
        reject
      })
      currentWindow.AndroidDevice.getLocation(taskId)
    })
  }
}
