import Vue, { PluginObject } from "vue";
import axios, {AxiosPromise,AxiosInstance} from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || "",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

/* 请求拦截 */
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/* 响应拦截 */
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/* 挂载插件 */
const Plugin: PluginObject<AxiosInstance> = {
  install: (Vue: any) => {
    Vue.$axios = instance;
  }
};

Plugin.install = (Vue: any) => {
  Vue.$axios = instance;
  Vue.prototype.$axios = instance;
};

Vue.use(Plugin);

export default Plugin;
