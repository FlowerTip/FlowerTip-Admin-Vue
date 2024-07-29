import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/userStore";

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msgText = "";
    let statusCode = error.response.status;

    switch (statusCode) {
      case 401:
        msgText = "token过期";
        break;
      case 403:
        msgText = "无权访问";
        break;
      case 404:
        msgText = "请求地址错误";
        break;
      case 500:
        msgText = "服务器出现问题";
        break;
      default:
        msgText = "无网络";
    }

    ElMessage({
      type: "error",
      message: msgText,
    });

    return Promise.reject(error);
  }
);

export default instance;
