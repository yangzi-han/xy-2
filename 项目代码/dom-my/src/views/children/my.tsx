import React,{useEffect}from 'react';
import {connect} from 'react-redux'
import {cartListAction,cartDeletAction,cartCheckedAction,cartAddAction} from '../../store/actions/shopCar'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/cart.module.scss'
import isChecked from '../../static/isCheck.png'
import noChecked from '../../static/noCheck.png'
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
    product_id:number,
    id:number
  }>
  cartTotal:{
    goodsCount:number,
    goodsAmount:number,
    checkedGoodsCount:number,
    checkedGoodsAmount:number
  }
}
let ShopCar:React.FC<RouteComponentProps&DispathProps>=props=>{
  //  let [flag]=useState(false)
  //  let [allChecked]=useState(props.shopCar)
   useEffect(()=>{
      props.getCartList()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

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
   let changeChecked=(item:any)=>{
       if(item.checked==1){
          item.checked=0
       }else{
         item.checked=1
       }
       props.getCartChecked(item.checked,item.product_id)
   }
   let allChecked=(type:number)=>{
        let flag=props.cartList.map(item=>{
            return item.product_id
        }).join(',')
       props.getCartChecked(type,flag)
   }
   let btnDelet=(item: { goods_id: number; goods_name: number; number: number; checked: 1; list_pic_url: string; retail_price: number; product_id: number; id: number; })=>{
       props.getCartDelet(item.product_id)
       props.getCartList()
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
                <div className={styles.cart_context_left} onClick={()=>{changeChecked(item)}}>
                  <img style={{display:item.checked?"none":""}} src={noChecked} alt=""/>
                  <img style={{display:item.checked?"":"none"}} src={isChecked} alt=""/>
                </div>
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
                <div className={styles.cart_context_delet} onClick={()=>btnDelet(item)}>
                  <i className='iconfont icon-shanchu'></i>
                </div>
             </div>
          })
        }
      </div>
      <div className={styles.cart_footer}>
        <div className={styles.cart_footer_left}>
          <div className={styles.cart_footer_dan} >
            <div>
              <img  onClick={()=>allChecked(0)} style={{display:props.cartTotal.checkedGoodsCount===props.cartTotal.goodsCount?"":"none"}} src={isChecked} alt="" />
              <img  onClick={()=>allChecked(1)} style={{display:props.cartTotal.checkedGoodsCount===props.cartTotal.goodsCount?"none":""}} src={noChecked} alt="" />
            </div>
            <div className={styles.cart_footer_price}>
            <span>已选({props.cartTotal&&props.cartTotal.checkedGoodsCount})</span>
            <span>￥{props.cartTotal&&props.cartTotal.checkedGoodsAmount}</span>
            </div>
          </div>
        </div>
        <div className={styles.cart_footer_right}>
          下单
        </div>
      </div>
   </>
}
const mapStateToProps = (state: any)=>{
  // console.log(state,'2222')
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
     getCartDelet:(productIds:string)=>{
  
       dispatch(cartDeletAction(productIds))
     },
     getCartChecked:(isChecked:number,productIds:string)=>{
        dispatch(cartCheckedAction(isChecked,productIds))
     },
     getCartAdd:(goodsId:any,number:any,productId:any)=>{
      //  console.log(goodsId.productId)
      dispatch(cartAddAction(goodsId.goodsId,goodsId.number,goodsId.productId))
   }
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(ShopCar)
