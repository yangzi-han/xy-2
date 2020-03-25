import Axios from 'axios';
import { Toast } from 'antd-mobile';

const axios = Axios.create({
    baseURL: ' http://127.0.0.1:8888',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
});

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
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
    if (response.status !== 200 || response.data.errno !== 0){
      // 做个错误提示，抛出Promise.resolve
      Toast.info(response.data.errmsg);
      return Promise.resolve();
    }else{
      return response.data.data;
    }
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Toast.info(error.toString());
    return Promise.resolve();
  });

export default axios;