import React,{useEffect} from 'react'
import styles from '../../static/collect.module.scss'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {collectListAction,collectDeletAction} from '../../store/actions/collect'
import { SwipeAction, List ,Toast} from 'antd-mobile';
// import { getCollectDelet } from '../../api/collect';
interface DispathProps{
  getCollectList:Function,
  getCollectDelet:Function
  collect:Array<{
     name:string,
     id:number,
     goods_brief:string,
     list_pic_url:string,
     retail_price:number,
     value_id:number,
     splice:Function
  }>
}
let Collect:React.FC<RouteComponentProps&DispathProps>=props=>{
  useEffect(()=>{
      props.getCollectList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
 let goBack=()=>{
    props.history.push('/index/zhuan')
  }
  // let goDelet=(id: number,index: number)=>{
  //   // console.log(props.match.params)
    
  //    props.getCollectList()
  //    props.collect&&props.collect.splice(index,1)
  //    props.getCollectDelet(id)
     
  //    Toast.success("删除成功");
  // }
  return <>
    <div className={styles.collect_header}>
      <span>
        <p className="iconfont icon-fanhui" onClick={goBack}></p> 
      </span>
      <span>easyLikeGoods</span>
      <span></span>
    </div>
    <div className={styles.collect_context}>
      {
        props.collect&&props.collect.map((item,index)=>{
           return   <List  key={item.id} >
           <SwipeAction style={{ backgroundColor: 'gray' }} autoClose
             right={[
                 {
                    text: '删除',
                    style: { backgroundColor: 'red', color: 'white',width:'60px'},
                    onPress: () => {
                        props.getCollectDelet(item.value_id)
                        props.getCollectList()
                        Toast.success("删除成功",1);
                    },
                 },
              ]}>
             <List.Item onClick={e => console.log(e)}>
               <div className={styles.collect_context_item}>
                  <div className={styles.collect_context_img}>
                     <img src={item.list_pic_url} alt=""/>
                  </div>
                  <div className={styles.collect_context_text}>
                     <p className={styles.collect_context_name}>{item.name}</p>
                     <p className={styles.collect_context_brief}>{item.goods_brief}</p>
                     <p className={styles.collect_context_price}>
                       ￥
                       {item.retail_price}
                     </p>
                  </div>
               </div>
             </List.Item>
           </SwipeAction>
         </List>
        })
      }
    </div>
    <div>
    </div>
  </>
}
const mapStateToProps = (state: any)=>{
  // console.log(state.collect.collectData,'2222')
  return {
     collect:state.collect.collectData
  }
}
const mapDisptachToProps = (dispatch: Function)=>{
  return {
     getCollectList:()=>{
        dispatch(collectListAction())
     },
     getCollectDelet:(valueId:any)=>{
        dispatch(collectDeletAction(valueId))
     }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(Collect)