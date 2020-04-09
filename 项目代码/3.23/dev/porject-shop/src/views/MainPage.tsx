import React from 'react'
import RouterView from '../router/RouterView'
import { PropType } from '../utils/interface'
import { NavLink } from 'react-router-dom'
import styles from './scss/main/main.module.scss'

let MainPage: React.FC<PropType> = props => {
    return <div className={styles.App}>
        <div className={styles.Main}>
            <RouterView routes={props.routes} />
        </div>
        <footer className={styles.MainFooter}>
            <NavLink className={styles.fotBtn} activeClassName={styles.active} to="/main/index">
                <div className={styles.icon}>
                    <i className="iconfont icon-shouye" />
                </div>
                <div>首页</div>
            </NavLink>
            <NavLink className={styles.fotBtn} activeClassName={styles.active} to="/main/topic">
                <div className={styles.icon}>
                    <i className="iconfont icon-zhuantifuwu" />
                </div>
                <div>专题</div>
            </NavLink>
            <NavLink className={styles.fotBtn} activeClassName={styles.active} to="/main/type">
                <div className={styles.icon}>
                    <i className="iconfont icon-fenlei" />
                </div>
                <div>分类</div>
            </NavLink>
            <NavLink className={styles.fotBtn} activeClassName={styles.active} to="/main/cart">
                <div className={styles.icon}>
                    <i className="iconfont icon-gouwuche" />
                </div>
                <div>购物车</div>
            </NavLink>
            <NavLink className={styles.fotBtn} activeClassName={styles.active} to="/main/my">
                <div className={styles.icon}>
                    <i className="iconfont icon-ziyuan" />
                </div>
                <div>我的</div>
            </NavLink>
        </footer>
    </div>
}

export default MainPage;