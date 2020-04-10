import React,{useState}from 'react'
import styles from '../static/home.module.scss'
import Img from '../static/login1.png'
import {Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {loginAction} from '../store/actions/login'
import { RouteComponentProps } from 'react-router';
interface LoginType{
  isLogin:boolean
}
interface LoginDispatchType{
   login:(mobile:string,password:string)=>void
}
let Login : React.FC<LoginType&LoginDispatchType&RouteComponentProps>=props=>{
   let [mobile,setMobile]=useState<string>('15323807318')
   let [password,setPassword]=useState<string>('123456')
   if (props.isLogin){
    let redirect = props.location.search.slice(1).split('=')[1]
    props.history.replace(redirect?decodeURIComponent(redirect): '/')
    return null;
   }
   let getMobile=(e:React.ChangeEvent<HTMLInputElement>)=>{
     setMobile(e.target.value)
   
   }
   let getPassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
     setPassword(e.target.value)
     
   }
   let btnLogin=()=>{
    if(!(/^1[3456789]\d{9}$/.test(mobile!))){ 
      Toast.info("手机号码有误，请重填");  
      return; 
    }
    if(!(/^\d{6}$/.test(password!))){ 
      Toast.info("密码有误，请重填");  
      return; 
    }
    props.login(mobile, password);
   }
     return <>
        <div className={styles.login}>
          <img src={Img} alt="这是一张背景图"/>
          <div className={styles.ipt}>
            <p>
             <input type="text" placeholder="请输入账号" onChange={getMobile}/>
            </p>
            <p>
             <input type="password" placeholder="请输入密码" onChange={getPassword}/>
            </p>
            <p>
             <button onClick={btnLogin}>登录</button>
            </p>
          </div>
        </div>
     </>
}
const mapStateToProps = (state: any)=>{
  
  return {
      isLogin: state.login.isLogin
  }
}

const mapDispatchToProps = (dispatch:Function)=>{
  return {
      login: (mobile:string, password:string)=>{
          dispatch(loginAction(mobile, password))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);