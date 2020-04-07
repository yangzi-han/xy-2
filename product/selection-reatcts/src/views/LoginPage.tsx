import React,{useState} from 'react'
import styles from '../style/index.module.scss'
import {mobileReg,passwordReg} from '../utils/regexp'
import { Toast } from 'antd-mobile';
import {connect} from 'react-redux'
import {loginAction} from '../store/actions/login'
import {RouteComponentProps} from 'react-router'

interface StateType{
    isLogin: boolean
}
interface DispatchType{
    login:(mobile: string, password: string) => void
}
let LoginPage: React.FC <StateType & DispatchType & RouteComponentProps> = props=>{
    if(props.isLogin){
        let redirect = props.location.search.slice(1).split('=')[1]
        props.history.replace(redirect?decodeURIComponent(redirect): '/')
    }
    let [mobile, setMobile] = useState<string>("15323807318")
    let [password, setPassword] = useState<string>("123456")
    let changeMobile = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMobile(e.target.value)
    }
    let changePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value)
    }
    let loginBtn = () =>{
        if(!mobileReg.test(mobile!)){
            Toast.info('请输入正确的手机号');
             return
        }
        if(!passwordReg.test(password!)){
            Toast.info('请输入正确密码');
            return
        }
        props.login(mobile, password)
    }
    return <>
        <div className={styles.logo}>
            <img src="http://img0.imgtn.bdimg.com/it/u=4244779027,267491187&fm=26&gp=0.jpg" alt=""/>
        </div>
        <div className={styles.from}>
            <dl className={styles.dl}>
                <dd>手机号：</dd>
                <dt><input type="text" value={mobile} placeholder="请输入手机号码" onChange={changeMobile}/></dt>
            </dl>
            <dl className={styles.dl}>
                <dd>密码：</dd>
                <dt><input type="password" value={password} placeholder="请输入登录密码" onChange={changePassword}/></dt>
            </dl>
            <div className={styles.loginBtn}>
                <button onClick={loginBtn}>登录</button>
            </div>
            
        </div>
    </>;
}
const mapStateToProps = (state: any)=>{
    console.log(state,'1111111111111111')    
    return{
        isLogin: state.login.isLogin
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        login:(mobile: string, password: string)=>{
            dispatch(loginAction(mobile, password))
        }
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(LoginPage);