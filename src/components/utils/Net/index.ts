import Taro from "@tarojs/taro";
import { AndroidNetController } from "./AndroidNetController";
import { IosNet } from "./IosNet";
import { WebNet } from "./WebNet";
import { WeappNetController } from "./WeappNetController";
let ENV_TYPE = Taro.ENV_TYPE;
export interface Net {
  uploadFile: (param: UploadParam) => void
  downloadFile: (param: DownloadParam) => void
  shareFile: (param: ShareParam) => void
}

export interface UploadParam {
  url: string
  fileType: string[] //文件后缀，如果是空数组则是全部
  limit: number //单位 M
  header?: any  //请求头
  count?: number // 允许选择的文件数量
  fileKey?: string //file对应的key
  onProgress?: (progress: number) => void
  onSuccess?: (response: string) => void
  onError?: (type: "network" | "noSelect" | "exceedLimit" | "extendNameError" | "exceedCount") => void
}

export interface DownloadParam {
  url: string
  fileName: string
  onProgress?: (progress: number) => void
  onSuccess?: (path: string) => void
  onError?: (type: "network" | "noPermission") => void
}

export interface ShareParam {
  type: 'text' | 'image' | 'file'
  value: string
}

let net: Net | null = null

export function getNet(): Net {
  if (!net) {
    net = newNet()
  }
  return net
}

function newNet(): Net {
  if (Taro.getEnv() === ENV_TYPE.WEB) {
    try {
      return new AndroidNetController()
    } catch {
    }

    try {
      return new IosNet()
    } catch {
    }
  }

  if (Taro.getEnv() === ENV_TYPE.WEAPP) {
    return new WeappNetController()
  }

  return new WebNet()
}
