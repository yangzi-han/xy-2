import Axios from 'axios'
import { Toast } from 'antd-mobile';
import {getToken} from './index'
const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 5000,
    headers: {'X-Custom-Header':getToken()}
}); 

axios.interceptors.request.use(function (config) {
    if(getToken()){
        config.headers['x-nideshop-token']=getToken()
    }
    return config
}, function (error) {
    Toast.info(error.toString())
    return Promise.resolve()
})

axios.interceptors.response.use( function (response) {
    
    if(response.status !== 200||response.data.errno !== 0) {
        Toast.info(response.data.errmsg)
        return Promise.resolve()
    }else {
        return response.data.data
    }
}, function (error) {
    Toast.info(error.toString())
    return Promise.resolve()
});

export default axios