//首页面
import React from 'react'
import RouterView from '../router/RouterView'
import {PropType} from '../utils/interface'
import {NavLink} from 'react-router-dom'
import styles from '../scss/main.module.scss'

let MainPage: React.FC<PropType> = props=>{
    let scroll=()=>{
        window.scrollTo(0,0)
    }
    return <>
    <div className={styles.maintop}>
        <RouterView routes={props.routes}></RouterView>
    </div>
    <footer className={styles.mainfooter}>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/index"><i className="iconfont icon-shouye" onClick={()=>scroll()} ></i>首页</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/topic"><i className="iconfont icon-zhuantifuwu" onClick={()=>scroll()}></i>专题</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/type"><i className="iconfont icon-fenlei" onClick={()=>scroll()}></i>分类</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/cart"><i className="iconfont icon-gouwuche" onClick={()=>scroll()}></i>购物车</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/my"><i className="iconfont icon-ziyuan" onClick={()=>scroll()}></i>我的</NavLink>
    </footer>
    </>
}

export default MainPage;