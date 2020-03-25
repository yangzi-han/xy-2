//首页面
import React from 'react'
import RouterView from '../router/RouterView'
import {PropType} from '../utils/interface'
import {NavLink} from 'react-router-dom'
import styles from '../scss/main.module.scss'

let MainPage: React.FC<PropType> = props=>{
    return <>
    <div className={styles.maintop}>
        <RouterView routes={props.routes}></RouterView>
    </div>
    <footer className={styles.mainfooter}>
        <NavLink className={styles.nav} to="/main/index"><i></i>首页</NavLink>
        <NavLink className={styles.nav} to="/main/topic"><i></i>专题</NavLink>
        <NavLink className={styles.nav} to="/main/type"><i></i>分类</NavLink>
        <NavLink className={styles.nav} to="/main/cart"><i></i>购物车</NavLink>
        <NavLink className={styles.nav} to="/main/my"><i></i>我的</NavLink>
    </footer>
    </>
}

export default MainPage;