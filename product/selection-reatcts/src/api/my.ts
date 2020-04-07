import axios from '../utils/request'

// userinfo接口
export let getUserinfo = () =>{
    return axios.post('/user/info')
}
// 上传头像
export let uploadAvatar = (form: FormData)=>{
    console.log(form)
    return axios.post('http://123.206.55.50:11000/upload', form)
}
// 更新头像
export let updateAvatar = (avatar:string)=>{
    return axios.post('/user/updateInfo', {avatar})
}