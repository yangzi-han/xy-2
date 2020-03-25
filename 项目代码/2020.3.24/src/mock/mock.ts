import data from './data.json'
import LoginData from './login.json'
let mock = {
    '/data/json':function(){
        return data
    },
    // 登录
    '/login/json'(obj: { username: string; password: string }){
        console.log(obj)
        let isLog = LoginData.some(item=>item.username===obj.username&&item.password===obj.password)
        console.log(isLog)
        if(isLog) return '登录成功'

        return '没有注册此账号'
    },
    // 注册
    '/regLog/json'(obj: { username: any; password?: string }){
        console.log(obj)
        let isReg = LoginData.some(item=>item.username===obj.username)
        console.log(isReg)
        if(isReg) return '您的账号已被注册'
        //@ts-ignore
        LoginData.push(obj)
        return '注册成功'
        
    }
}
export default mock