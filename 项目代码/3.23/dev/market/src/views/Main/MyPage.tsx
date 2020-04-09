import React, { useEffect, useState } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {MYAction} from '../../store/actions/my'
import {connect} from 'react-redux'
import styles from '../../style/index.module.scss'
import { Toast } from 'antd-mobile'
import {uploadAvatarAction, updateAvatarAction,logoutAction} from '../../store/actions/login'
interface StateTpes{
    myList:Array<{
        [name:string]:string|number
    }>,
    info:{
        mobile:string,
        avatar: string,
        username: string
    },
    uploadAvatar:string
}
interface Dispatch{
    changeAvatar: (form: FormData)=>void,
    updateAvatar: (avatar: string)=>void,
    logout: ()=>void
    getMYAction:Function
}
let MyPage: React.FC<RouteComponentProps&Dispatch&StateTpes> = props=>{
    let [isShow,setisShow]=useState(false)
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
    let showFile=()=>{
        setisShow(isShow=!isShow)
    }
    let fileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        let file = e.target.files? e.target.files[0]: null;
        // console.log(file)
        if (file){
            let form = new FormData();
            form.append(file.name, file);
            props.changeAvatar(form);
        }
    }
    let updateAvatar=()=>{
        if (props.uploadAvatar){
            props.updateAvatar(props.uploadAvatar)
        }else{
            Toast.info('请先上传你的头像');
        }
        showFile()
    }
    let logout=()=>{
        props.logout()
        props.history.replace(`/login?redirect=${encodeURIComponent('/main/my')}`);
    }
    return <div className={styles.minePage}>
        <div className={styles.userMsgWrap}>
            <div className={styles.userLogo} onClick={()=>showFile()}>
                <img src={props.uploadAvatar?props.uploadAvatar:props.info.avatar} alt=""/>
            </div>
            <div className={styles.userMsgs}>
                <p>{props.info.mobile}</p>
                <p>普通用户</p>
            </div>
        </div>
        <div className={styles.changeFile} style={{display:isShow?'':'none'}}>
            <div className={styles.wrapper}>
                <div style={{width:'1rem',height:'1rem'}}>
                    <img style={{width:'100%',height:'100%'}} src={props.uploadAvatar?props.uploadAvatar:props.info.avatar} alt=""/>
                </div>
                
                <input type="file" onChange={(e)=>fileChange(e)}/>
                <button onClick={()=>updateAvatar()}>确定</button>
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
        <div className={styles.loginOut} onClick={()=>logout()}>退出登录</div>
    </div>
}

const mapStateToProps = (state: any)=>{
    // console.log('state.mylogin...',state.my,state.login)
    return {
        ...state.my,...state.login
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getMYAction:()=>{
            dispatch(MYAction())
        },
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
export default connect(mapStateToProps,mapDisptachToProps)(MyPage)