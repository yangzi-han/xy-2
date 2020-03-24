import Cookies from 'js-cookie'

const key=''
//设置token
export let setToken=(val:string)=>{
    Cookies.set(key,val)
}
//获取token
export let getToken=()=>{
    Cookies.get(key)
}
//删除token
export let removeToken=()=>{
    Cookies.remove(key)
}