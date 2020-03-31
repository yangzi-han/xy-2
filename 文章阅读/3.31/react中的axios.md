# 地址
https://juejin.im/post/5e81fe1251882573b9170251

# 总结
创建axios
const instance = axios.create({
        baseURL: 'http://localhost:3000'
    });
axios的拦截器
import axios from 'axios';

export const baseUrl = 'http://localhost:3000';

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
);

export {
  axiosInstance
};
axios拦截后直接路由跳转
import Axios from 'axios'
import {HashRouter} from 'react-router-dom'

Axios.interceptors.request.use(function (config) {
  let token = window.localStorage.token;
  if (token) {
    config.headers.Authorization = `token ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  const router = new HashRouter()
  //路由跳转
  router.history.push('/')
  return Promise.reject(error);
});