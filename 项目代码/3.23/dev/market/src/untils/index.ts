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
//事件优化，防抖
export let debounce=(fun:Function,delay=700)=>{
    let timer:number=0;
    return (...args:any[])=>{
        clearTimeout(timer)
        timer=setTimeout(()=>{
            fun(...args)
        },delay)as unknown as number
    }
}
//节流
export let throttle=(fun:Function,delay=700)=>{
    let timer:number=+new Date()
    return (...args:any[])=>{
        let now:number=+new Date()
        if(now-timer>delay){
            fun(...args)
            timer=now
        }
    }
}