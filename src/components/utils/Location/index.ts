import { AndroidLocationService } from "./AndroidLocationService";
import { IOSLocationService } from "./IOSLocationService";
import { WeappLocationService } from "./WeappLocationService";

export interface LocationServiceResult {
  longitude: string
  latitude: string
  province?: string
  city?: string
}

export interface LocationService {
  getLocation(): Promise<LocationServiceResult>
}

let locationService: LocationService | null = null

export function getLocationService(): LocationService {
  if (!locationService) {
    locationService = createLocationService()
  }
  return locationService
}

export function createLocationService(): LocationService {
  if (process.env.TARO_ENV === "h5") {
    try {
      return new AndroidLocationService()
    } catch {
    }
    try {
      return new IOSLocationService()
    } catch {
    }
  }

  if (process.env.TARO_ENV === "weapp") {
    return new WeappLocationService()
  }

  return new EmptyLocationService()
}

class EmptyLocationService implements LocationService {
  getLocation(): Promise<LocationServiceResult> {
    return Promise.reject(new Error("当前环境无法使用"));
  }

}
