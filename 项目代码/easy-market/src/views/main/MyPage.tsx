import React, { useEffect } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {MYAction} from '../../store/actions/my'
import {connect} from 'react-redux'
import styles from '../../style/index.module.scss'
import { Toast } from 'antd-mobile'
interface StateTpes{
    myList:Array<{
        [name:string]:string|number
    }>
}
interface Dispatch{
    getMYAction:Function
}
let MyPage: React.FC<RouteComponentProps&Dispatch&StateTpes> = props=>{
    useEffect(()=>{
        props.getMYAction()
    },[])
    let current=(index:number,name:any)=>{
        // console.log(index)
        if(index===0){
            props.history.push('/collect')
        }else if(index===1){
            props.history.push('/address')
        }else{
            Toast.fail('您的'+name+'还未解锁', 1);
        }
    }
    return <div className={styles.minePage}>
        <div className={styles.userMsgWrap}>
            <div className={styles.userLogo}></div>
            <div className={styles.userMsgs}>
                <p>13333567991</p>
                <p>普通用户</p>
            </div>
        </div>
        <div className={styles.userPower}>
            {
                props.myList.map((item,index)=>{
                    return <div key={index} className={item.flage?styles.myactive:''}  onClick={()=>{
                        current(index,item.name)
                    }}>
                        <i className={`iconfont ${item.icon}`}></i>
                        <p>{item.name}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.loginOut}>退出登录</div>
    </div>
}

const mapStateToProps = (state: any)=>{
    console.log('state.my...',state.my)
    return {
        ...state.my
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getMYAction:()=>{
            dispatch(MYAction())
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(MyPage)