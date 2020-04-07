import axios from '../untils/request';
//登录
export let login=(mobile:string,password:string)=>{
    return axios.post('/auth/loginByMobile',{
        mobile,
        password
    })
}
//获取用户信息
export let getUserInfo = ()=>{
    return axios.get('/user/info')
}

// 更新用户头像
export let updateAvatar = (avatar:string)=>{
    console.log('updateAvatar..',avatar)
    return axios.post('/user/updateInfo', {avatar})
}

// 上传用户头像
export let uploadAvatar = (form: FormData)=>{
    console.log('uploadAvatar..',form)
    return axios.post('http://123.206.55.50:11000/upload', form)
}