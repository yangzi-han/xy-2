import React,{useEffect,useState}from 'react'
import styles from '../../static/search.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import {searchHelperAction} from '../../store/actions/search'
import {connect} from 'react-redux'
// import { getSearchHelper } from '../../api/search';
interface DispathProps{
   getSearchHelper:Function,
   data:Array<string>
}
let Search:React.FC<RouteComponentProps&DispathProps>=props=>{
   let [text,setText]=useState<string>('')
   useEffect(()=>{
      props.getSearchHelper(text)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   let goBack=()=>{
     props.history.push('/index/massage')
   }
   let getText=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value)
    console.log(e.target.value)
   }
   return <>
       <div className={styles.searchHeader}>
         <p className="iconfont icon-fanhui" onClick={goBack}></p> 
         <p className="iconfont icon-sousuo"></p> 
         <p>
           <input type="text" onChange={getText}/>
         </p>
         <p>取消</p>
       </div>
       <div className={styles.historyList}>
         <p className={styles.historyWrap}>
          <span className={styles.history_text}>历史记录</span>
          <span className="iconfont icon-shanchu"></span>
         </p>
       </div>
       <div className={styles.context}>
          <p className={styles.Text}>热门搜索</p>
          {
            props.data&&props.data.map((item,index)=>{
                return <button key={index} className={styles.ItemSearch}>
                   {item}
                </button>
            })
          }
       </div>
   </>
}
const mapStateToProps = (state: any)=>{
  console.log(state.search.data,'2222')
  return {
     data:state.search.data
  }
}
const mapDisptachToProps = (dispatch: Function)=>{
  return {
     getSearchHelper:(keyword:any)=>{
       dispatch(searchHelperAction(keyword))
     }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(Search)