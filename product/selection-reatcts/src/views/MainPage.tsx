import React from 'react'
import RouterView from '../router/RouterView'
import { PropType } from '../utils/interface'
import {NavLink} from 'react-router-dom'
import styles from '../style/index.module.scss'
import '../static/font_y0v5zzz4arj/iconfont.css'
let MainPage: React.FC<PropType> = props=>{
    return <>
        <div>
            <RouterView routes={props.routes}/>
        </div>
        <footer className={styles.footer}>
            <NavLink to="/main/index" className={styles.menulink} activeClassName={styles.active}>
                <p className="iconfont icon-shouye"></p>
                <p>首页</p>
            </NavLink>
            <NavLink to="/main/topic" className={styles.menulink} activeClassName={styles.active}>
                <p className="iconfont icon-zhuantifuwu"></p>
                <p>专题</p>
                </NavLink>
            <NavLink to="/main/type" className={styles.menulink} activeClassName={styles.active}>
                <p className="iconfont icon-fenlei"></p>
                <p>分类</p>
                </NavLink>
            <NavLink to="/main/cart" className={styles.menulink} activeClassName={styles.active}>
                <p className="iconfont icon-gouwuche"></p>
                <p>购物车</p>
                </NavLink>
            <NavLink to="/main/my" className={styles.menulink} activeClassName={styles.active}>
                <p className="iconfont icon-ziyuan"></p>
                <p>我的</p>
                </NavLink>
        </footer>
    </>
}

export default MainPage;