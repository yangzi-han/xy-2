import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8888',
    timeout: 5000,
    headers: {'X-Custom-Header':'foobar'}
});

axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use( function (response) {
    
    if(response.status !== 200||response.data.errno !== 0) {

    }else {
        return response.data.data
    }
}, function (error) {
    return Promise.reject(error)
});

export default axios