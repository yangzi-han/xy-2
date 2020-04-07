import Axios from 'axios';
import {Toast} from 'antd-mobile'
import { getToken } from './index';
const axios = Axios.create({//拦截器
    baseURL: 'http://127.0.0.1:8888',//配置baseURL
    timeout: 5000,//配置timeout
    // headers: {'X-Custom-Header': 'foobar'}//配置请求头登录态
});

///request是请求拦截
axios.interceptors.request.use(function (config) {
    // 在发出请求前做点什么
    if(getToken()&& config.url !== 'http://123.206.55.50:11000/upload'){
      config.headers['x-nideshop-token']=getToken()
    }
    return config;
  }, function (error) {
    // 处理请求错误
    Toast.info(error.toString())
    return Promise.resolve();
  });
 
// 添加响应拦截器response是响应式拦截
axios.interceptors.response.use(function (response) {
    // 2xx范围内的任何状态代码都会触发此函数
    //处理响应数据
    // console.log('response....',response.data)
    if (response.status != 200 || (response.data.errno && response.data.errno !== 0) || (response.data.code && response.data.code !== 1)){
      // 做个错误提示，抛出Promise.resolve
      Toast.info(response.data.errmsg)
      return Promise.resolve()
    }else if(response.data.data){
        return response.data.data;
    }
    else{
      return response.data
    }
  }, function (error) {
    // 任何超出2xx范围的状态代码都会触发此功能
    //处理响应错误
    // 做个错误提示，抛出Promise.resolve
    Toast.info(error.toString())
    return Promise.resolve()
  });

export default axios;