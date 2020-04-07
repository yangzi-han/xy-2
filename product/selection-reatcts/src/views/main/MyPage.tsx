import React,{useEffect} from 'react'
import styles from '../../style/index.module.scss'
import '../../style/fonts/iconfont.css'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {loginAction, UploderAction} from '../../store/actions/my'

interface StateProps{
    // userinfo:Function,
    changeAvatar:Function
}
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

const MyPage: React.FC<RouteComponentProps & StateProps & StateType & DispatchType> = (props) =>{
    useEffect(()=>{
        // props.userinfo()
    },[])
    let goCollect = ()=> {
        props.history.push('/collectpage')
    }
    let goAddress = () => {
        props.history.push('/addresspage')
    }
    let fileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let file = e.target.files? e.target.files[0]: null;
        if (file){
            let form = new FormData();
            form.append(file.name, file);
            props.changeAvatar(form);
        }
    }
    return <>
        <div className={styles.mineHeader}>
            <div className={styles.userlog}>
                <div className={styles.file}></div>
                {/* <img src={} alt="" /> */}
                <input type="file" onChange={fileChange} className={styles.btn}/>
            </div>
            <div className={styles.userMsgs}>
                <div className={styles.userinfo}>
                    <p>18611123775</p>
                    <p>塑料用户</p>
                </div>
                
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
    </>
}
const mapStateToProps = (state: any)=>{
    console.log(state.my)   
    return {
        ...state.my
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        // userinfo(){
        //     dispatch(loginAction())
        // },
        changeAvatar(form: FormData){
            dispatch(UploderAction(form))
        }
        
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(MyPage)