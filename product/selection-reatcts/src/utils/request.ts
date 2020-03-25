import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 5000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 处理请求错误
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // 位于2xx范围内的任何状态代码都会触发此函数
    // 对响应数据做些什么
    if (response.status != 200 || response.data.errno != 0){
        // 做个错误提示，抛出Promise.resolve
      }else{
        return response.data.data;
      }
}, function (error) {
    // 任何超出2xx范围的状态码都会触发此函数
    // 处理响应错误
    return Promise.reject(error);
});
export default axios