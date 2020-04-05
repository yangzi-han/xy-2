//登入页面
import React,{useState} from 'react'
import styles from  '../scss/login.module.scss'
import {Toast} from 'antd-mobile'
import {mobileReg,passwordReg}from '../utils/regexp'
import {loginAction} from '../store/actions/login'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
interface StateType{
    isLogin:boolean
}
interface DisPatchTypes{
    login:(mobile:string,password:string)=>void
}

let LoginPage: React.FC<DisPatchTypes & StateType & RouteComponentProps> = props=>{
    if(props.isLogin){
        //返回第一次或者上一次的页面
        let redirect=props.location.search.slice(1).split('=')[1]
        props.history.replace(redirect?decodeURIComponent(redirect):"/")
    }
    let [mobile,SetMobile]= useState<string>("15323807318")
    let [password,SetPassword]= useState<string>("123456")

    let ChangeMoblie=(e: React .ChangeEvent<HTMLInputElement>)=>{
        SetMobile(e.target.value);
    }
    let ChangePassword=(e: React.ChangeEvent<HTMLInputElement>)=>{
        SetPassword(e.target.value)
    }
    let login = ()=>{
        if(!mobileReg.test(mobile!)){
            Toast.info('请输入手机号');
            return
        }
        if(!passwordReg.test(password!)){
            Toast.info("请输入密码");
            return
        }
        props.login(mobile,password)
    }
    return <>
    <div className={styles.logintop}></div>
    <div className={styles.center}>

        <input type="text" placeholder="请输入手机号" value={mobile} onChange={ChangeMoblie} /><br/>
        <input type="password" placeholder="请输入密码" value={password} onChange={ChangePassword} /><br/>
        <div className={styles.buttons} onClick={login}><button>登入</button></div>
    </div>
    </>;
}
const mapStateToProps=(state:any)=>{
    return {
        isLogin:state.login.isLogin
    }
}
const mapDispatchToProps = (dispatch:Function)=>{
    return {
        login(mobile:string,password:string) {
            dispatch(loginAction(mobile,password))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);