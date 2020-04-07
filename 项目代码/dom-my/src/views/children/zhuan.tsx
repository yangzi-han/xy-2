import React  from 'react'
import { connect } from 'react-redux'
import styles from '../../static/mine.module.scss'
import img from '../../static/a1.jpeg'
import {RouteComponentProps} from 'react-router-dom'
// import { Toast } from 'antd-mobile';
import { uploadAvatarAction, updateAvatarAction,logoutAction } from '../../store/actions/login'
// import { login } from '../../api/login';
interface StateType {
  info: {
      avatar: string,
      username: string
  },
  uploadAvatar: string
}

interface DispatchType {
  changeAvatar: (form: FormData)=>void,
  updateAvatar: (avatar: string)=>void,
  logout: ()=>void
}
let Mine:React.FC<StateType & DispatchType & RouteComponentProps>=props=>{
  let fileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let file = e.target.files? e.target.files[0]: null;
    if (file){
        let form = new FormData();
        form.append(file.name, file);
        props.changeAvatar(form);
    }
}

// let updateAvatar = ()=>{
//     if (props.uploadAvatar){
//         props.updateAvatar(props.uploadAvatar)
//     }else{
//         Toast.info('请先上传你的头像');
//     }
// }

let logout = ()=>{
    props.logout();
    props.history.replace(`/login?redirect=${encodeURIComponent('/index/zhuan')}`);
}
  let goAddress=()=>{
    props.history.push('/address')
  }
  let goCollect=()=>{
    props.history.push('/collect')
  }
  return <>
    <div className={styles.mineHeader}>
      <div className={styles.mineLeft}>
        <div className={styles.mine_img}>
           <div>
              <img src={props.uploadAvatar?props.uploadAvatar:props.info.avatar} alt="" />
              <input type="file" onChange={fileChange} className={styles.btn}/>
           </div>
           <span>{props.info.username}</span>
           {/* <button onClick={updateAvatar}>确定</button> */}
           </div>
      </div>
      <div className={styles.mineRight}>
        <p className={styles.mineRight_num}>17501679924</p>
        <p className={styles.mineRight_name}>普通用户</p>
      </div>
    </div>
    <div className={styles.mineMain}>
      <div className={styles.mineCollection} onClick={goCollect}>
         <p className={styles.mine_Img}>
           <span className="iconfont icon-shoucang" ></span>
         </p>
         <p className={styles.mine_clooect}>我的收藏</p> 
      </div>
      <div className={styles.mineAddress} onClick={goAddress}>
         <p className={styles.mine_Img}>
           <span className="iconfont icon-dizhiguanli"></span>
         </p>
         <p className={styles.mine_clooect}>地址管理</p> 
      </div>
      <div className={styles.mineBox3}>
          
      </div>
      <div className={styles.mineBox4}>

      </div>
      <div className={styles.mineBox5}>
          
      </div>
      <div className={styles.mineBox6}>

      </div>
      <div className={styles.mineBox7}>
          
      </div>
      <div className={styles.mineBox8}>

      </div>
      <div className={styles.mineBox9}>
          
      </div>
      <div className={styles.mineBox10}>

      </div>
      <div className={styles.mineBox11}>
          
      </div>
      <div className={styles.mineBox12}>

      </div>
    </div>
    <div className={styles.mineFooter} onClick={logout}>退出登录</div>
  </>
}
const mapStateToProps = (state: any) => {
  return state.login
}
const mapDisptachToProps = (dispatch: Function) => {
  return {
      updateAvatar: (avatar: string) => {
          dispatch(updateAvatarAction(avatar))
      },
      changeAvatar: (form: FormData) => {
          console.log(form)
          dispatch(uploadAvatarAction(form))
      },
      logout: () => {
          dispatch(logoutAction())
      }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(Mine)
