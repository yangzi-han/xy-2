import axios from '../utils/request'

// 获取历史记录
export let login = () =>{
    return axios.post('/auth/loginByMobile')
}