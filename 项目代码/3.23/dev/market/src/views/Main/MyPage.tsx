import React from 'react'
import { RouteComponentProps } from 'react-router'
import styles from "../../scss/my.module.scss"
import { removeToken } from '../../utils/index'
let MyPage: React.FC<RouteComponentProps> = props => {
    let out = () => {
        removeToken()
        props.history.go(0)
    }
    return <>
        <div className={styles.mytop}></div>
        <div className={styles.mycenter}>
            <div className={[`${styles.mycenteritem}`,`${styles.active}`].join(' ')}>
                <div className={styles.icon}>
                    <span className='iconfont icon-wodeshoucang_l'></span>
                </div>
                <p>我的收藏</p>
            </div>
            <div className={[`${styles.mycenteritem}`,`${styles.active}`].join(' ')}>
                <div className={styles.icon}>
                    <span className='iconfont icon-dizhiguanli'></span>
                </div>
                <p>地址管理</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-wodedingdan'></span>
                </div>
                <p>我的订单</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-calendar'></span>
                </div>
                <p>周末拼单</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-youhuiquan'></span>
                </div>
                <p>优惠券</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-youxuan'></span>
                </div>
                <p>优选购</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-wodehongbao'></span>
                </div>
                <p>我的红包</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-huiyuan'></span>
                </div>
                <p>会员plus</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-yaoqing'></span>
                </div>
                <p>邀请返利</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-yijianfankui'></span>
                </div>
                <p>意见反馈</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-kefu'></span>
                </div>
                <p>客服咨询</p>
            </div>
            <div className={styles.mycenteritem}>
                <div className={styles.icon}>
                    <span className='iconfont icon-shouye'></span>
                </div>
                <p>账户安全</p>
            </div>
        </div>
        <div className={styles.myfooter} onClick={out}>退出登录</div>
        <div className={styles.footer}></div>
    </>
}

export default MyPage;