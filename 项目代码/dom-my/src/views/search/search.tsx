import React,{useEffect}from 'react'
import styles from '../../static/search.module.scss'
import {RouteComponentProps} from 'react-router-dom'
let Search:React.FC<RouteComponentProps>=props=>{
   useEffect(()=>{
     
   },[])
   let goBack=()=>{
     props.history.push('/index/massage')
   }
   return <>
       <div className={styles.searchHeader}>
         <p className="iconfont icon-fanhui" onClick={goBack}></p> 
         <p className="iconfont icon-sousuo"></p> 
         <p>
           <input type="text"/>
         </p>
         <p>取消</p>
       </div>
   </>
}
export default Search