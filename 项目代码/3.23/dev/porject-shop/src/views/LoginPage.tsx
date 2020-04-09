import React, { useState } from 'react'
import styles from './scss/login/login.module.scss'
import { Toast } from 'antd-mobile'
import { mobileReg, passwordReg } from '../utils/regexp'
import { connect } from 'react-redux'
import { loginAction } from '../store/actions/login'
import { RouteComponentProps } from 'react-router'
// import { getToken } from '../utils/index'

interface LoginStateType {
    isLogin: boolean
}

interface DispatchType {
    login: (mobile: string, password: string) => void
}

let LoginPage: React.FC<LoginStateType & DispatchType & RouteComponentProps> = props => {
    let [mobile, setMobile] = useState<string>('15323807318')
    let [password, setPassword] = useState<string>('123456')

    // 判断用户是否登陆，如果用户已登录，返回上一页面
    if (props.isLogin) {
        // if(getToken()){
        let redirect = props.location.search.slice(1).split('=')[1]
        props.history.replace(redirect ? decodeURIComponent(redirect) : '/')
        return null;
    }

    let changeMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(e.target.value)
    }
    let changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    let loginSumbit = () => {
        if (!mobileReg.test(mobile!)) {
            Toast.info('请输入正确的手机号');
            return
        }
        if (!passwordReg.test(password!)) {
            Toast.info('请输入正确的密码');
            return
        }
        props.login(mobile, password);
        // localStorage.setItem('nideShopUser', mobile);
    }

    return <div className={styles.loginBox}>
        <img src="https://jasonandjay.com/easyMarket/static/media/logo.f51ce87b.jpg" alt="" />
        <div className={styles.loginMain}>
            <input className={styles.inputWrap} type="text" placeholder='请输入你的账号' value={mobile} onChange={changeMobile} />
            <input className={styles.inputWrap} type="password" placeholder='请输入你的账号' value={password} onChange={changePassword} />
            
            <button className={styles.loginBtn} onClick={loginSumbit}>登录</button>
        </div>
    </div>;
}
const mapStateToProps = (state: any) => {
    console.log('数据登录', state.login.isLogin)
    return {
        isLogin: state.login.isLogin
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        login: (mobile: string, password: string) => {
            dispatch(loginAction(mobile, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);