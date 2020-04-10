import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {homeDetailAction} from '../../store/actions/detail'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/detail.module.scss'
// import { getDetailList, getDetailRelated } from '../../api/release';
// import { getHomeDetail } from '../../api/detail';
interface DispatchProps{
   getHomeDetail:Function,
   brand:{
       name:string,
       list_pic_url:string,
       simple_desc:string
   }
}
let Detail:React.FC<RouteComponentProps&DispatchProps>=props=>{
 let [id]=useState(props.match.params)
 
 useEffect(()=>{
     props.getHomeDetail(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  let goBack=()=>{
    props.history.push('/index/home')
  }
  return <>
      <div className={styles.HomeHeader}>
         <span>
           <p className="iconfont icon-fanhui" onClick={goBack}></p> 
         </span>
         <span>
           {props.brand&&props.brand.name}  
         </span>
         <span></span>
      </div>
      <div className={styles.HomeImg}>
        <img src={props.brand&&props.brand.list_pic_url} alt=""/>
        <div className={styles.HomeText}>
          {props.brand&&props.brand.simple_desc}
        </div>
      </div>
  </>
}

const mapStateToProps=(state:any)=>{

  return {
      brand:state.detail.homeDetail.brand
  }
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getHomeDetail:(id:any)=>{
          dispatch(homeDetailAction(id.id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail)