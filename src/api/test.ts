import { get, post } from "@/utils/http";

const API = "/infinity-yggdrasil";

export const searchList = async (params) =>
  get("/after-sales-rp/picking/search-wave-picking-task", params);

// 提报列表;
export const reportList = (params = {}) => {
  return post(`${API}/merchant-report/h5-merchant-report-list`, params);
};

// 提交表单信息
export const submitForm = async (params) =>
  post("/after-sales-rp/picking/update-picking-task-info", params);
