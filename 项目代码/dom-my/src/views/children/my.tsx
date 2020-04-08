import React,{useEffect,useState}from 'react';
import {connect} from 'react-redux'
import {cartListAction,cartDeletAction,cartCheckedAction,cartAddAction} from '../../store/actions/shopCar'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/cart.module.scss'
// import { getCartList, getCartDelet, getCartChecked, getCartAdd } from '../../api/shopCar';
// import useState from 'react';
interface DispathProps{
  getCartList:Function,
  getCartDelet:Function,
  getCartChecked:Function,
  getCartAdd:Function
  cartList:Array<{
    goods_id:number,
    goods_name:number,
    number:number,
    checked:1,
    list_pic_url:string,
    retail_price:number,
    product_id:number
  }>
  cartTotal:{
    goodsCount:number,
    goodsAmount:number
  }
}
let ShopCar:React.FC<RouteComponentProps&DispathProps>=props=>{
  //  let [flag,setFlag]=useState(false)
   useEffect(()=>{
      props.getCartList()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
  // let changeAllChecked=()=>{
  //     if(!flag){

  //     }
  //  }
   let changeCount=(item: { goods_id: any; number: any; product_id: any; },type: any)=>{
    let {goods_id,number,product_id}=item
    if(number+type>=1){
       props.getCartAdd({
          goodsId:goods_id,
          number:type,
          productId:product_id
        })
        props.getCartList()
    }
   }
   return <>
      <div className={styles.cart_header}>
        <span>
            <i>☆</i>
            30天无忧退换
        </span>
        <span>
            <i>☆</i>
            48小时快速退换
        </span>
        <span>
            <i>☆</i>
            满88天免邮费
        </span>
      </div>
      <div className={styles.cart_context}>
        {
          props.cartList&&props.cartList.map((item,index)=>{
             return <div key={index} className={styles.cart_context_wrap}>
                <div className={styles.cart_context_left}><input type="radio"/></div>
                <div className={styles.cart_context_middle}>
                  <div className={styles.cart_contxt_img}>
                    <img src={item.list_pic_url} alt=""/>
                  </div>
                   <div className={styles.cartCart}>
                     <div>已选择:</div>
                     <div className={styles.price}>￥{item.retail_price}</div>
                   </div> 
                </div>
                <div className={styles.cart_context_right}>
                  <div className={styles.cartLeft} onClick={()=>{changeCount(item,-1)}}>-</div>
                  <div className={styles.cartMiddle}>{item.number}</div>
                  <div className={styles.cartRight} onClick={()=>{changeCount(item,+1)}}>+</div>
                </div>
             </div>
          })
        }
      </div>
      <div className={styles.cart_footer}>
        <div className={styles.cart_footer_left}>
          <p className={styles.cart_footer_dan}>
            <input type="radio"/>
            <span>已选({props.cartTotal&&props.cartTotal.goodsCount})</span>
            <span>￥{props.cartTotal&&props.cartTotal.goodsAmount}</span>
          </p>
          <p className={styles.cart_footer_deair}>编辑</p>
        </div>
        <div className={styles.cart_footer_right}>
          下单
        </div>
      </div>
   </>
}
const mapStateToProps = (state: any)=>{
  console.log(state.shopCar.cartTotal,'2222')
  return {
    cartList:state.shopCar.cartList,
    cartTotal:state.shopCar.cartTotal
  }
}
const mapDisptachToProps = (dispatch: Function)=>{
  return {
     getCartList:()=>{
       dispatch(cartListAction())
     },
     getCartDelet:(productId:any)=>{
       dispatch(cartDeletAction(productId))
     },
     getCartChecked:(productId:string,isChecked:number,)=>{
        dispatch(cartCheckedAction(productId,isChecked))
     },
     getCartAdd:(goodsId:any,number:any,productId:any)=>{
      //  console.log(goodsId.productId)
      dispatch(cartAddAction(goodsId.goodsId,goodsId.number,goodsId.productId))
   }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(ShopCar)
