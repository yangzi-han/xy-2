import Cookies from 'js-cookie'

const key='x-nideshop-token'
//设置token
export let setToken=(val:string)=>{
    Cookies.set(key,val)
}
//获取token
export let getToken=()=>{
    return Cookies.get(key)
}
//删除token
export let removeToken=()=>{
    Cookies.remove(key)
}