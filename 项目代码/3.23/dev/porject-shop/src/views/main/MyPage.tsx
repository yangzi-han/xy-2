import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from '../scss/my/my.module.scss'
import { uploadAvatarAction, updateAvatarAction, logoutAction } from '../../store/actions/login'
import { NavLink } from 'react-router-dom'
import { Toast } from 'antd-mobile'

interface StateType {
    info: {
        avatar: string,
        username: string
    },
    uploadAvatar: string
}

interface DispatchType {
    changeAvatar: (form: FormData) => void,
    updateAvatar: (avatar: string) => void,
    logout: () => void
}

let MyPage: React.FC<StateType & DispatchType & RouteComponentProps> = props => {
    let [isShow,setisShow] = useState(false)

    let fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files ? e.target.files[0] : null;
        if (file) {
            let form = new FormData();
            form.append(file.name, file);
            props.changeAvatar(form);
        }
    }

    let updateAvatar = () => {
        if (props.uploadAvatar) {
            props.updateAvatar(props.uploadAvatar)
            window.history.go(0)
        } else {
            Toast.info('请先上传你的头像');
        }
    }

    let logout = () => {
        props.logout();
        props.history.replace(`/login?redirect=${encodeURIComponent('/main/my')}`);
    }

    return <div className={styles.myPage}>
        <div className={styles.userMsgWrap}>
            <div className={styles.userLogo}>
                <img src={props.uploadAvatar ? props.uploadAvatar : props.info.avatar} alt="" />
            </div>
            <div className={styles.userMsgs}>
                <div className={styles.userName}>{props.info.username}</div>
                <div>普通用户</div>
            </div>
        </div>

        <div className={styles.MyImg}>
            <input type="file" onChange={fileChange} />
            <button onClick={updateAvatar}>确定</button>
        </div>




        <div className={styles.userPower}>
            <div className={styles.poewrItem}>
                <NavLink to='/favor'>
                    <i className='iconfont icon-wodeshoucang_l'></i>
                    <div>我的收藏</div>
                </NavLink>
            </div>
            <div className={styles.poewrItem} >
                <NavLink to='/address'>
                    <i className='iconfont icon-dizhiguanli'></i>
                    <div>地址管理</div>
                </NavLink>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-wodedingdan'></i>
                <div>我的订单</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-calendar'></i>
                <div>周末拼单</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-youhuiquan'></i>
                <div>优惠券</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-youxuan'></i>
                <div>优选购</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-wodehongbao'></i>
                <div>我的红包</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-huiyuan'></i>
                <div>会员plus</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-yaoqing'></i>
                <div>邀请返利</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-yijianfankui'></i>
                <div>意见反馈</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-kefu'></i>
                <div>客服咨询</div>
            </div>
            <div className={styles.poewrItem}>
                <i className='iconfont icon-anquan'></i>
                <div>账户安全</div>
            </div>
        </div>

        <div className={styles.loginOut} onClick={logout}>退出登录</div>
    </div>
}

const mapStateToProps = (state: any) => {
    console.log('我的', state.login)
    return state.login
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        logout: () => {
            dispatch(logoutAction())
        },
        updateAvatar: (avatar: string) => {
            dispatch(updateAvatarAction(avatar))
        },
        changeAvatar: (form: FormData) => {
            dispatch(uploadAvatarAction(form))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);