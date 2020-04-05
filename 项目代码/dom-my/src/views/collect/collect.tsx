import React,{useEffect,useState} from 'react'
import styles from '../../static/collect.module.scss'
import {RouteComponentProps} from 'react-router'
let Collect:React.FC<RouteComponentProps>=props=>{
  let [id]=useState(props.match.params)
  console.log(id,'88888')
  useEffect(()=>{
     
  },[])
 let goBack=()=>{
    props.history.push('/index/zhuan')
  }
  return <>
    <div className={styles.collect_header}>
      <span>
        <p className="iconfont icon-fanhui" onClick={goBack}></p> 
      </span>
      <span>easyLikeGoods</span>
      <span></span>
    </div>
    <div className={styles.collect_context}></div>
  </>
}
export default Collect