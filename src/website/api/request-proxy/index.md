# 请求/代理

## 说明

- **说明一：在做 taro 移动端开发时是否都能沿用这套请求？**

  > 能。请求做了拦截以及请求方式封装，当然也选择可以不用。

- **说明二：为何要使用接口代理（转发）？**

  > 小程序的使用有合法域名的校验，域名资源有限。

## 使用封装的请求

- **步骤一、`src>>network>>baseUrl.js`下，根据实际情况配置你对接后台的地址。**

  ```javascript
  export const getBaseUrl = () => {
    let BASE_URL = "";

    if (process.env.NODE_ENV === "development") {
      //开发环境 - 根据请求不同返回不同的BASE_URL
      BASE_URL = "开发环境的URL";
    } else {
      // 生产环境
      BASE_URL = "生产环境的URL";
    }
    return BASE_URL;
  };
  ```

- **步骤二、`src>>network>>servers.js`下，把要对接的接口全写在这里来统一管理**

  ```javascript
  // get请求方法
  export const get = (url, data?, header?, loading?) =>
    HTTPREQUEST.get(getBaseUrl() + url, data, header, loading);

  //获取学生当前课程
  export const getOnlineCourse = (urlParams: RequestType.IGetOnlineCourse) =>
    responseHandler(get("api/v5.2.2/mediateach/onlinecourse", urlParams));
  ```

- **步骤三：具体页面里，引用上方`servers`里你写好的接口。**

  ```javascript
  // 请求
  getOnlineCourse({
    strClassID: "",
    strClassName: "",
    strClassType: 1,
    strTimeFlag: 3,
  }).then(data => {
    // 成功处理程序
  }).catch(error => {
    // 失败处理程序
  });
  ```

## 使用代理

- **步骤一、页面里先引入`Proxy`模块。**

  ```javascript
  import Proxy from '../../network/proxy';
  ```

- **步骤二、做请求前做一个替换处理。**

  ```javascript
  import Proxy from '../../network/proxy'

  let url = Proxy.transmitUrlToVisit(url)
  Taro.request({ url })
  ```
  > 由于src>network>http.js中已经将代理封装好，使用时只需要使用`transmit`开头的请求方法发即可，如下所示

  ```javascript
  // 代理的get请求
  export const get = (url, data?, header?, loading?) =>
    HTTPREQUEST.transmitGet(getBaseUrl() + url, data, header, loading)
  ```


## 应用场景

- H5向后台发起请求。
- 小程序向后台发起请求。
