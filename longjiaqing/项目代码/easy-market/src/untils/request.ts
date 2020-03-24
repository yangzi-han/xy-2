import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

axios.interceptors.request.use(function (config) {
    // 在发出请求前做点什么
    return config;
  }, function (error) {
    // 处理请求错误
    return Promise.reject(error);
  });
 
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx范围内的任何状态代码都会触发此函数
    //处理响应数据
    if (response.status != 200 || response.data.errno != 0){
      // 做个错误提示，抛出Promise.resolve
    }else{
      return response.data.data;
    }
  }, function (error) {
    // 任何超出2xx范围的状态代码都会触发此功能
    //处理响应错误
    return Promise.reject(error);
  });

export default axios;