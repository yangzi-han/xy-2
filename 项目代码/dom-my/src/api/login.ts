import axios from '../utils/request'
export let login = (mobile:string, password:string)=>{
    return axios.post('/auth/loginByMobile', {
        mobile,
        password
    })
}
// 获取用户信息
export let getUserInfo = ()=>{
    return axios.post('/user/info')
}

// 更新用户头像
export let updateAvatar = (avatar:string)=>{
    return axios.post('/user/updateInfo', {avatar})
}

// 上传用户头像
export let uploadAvatar = (form: FormData)=>{
    // return axios.post('http://123.206.55.50:11000/upload', form)
    return axios.post('//service.jasonandjay.com/upload', form)

}