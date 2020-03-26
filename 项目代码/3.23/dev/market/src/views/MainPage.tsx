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
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/index"><i className="iconfont icon-shouye"></i>首页</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/topic"><i className="iconfont icon-zhuantifuwu"></i>专题</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/type"><i className="iconfont icon-fenlei"></i>分类</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/cart"><i className="iconfont icon-gouwuche"></i>购物车</NavLink>
        <NavLink className={styles.nav} activeClassName={styles.active} to="/main/my"><i className="iconfont icon-ziyuan"></i>我的</NavLink>
    </footer>
    </>
}

export default MainPage;