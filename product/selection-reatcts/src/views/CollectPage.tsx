import React,{useEffect} from 'react'
import styles from '../style/index.module.scss'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {RemoteActions,GetcollectActions} from '../store/actions/type'
import { SwipeAction, List ,Toast} from 'antd-mobile';
// import { getCollectDelet } from '../../api/collect';
interface DispathProps{
  getCollectList:Function,
  getCollectDelet:Function
  collectList:Array<{
     name:string,
     id:number,
     goods_brief:string,
     list_pic_url:string,
     retail_price:number,
     value_id:number
  }>
}
let Collect:React.FC<RouteComponentProps&DispathProps>=props=>{
  useEffect(()=>{
      props.getCollectList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  let goDelet=(id: number)=>{
    // console.log(props.match.params)
     props.getCollectDelet(id)
     Toast.success("删除成功");
  }
  return <>
    <div className={styles.collect_header}>
      <span>
        <p className="iconfont icon-fanhui" onClick={props.history.goBack}></p> 
      </span>
      <span>easyLikeGoods</span>
      <span></span>
    </div>
    <div className={styles.collect_context}>
      {
        props.collectList&&props.collectList.map((item)=>{
           return   <List  key={item.id} >
           <SwipeAction style={{ backgroundColor: 'gray' }} autoClose
             right={[
                 {
                    text: '删除',
                    style: { backgroundColor: 'red', color: 'white',width:'60px'},
                    onPress: () => goDelet(item.value_id),
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
  console.log(state.type,'2222')
  return {
     ...state.type
  }
}
const mapDisptachToProps = (dispatch: Function)=>{
  return {
     getCollectList:()=>{
        dispatch(GetcollectActions())
     },
    //  getCollectDelet:(valueId:any)=>{
    //     dispatch(collectDeletAction(valueId))
    //  }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(Collect)