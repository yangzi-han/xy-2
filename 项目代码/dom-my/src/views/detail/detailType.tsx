import React,{useEffect,useState}from 'react'
import {connect} from 'react-redux'
import {listAction,navAction} from '../../store/actions/type'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/detail.module.scss'
// import { getList, getDetail, getNav } from '../../api/type';
interface DispathProps{
   getList:Function,
   getNav:Function,
   brotherCategory:Array<{
      name:string,
      id:number,
      front_name:string,
      title:string
   }>,
   data:Array<{
      name:string,
      list_pic_url:string,
      retail_price:string,
      id:number
   }>
}

let TypeDetail:React.FC<DispathProps&RouteComponentProps>=props=>{
  let [id]=useState(props.match.params)
  let [flag,setFlag]=useState(0)
  useEffect(()=>{
    
     props.getNav(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 
  let goBack=()=>{
   props.history.push('/index/massage')
 }
 let Index=(index:any,id:number)=>{
   setFlag(flag=index)
   props.getList(id)
}
  return <>
      <div className={styles.headerBig}>
        <div className={styles.brandHeader}>
         <span>
           <p className="iconfont icon-fanhui" onClick={goBack}></p> 
         </span>
         <span>奇趣分类</span>
         <span></span>
        </div>
        <div className={styles.brandNav}>
           <div className={styles.content}>
           {
              props.brotherCategory&&props.brotherCategory.map((item,index)=>{
                  return <div key={item.id}  onClick={()=>Index(index,item.id)} className={[`${styles.brandItem}`,`${index===flag?styles.active:""}`].join(' ')}>
                      {item.name}
                  </div>
              })
           }
           </div>
        </div>
      </div>
      <div className={styles.brandText}>
        {
              props.brotherCategory&&props.brotherCategory.map((item,index)=>{
                  return <div key={item.id} className={[`${styles.brandTitle}`,`${index===flag?"":styles.actives}`].join(' ')}>
                      <p>{item.name}</p>
                      <p>{item.front_name}</p>
                  </div>
              })
         }
      </div>
      <div className={styles.brandMain}>
         {
            props.data&&props.data.map((item)=>{
               return <div className={styles.dataItem} key={item.id}>
                  <div className={styles.dataImg}>
                     <img src={item.list_pic_url} alt=""/>
                  </div>
                  <div className={styles.dataName}>{item.name}</div>
                  <div className={styles.dataPrice}>
                    ￥
                    {item.retail_price}
                    元
                  </div>
               </div>
            })
         }
      </div>
  </>
}
const mapStateToProps=(state:any)=>{
   console.log(state.type.list.data,'22222')
  return {
           brotherCategory:state.type.nav.brotherCategory,
           data:state.type.list.data
         }
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getList:(categoryId:any)=>{
         dispatch(listAction(categoryId));
      },
      getNav:(id:any)=>{
         dispatch(navAction(id.id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TypeDetail)