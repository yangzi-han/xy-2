import React from 'react'
import RouterView from '../router/RouterView'
import {PropType,RouterItemType} from '../untils/interface'
import {NavLink} from 'react-router-dom'
import styles from './style/index.module.scss'
let MainPage: React.FC<PropType> = props=>{
    return <>
        <div className={styles.viewwrap}>
            <RouterView routes={props.routes}/>
        </div>
        <footer className={styles.footer}>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/index">首页</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/topic">专题</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/type">分类</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/cart">购物车</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/my">我的</NavLink>
        </footer>
    </>
}

export default MainPage;