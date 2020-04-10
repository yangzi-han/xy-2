import Axios from 'axios';
import { Toast } from 'antd-mobile';
import {getToken} from './index'

const axios = Axios.create({
    // baseURL: /jasonandjay\.com/.test(window.location.host)?'//easymarket.jasonandjay.com/':'127.0.0.1:8888',
    // baseURL: /jasonandjay\.com/.test(window.location.host)?'//easymarket.jasonandjay.com/':'127.0.0.1:8888'
    // baseURL: 'http://127.0.0.1:8888',
    baseURL:process.env.NODE_ENV === 'production'?'//easymarket.jasonandjay.com/':'127.0.0.1:8888',
    timeout: 5000
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // if (getToken() && config.url !== 'http://123.206.55.50:11000/upload'){
    //   config.headers['x-nideshop-token'] = getToken();
    // }
    if (getToken() && config.url !== '//service.jasonandjay.com/upload'){
      config.headers['x-nideshop-token'] = getToken();
    }
    return config;
  }, function (error) {
    // Do something with request error
    Toast.info(error.toString());
    return Promise.resolve();
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status !== 200 || (response.data.errno && response.data.errno !== 0) || (response.data.code && response.data.code !== 1)){
      // 做个错误提示，抛出Promise.resolve
      Toast.info(response.data.errmsg);
      return Promise.resolve();
    }else if(response.data.data){
      return response.data.data;
    }else{
      return response.data;

    }
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Toast.info(error.toString());
    return Promise.resolve();
  });

export default axios;