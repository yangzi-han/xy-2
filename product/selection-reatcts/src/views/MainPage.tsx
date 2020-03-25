import React from 'react'
import RouterView from '../router/RouterView'
import { PropType, RouterItemType } from '../utils/interface'
import {NavLink} from 'react-router-dom'
import styles from '../style/index.module.scss'
let MainPage: React.FC<PropType> = props=>{
    return <>
        <div>
            <RouterView routes={props.routes}/>
        </div>
        <footer className={styles.footer}>
            <NavLink to="/main/index" className={styles.menulink} activeClassName={styles.active}>首页</NavLink>
            <NavLink to="/main/topic" className={styles.menulink} activeClassName={styles.active}>专题</NavLink>
            <NavLink to="/main/type" className={styles.menulink} activeClassName={styles.active}>分类</NavLink>
            <NavLink to="/main/cart" className={styles.menulink} activeClassName={styles.active}>购物车</NavLink>
            <NavLink to="/main/my" className={styles.menulink} activeClassName={styles.active}>我的</NavLink>
        </footer>
    </>
}

export default MainPage;