import Axios from 'axios'
import { Toast } from 'antd-mobile';
import {getToken} from './index'
const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 5000
}); 

axios.interceptors.request.use(function (config) {
    if(getToken()&&config.url!=='http://123.206.55.50:11000/upload'){
        config.headers['x-nideshop-token']=getToken()
    }
    return config
}, function (error) {
    Toast.info(error.toString())
    return Promise.resolve()  
})

axios.interceptors.response.use( function (response) {
    if(response.status !== 200||(response.data.errno&&response.data.errno !== 0)||(response.data.code&&response.data.code!==1)) {
        
        Toast.info(response.data.errmsg)
        return Promise.resolve()
    }else {
        if(response.data.data){
            return response.data.data
        }
        if(response.data){
            return response.data
        }

    }
    
}, function (error) {
    Toast.info(error.toString())
    return Promise.resolve()
});

export default axios