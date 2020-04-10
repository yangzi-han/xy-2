import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import { typeAction, currentAction } from '../../store/actions/type';
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/classfly.module.scss'
// import LazyLoad from 'react-lazyload';
// import { getClassFly, getType } from '../../api/classfly';
// import { getCurrent } from '../../api/type';
interface DispatchProps{
    getType:Function,
    getCurrent:Function
    categoryList:Array<{
        id:number,
        name:string
    }>
    currentCategory:{
        id:number,
        wap_banner_url:string,
        front_desc:string,
        name:string,
        subCategoryList:Array<ItemType>
    }
}
interface ItemType{
        id:number,
        name:string,
        wap_banner_url:string
}

let Classfly:React.FC<DispatchProps&RouteComponentProps>=(props)=>{
    // console.log(props)
    let [flag,setFlag]=useState(0)
    useEffect(()=>{
      props.getType()
      props.getCurrent('1005000')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // let goDetail=(e:React.MouseEvent<HTMLLIElement>)=>{
    //     // 监听事件的元素
    // //    let id = e.currentTarget.dataset.id;
    // //    console.log(id)
    // }
    let Index=(index:any,id:number)=>{
        setFlag(flag=index)
        props.getCurrent(id)
    }
    let goSearch=()=>{
        props.history.push('/search')
    }
    let goTypeDetail=(e:React.MouseEvent<HTMLDivElement>)=>{
        //监听事件的元素
       let id = e.currentTarget.dataset.id;
    //    console.log(id)
       props.history.push('/typeDetail/'+id)
    }
    return <>
     <div>
       <div className={styles.header}>
         <input type="text" placeholder="搜索商品,共239个好物" onClick={goSearch}/>
       </div>
       <div className={styles.tabList}>
        <div className={styles.leftNav}>
          {
              props.categoryList&&props.categoryList.map((item,index)=>{
                 return <p key={item.id} onClick={()=>Index(index,item.id)}className={[`${styles.context}`,`${index===flag?styles.active:""}`].join(' ')}>
                     {
                         item.name
                     }
                 </p>
              })
          }
        </div>
        <div className={styles.rightList}>
           {
              <div className={styles.currentWrap}  key={props.currentCategory&&props.currentCategory.id}>
                 <img className={styles.currentImg} src={props.currentCategory&&props.currentCategory.wap_banner_url} alt=""/> 
                 <div className={styles.currentText}>{props.currentCategory&&props.currentCategory.front_desc}</div>
                 <div className={styles.currentName}>{props.currentCategory&&props.currentCategory.name}</div>
                 <div className={styles.currentItem}>
                   {
                       props.currentCategory&&props.currentCategory.subCategoryList.map((item,index)=>{
                           return <div key={item.id} className={styles.subItem} onClick={goTypeDetail} data-id={item.id}>
                     
                                 <img src={item.wap_banner_url} alt="" className={styles.subImg}/>
                           
                               <div className={styles.subName}>{item.name}</div>
                           </div>
                       })
                   }
                 </div>
              </div>
           }
        </div>
       </div>   
     </div>
    </>
}
const mapStateToProps=(state:any)=>{
    console.log(state.type.curren.currentCategory)
    return {
        categoryList:state.type.type.categoryList,
        currentCategory:state.type.curren.currentCategory
    }
}
const mapDispatchToProps=(dispatch:Function)=>{
    return {
        getType:()=>{
            dispatch(typeAction())
        },
        getCurrent:(id:any)=>{
            dispatch(currentAction(id))
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Classfly)