import Cookie from 'js-cookie'

const key = 'token';
export let setToken = (val:string)=>{
    Cookie.set(key, val)
}

export let getToken = ()=>{
    return Cookie.get(key)
}

export let removeToken = ()=>{
    Cookie.remove(key);
}