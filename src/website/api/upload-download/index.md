# 上传下载

## 使用指南

- **引入 Net**

  ```javascript
  import { getNet } from "../components/utils";
  const net = getNet();
  ```

- **上传**

  ```javascript
  /*
    注意:count 如果大于1，那么后端需要使用List接收。如果不填或者等于1，那么后端就不要用List接收
    上传文件的key, 现在相当于FormData的append('file', value)，因此后端必须固定写file
    */
  net.uploadFile({
    url: "", // 上传的地址，必填
    fileType: ["png", "jpg", "txt", "doc", "xls", "apk"], // 后缀过滤,必填
    limit: 20, // 文件大小显示，单位M，必填
    header: { token: "123123" }, // 设置请求头，可选
    count: 1, // 可上传的最大文件数量，可选，默认是1
    onProgress: (progress) => {
      /* 上传进度，可选 */
      console.log(progress); /* 10 */
    },
    /**
      错误回调，可选，type的值：'network'(网络错误),  'noSelect'(没有选文件),'exceedLimit'(超出限制), 
      'extendNameError'(扩展名不正确),  'exceedCount'(超出了可上传的最大文件数量)
      */
    onError: (type) => {
      console.log(type); /* noSelect */
    },
    /* 成功回调，可选， response返回的数据，response是字符串类型，如需对象请自行转换*/
    onSuccess: (response) => {
      console.log(response);
    },
  });
  ```

- **下载**

  ```javascript
  net.downloadFile({
    url: "", // 下载路径，必填
    fileName: "1.jpg", // 本地保存的文件名，必填
    /* 下载进度，可选 */
    onProgress: (progress) => {
      console.log(progress); // 10
    },
    /* 下载失败时回调，'network'(网络错误), 'noPermission'(没有文件读取权限)，可选 */
    onError: (type) => {
      console.log(type);
    },
    /* 下载成功回调，path是本地文件路径，可选 */
    onSuccess: (path) => {
      console.log("下载成功，文件路径：" + path);
    },
  });
  ```

- **文件上传后端接口的写法**

  ```java
  @ApiOperation("上传一个文件")
  @PostMapping(value = "/api/upload/test", headers = "content-type=multipart/form-data")
  public ApiFinalResult uploadTest(@RequestParam(value = "file") MultipartFile file) {
    return ApiFinalResult.show("test/", + file.getOriginalFilename());
  }

  @ApiOperation("上传多个文件")
  @PostMapping(value = "/api/upload/multi/test", headers = "content-type=multipart/form-data")
  Public ApiFinalResult uploadMultiTest(@RequestParam(value = "file") List<MultipartFile> files) {
    return ApiFinalResult.show("test/", + file.get(0).getOriginalFilename());
  }
  ```

## 应用场景

- H5 通过 APP 壳子上传或下载文件。
