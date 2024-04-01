# 快速上手

## 切换私服

```powershell
npm config set registry http://192.168.129.172:4873/
# or
yarn config set registry http://192.168.129.172:4873/
```

## 安装

```powershell
npm install lancoo-ui-mobile
# or
yarn add lancoo-ui-mobile
```

## 引入

> 直接引入组件即可，lancoo-ui-mobile 会自动为你加载 css 样式文件：

```javascript
import { LgButton } from "lancoo-ui-mobile";
```

## 兼容性

> lancoo-ui-mobile 兼容 H5 端与小程序端。为了正常显示组件样式，h5 环境需要在 Taro 脚手架的 config/index.js 中配置 postcss 编译组件库样式，具体配置如下（小程序端暂时不需要，即使不配置 mini.compile.include，小程序也会编译 node_modules 中引入的 css 样式，原因未明）。

```javascript
// 配置项
const config = {
  h5: {
    esnextModules: ["lancoo-ui-mobile"],
  },
};
```
