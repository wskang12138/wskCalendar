# 微信小程序登陆

## 说明

- **说明一：何时需要引入微信小程序登陆？**

  > 当使用 taro 开发需要考虑除了 h5 外的跨端（微信小程序 weapp）编译发布时。

- **说明二：为什么需要引入微信小程序登陆？**

  > 未来发布出去的小程序是一个独立的个体，不可能一个学校对应发布一个小程序。所以此时你可能需要一个通用版的登陆，能给你的系统带来每个学校对应子系统的信息。

## 使用指南

- **步骤一、在 app.ts 文件内 WeapApp 类中 loginParams 内参数更改为自己系统的相关信息。以下拿校园通的信息举个例子：**

  ```javascript
  loginParams = {
    systemID: "E43",
    systemName: "校园通",
    appID: "wx9e4895714e80e3f1",
    systemIconUrl: "./images/login-logo.png",
    isAfterUserLogout: false,
    loginSucUrl: "../G001/index",
  };
  ```

- **步骤二、在 app.config.ts 配置文件内引入 wxLogin 页面（code 代码内自带，无需额外创建）**

  ```javascript
  pages: ["pages/wxLogin/login"];
  ```

- **步骤三：关于系统内的接口调用（代理转发），请移步[请求/代理](/api/request-proxy)。**

## 应用场景

- 使用 taro 开发，需要考虑除了 h5 外的跨端（微信小程序 weapp）编译发布时。
