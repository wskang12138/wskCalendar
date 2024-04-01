# 硬件调用

## 使用指南

- **引入DeviceController**

  ```javascript
  import { getDeviceController } from '../components/utils';

  const deviceController = getDeviceController()
  ```

- **简介**

  > DeviceController 这个分类主要包含硬件相关调用以后新增功能都会放在这个地方，例如：人脸识别、拍照、拍视频、录音等功能。

- **调用扫码功能**

  ```javascript
  /* 该功能支持二维码和条形码 */
  deviceController.scanCode().then(code => { console.log(code) })
  ```
## 应用场景

- 小程序调用硬件相关功能。
- H5调用硬件相关功能。
