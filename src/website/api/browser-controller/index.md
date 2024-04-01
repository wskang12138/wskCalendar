# 浏览器信息与控制

## 使用指南

- **引入 BrowserController**

  ```javascript
  import { getBrowserController } from "../components/utils";
  
  const browserController = getBrowserController();
  ```

- **获取当前运行环境**

  ```javascript
  /* 返回 'ios','android','web'(浏览器) */
  let deviceType = browserController.deviceType();
  console.log(deviceType); // android
  ```

- **获取状态栏高度**

  ```javascript
  let height = browserController.getStatusBarHeight();
  console.log(height); // 24
  ```

- **获取底部高度**

  ```javascript
  /**
    由于全面屏的ios底部存在一条横线，如果在ios上统一处理将不好看，也不是所以系统和所以
    面都需要添加，
    因此提供该方法，如果页面上出现需要时可以通过此方法获取，需要注意的是返回的值单位是px，Android和PC端返回的是0，ios上返回值按机型不定
    */
  let footerHeight = browserController.getFooterHeight();
  console.log(footerHeight); // 10
  ```

- **返回上一页**

  ```javascript
  browserController.back();
  ```

- **获取设备唯一标识**

  ```javascript
  let deviceId = browserController.getDeviceId();
  console.log(deviceId); // AEY09813BDJDSUBCD
  ```

- **获取设备 ip 地址**

  ```javascript
  let deviceIp = browserController.getDeviceIp();
  console.log(deviceIp); // 192.168.8.100
  ```

- **返回主页，目前是个人中心**

  ```javascript
  browserController.goHome();
  ```

- **退出登录**

  ```javascript
  browserController.logout();
  ```

- **登录成功后调用**

  ```javascript
  /*登录成功后调用*/
  browserController.logSuccess();
  ```

- **本地文件预览**

  ```javascript
  /* 预览本地文件，目前仅支持doc、docx、ppt、pptx、xls、xlsx、pdf、txt、epub */
  /* localPath必须是本地文件，目前仅调用下载的api可以获得本地的文件路径 */
  browserController.openFileReader(localPath);
  ```

- **获取当前缓存大小**

  ```javascript
  /* 单位 k */
  browserController.cacheSize();
  ```

- **清除缓存**

  ```javascript
  browserController.clearCache();
  ```

- **当前 app 版本**

  ```javascript
  let version = browserController.appVersion();
  console.log(version); // 1.0.0
  ```

- **是否有新版本**

  ```javascript
  let hasNewVersion = browserController.hasNewVersion();
  console.log(hasNewVersion); // true
  ```

- **执行 app 更新**

  ```javascript
  browserController.gotoUpdate();
  ```

- **获取当前运行 app**

  ```javascript

  let appName = browserController.getAppName();
  console.log(appName); // wisecampus
  ```

- **获取环境变量**

  ```javascript
  /* 该函数目前没有任何功能，仅作预留使用，返回值只是空字符串 */
  let value = browserController.getEnvironmentVariable("key");
  console.log(value); // ''
  ```

## 应用场景

- 获取 APP 传递的数据。
- 调用 APP 的函数。
