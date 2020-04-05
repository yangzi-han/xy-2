import React from 'react'
import RouterView from '../router/RouterView'
import {PropType,RouterItemType} from '../untils/interface'
import {NavLink} from 'react-router-dom'
import styles from '../style/index.module.scss'
let MainPage: React.FC<PropType> = props=>{
    return <>
        <div className={styles.viewwrap}>
            <RouterView routes={props.routes}/>
        </div>
        <footer className={styles.footer}>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/index"><i className="iconfont icon-shouye"></i>首页</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/topic"><i className="iconfont icon-zhuantifuwu"></i>专题</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/type"><i className="iconfont icon-fenlei"></i>分类</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/cart"><i className="iconfont icon-gouwuche"></i>购物车</NavLink>
            <NavLink className={styles.menulink} activeClassName={styles.active} to="/main/my"><i className="iconfont icon-wode"></i>我的</NavLink>
        </footer>
    </>
}

export default MainPage;