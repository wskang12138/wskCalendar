import Taro from "@tarojs/taro";

const SUCCESS_CODE = 200;
const UNAUTHORIZATION_CODE = 401;

// let BASE_ENV = Taro.getStorageSync("SELECT_ENV_TEST_OR_UAT") || "";

export const BASE_URL = () =>
  process.env.NODE_ENV == "development"
    ? `http://test.snap-gateway.ruigushop.com`
    : process.env.NODE_ENV == "test"
    ? `http://test.snap-gateway.ruigushop.com`
    : "https://rbox.ruigushop.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMDA1MiwidXNlcl9uYW1lIjoi6JKL5aqb5aqbIiwic2NvcGUiOlsic2VydmVyIl0sIm5pY2tuYW1lIjoi6JKL5aqb5aqbIiwiZXhwIjoyMTMxODUyNjI2LCJqdGkiOiI1MGNkMDk3YS0yZjYyLTRiZWMtYTFkNi0xZjM2NmQxNzZmYWIiLCJjbGllbnRfaWQiOiJzZGJka2oxamIyYmhzIn0.JT_lEjIhjR9btyV2FbUJo0srnmhvVVGam5Y1-pfJoyY";
const interceptorInitRequest = (chain) => {
  // console.log("chain-----", chain);
  chain.requestParams.url = `${BASE_URL()}${chain.requestParams.url}`;
  if (chain.requestParams.header) {
    chain.requestParams.header.Authorization = token;
  } else {
    chain.requestParams.header = {
      Authorization: token,
    };
  }

  // 登录接口不传递 Authorization
  // if (chain.requestParams.url.includes("weChatWorkJsLogin")) {
  //   delete chain.requestParams.header.Authorization;
  // }

  chain.requestParams.header["Content-Type"] = "application/json;charset=UTF-8";

  chain.requestParams.header["x-channel"] = "wx-apptest";

  return chain.proceed(chain.requestParams);
};

Taro.addInterceptor(interceptorInitRequest);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

export async function get(url, params) {
  return new Promise(async (resolve, reject) => {
    Taro.request({
      method: "GET",
      url,
      data: params,
      success(res) {
        onSuccess(res, resolve, reject);
      },
      fail(res: any) {
        reject({
          message: res.message || "请求异常",
          serverCode: res.data.code,
        });
      },
    });
  });
}

export async function post(url, data) {
  return new Promise(async (resolve, reject) => {
    Taro.request({
      method: "POST",
      url,
      data,
      success(res) {
        onSuccess(res, resolve, reject);
      },
      fail(res: any) {
        reject({
          message: res.message || "请求异常",
          serverCode: res.statusCode,
        });
      },
    });
  });
}

export async function put(url, data) {
  return new Promise(async (resolve, reject) => {
    Taro.request({
      method: "PUT",
      url,
      data,
      success(res) {
        onSuccess(res, resolve, reject);
      },
      fail(res: any) {
        reject({
          message: res.message || "请求异常",
          serverCode: res.statusCode,
        });
      },
    });
  });
}

export async function deleteRequest(url, params) {
  return new Promise(async (resolve, reject) => {
    Taro.request({
      method: "DELETE",
      url,
      data: params,
      success(res) {
        onSuccess(res, resolve, reject);
      },
      fail(res: any) {
        reject({
          message: res.message || "请求异常",
          serverCode: res.statusCode,
        });
      },
    });
  });
}
const onSuccess = (res, resolve, reject) => {
  if (res.data.code === UNAUTHORIZATION_CODE) {
    if (Taro.getEnv() === "WEAPP") {
      // userLogin()
    } else {
      Taro.showToast({ title: "权限异常", icon: "none" });
    }
    return;
  }
  if (res.statusCode === SUCCESS_CODE && res.data.code === SUCCESS_CODE) {
    resolve((res.data || {}).data);
  } else {
    reject({ message: (res.data || {}).message || "服务异常" });
  }
};
