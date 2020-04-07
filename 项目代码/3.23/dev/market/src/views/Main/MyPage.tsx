import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import styles from "../../scss/my.module.scss"
import { removeToken } from '../../utils/index'
import { GetuserinfoAction } from '../../store/actions/getuserinfo'
import { connect } from 'react-redux'
import {ChangeimgAction} from '../../store/actions/changeimg'
import { UpdataAction } from "../../store/actions/updata";
interface DispatchType {
    Getuserinfo: Function
    changimg:(form:FormData)=>void
    updatas:Function
}
interface ActionType {
    userinfo: {
        name: string,
        avatar: string,
        mobile: string
    },
    updata:{
        data:data[]
    }
}
interface data{
    path:string
}
let MyPage: React.FC<RouteComponentProps & DispatchType & ActionType> = props => {
    let [flag,Setflag]=useState(false)
    useEffect(() => {
        props.Getuserinfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let out = () => {
        removeToken()
        props.history.go(0)
    }
    let collect = () => {
        props.history.push("/collect")
    }
    let address = () => {
        props.history.push("/address")
    }
    let change=(event: React.ChangeEvent<HTMLInputElement>) =>{
        let file=event.target.files?event.target.files[0]:null
       
        if(file){
            
            let form=new FormData();
            console.log(form.append)
            form.append(file.name,file);
            console.log(form)
            props.changimg(form)
        }
    }
    let mask=()=>{
        Setflag(flag=true)
    }
    let mask2=(img:string)=>{
        Setflag(flag=false)
        props.updatas(img)
    }
    return <>

        <div className={styles.mytop}>
            <div className={styles.topimg}>
                <img src={props.updata.data?props.updata.data[0].path:props.userinfo.avatar} alt="" onClick={mask} />
                <div className={flag?styles.actives:styles.actives2}>
                <input type="file" onChange={change}/>
                <div onClick={()=>mask2(props.updata.data[0].path)}>确定</div>
                </div>
               
            </div>
            <div className={styles.mytext}>
                <p>{props.userinfo.mobile}</p>
            </div>
        </div>
        <div className={styles.mycenter}>
            <div className={[`${styles.mycenteritem}`, `${styles.active}`].join(' ')} onClick={() => collect()}>
                <div className={styles.icon}>
                    <span className='iconfont icon-wodeshoucang_l'></span>
                </div>
                <p>我的收藏</p>
            </div>
            <div className={[`${styles.mycenteritem}`, `${styles.active}`].join(' ')} onClick={() => address()}>
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

let mapStateToProps = (state: any) => {
    return {
        userinfo: state.getuseinfo,
        updata:state.updata
    }

}
let mapDispatch = (dispatch: Function) => {
    return {
        Getuserinfo: () => {
            dispatch(GetuserinfoAction())
        },
        changimg:(img:FormData)=>{
            dispatch(ChangeimgAction(img))
        },
        updatas:(img:string)=>{
            dispatch(UpdataAction(img))
        }
    }
}
export default connect(mapStateToProps, mapDispatch)(MyPage);