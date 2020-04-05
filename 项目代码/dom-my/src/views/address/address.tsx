import React,{useEffect,useState} from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {addRessListAction} from '../../store/actions/address'
// import { getAddRessList } from '../../api/address';
interface DispatchProps{
  getAddRessList:Function
}
let Address:React.FC<RouteComponentProps&DispatchProps>=props=>{
   useEffect(()=>{
      props.getAddRessList()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   let goBack=()=>{
        props.history.push('/index/zhuan')
   }
   let goAdd=()=>{
        props.history.push('/add')
   }
  return <>
     <div className={styles.address_header}>
       <span>
         <p className="iconfont icon-fanhui" onClick={goBack}></p>   
       </span>
       <span>地址管理</span>
       <span></span>
     </div>
     <div className={styles.address_context}></div>
     <div className={styles.address_footer} onClick={goAdd}>
       新建地址  
     </div>
  </>
}
const mapStateToProps=(state:any)=>{
  return state.address
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getAddRessList:()=>{
         dispatch(addRessListAction())
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Address)