import React, { useEffect, useState } from 'react'
import styles from '../style/index.module.scss'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {mobileReg,passwordReg} from '../untils/regexp';
import {loginAction} from '../store/actions/login'
import { Toast } from 'antd-mobile';
interface StateType{
    isFlage:boolean
}
interface DispatchType{
    login:(mobile:string,password:string)=>void
}

let LoginPage: React.FC<RouteComponentProps&DispatchType&StateType> = props=>{
    let [mobile,setMobile]=useState<string>('15323807318')
    let [password,setPassword]=useState<string>('123456')
    if(props.isFlage){
        console.log('-----',props.location,decodeURIComponent)
        let redirect=props.location.search.slice(1).split('=')[1]
        props.history.replace(redirect?decodeURIComponent(redirect):'/')
        return null
    }
    let changeMobile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setMobile(e.target.value)
    }
    let changePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    let login=()=>{
        // console.log(mobileReg.test(mobile!),passwordReg.test(password!))
        if(!mobileReg.test(mobile!)){
            Toast.info('请输入正确的手机号')
            return
        }
        if(!passwordReg.test(password!)){
            Toast.info('请输入正确的密码号')
            return
        }
        props.login(mobile,password)
    }
    return <div className={styles.loginBox}>
        <div className={styles.login}>
            <img src="https://jasonandjay.com/easyMarket/static/media/logo.f51ce87b.jpg" alt=""/>
        </div>
        <div className={styles.loginMain}>
            <div className={styles.inputWrap}><input type="text" value={mobile} onChange={changeMobile} placeholder='请输入手机号'/></div>
            <div className={styles.inputWrap}><input type="possword" value={password} onChange={changePassword} placeholder='请输入密码'/></div>        
            <button className={styles.loginbtn} onClick={login} >登录</button>
        </div>
    </div>
}
const mapStateToProps = (state: any)=>{
    console.log('state.login...', state)
    return {
        isFlage:state.login.isFlage
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        login: (mobile:string,password:string)=>{
            dispatch(loginAction(mobile,password))
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(LoginPage);
