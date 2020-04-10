import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {detailAction,detailRelatedAction} from '../../store/actions/release'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/detail.module.scss'
// import { getDetailList, getDetailRelated } from '../../api/release';
interface DispatchProps{
  getDetailList:Function,
  getDetailRelated:Function
  detail:{
    title:string,
    content:string
  },
  related: Array<{
    scene_pic_url:string,
    [name:string]: string|number
  }>
}
let Detail:React.FC<RouteComponentProps&DispatchProps>=props=>{
  let [id]=useState(props.match.params)
  useEffect(()=>{
      props.getDetailList(id)
      props.getDetailRelated(id)
     // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[])
  let goBack=()=>{
    props.history.push('/index/release')
  }
  return <>
    <div className={styles.detailWrap}>
      <div className={styles.detailHeader}>
        <span onClick={goBack}>返回</span>
        <span>{props.detail.title}</span>
        <span></span>
      </div>
      <div className={styles.detailImg} dangerouslySetInnerHTML = {{ __html:props.detail.content }}></div>
      <div className={styles.detailTitle}>
        <div className={styles.detailText}>推荐专题</div>
        <div className={styles.detailItem}>
         {
           props.related.map(item=>{
            return <div className={styles.relateItem} key={item.id}>
                        <img src={item.scene_pic_url} alt=""/>
                        <p className={styles.relatedText}>{item.title}</p>
              </div>
           })
         }
        </div>
      </div>
    </div>
  </>
}
const mapStateToProps=(state:any)=>{
  return state.release
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getDetailList:(id:any)=>{
          dispatch(detailAction(id.id));
      },
      getDetailRelated:(id:any)=>{
         dispatch(detailRelatedAction(id.id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail)