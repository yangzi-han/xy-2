import React,{useEffect} from 'react'
import styles from '../../style/index.module.scss'
import {connect} from 'react-redux'
import {CartAction, AddCartAction, CheckedAction} from '../../store/actions/cart'

interface StateProps{
    getCartList:Function,
    cartList:Array<{
        list_pic_url:string
        [name: string]: string | number
    }>,
    cartTotal:{
      [name: string]: string | number
    }
    getCartAdd:Function,
    isCheck:Function
}

const CartPage: React.FC<StateProps> = props =>{
    useEffect(()=>{
        props.getCartList()
    },[])
    let count = (item:any,type:number) =>{
      console.log(item)      
      let {goods_id,number,product_id} = item
      if(number+type>=1){
        props.getCartAdd(goods_id,type,product_id)
      }
      props.getCartList()
    }
    let checkange=(item:any)=>{
        if(item.checked == 1){
          item.checked = 0
        }else{
          item.checked = 1
        }
        props.isCheck(item.checked,item.product_id)
    }
    let allcheckout = (check:number) =>{
      let flag = props.cartList.map(item=>{
          return item.product_id
      }).join(',')
      props.isCheck(check,flag)
    }
    console.log(props)    
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
      <div className={styles.cart_list}>
        <div className={styles.cart_context}>
          {
            props.cartList&&props.cartList.map((item,index)=>{
              return <div key={index} className={styles.cart_context_wrap}>
                  <div className={styles.cart_context_left} onClick={()=>checkange(item)}>
                    <img style={{display:item.checked?'':'none'}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg==' alt=""/>
                    <img style={{display:item.checked?'none':''}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC' alt=""/>
                  </div>
                  <div className={styles.cart_context_middle}>
                    <div className={styles.cart_contxt_img}>
                      <img src={item.list_pic_url} alt=""/>
                    </div>
                      <div className={styles.cartCart}>
                      <div>{item.goods_name}</div>
                      <div className={styles.price}>￥{item.retail_price}</div>
                    </div> 
                  </div>
                  <div className={styles.cart_context_right}>
                    <div className={styles.cartLeft} onClick={()=>{count(item,-1)}}>-</div>
                    <div className={styles.cartMiddle}>{item.number}</div>
                    <div className={styles.cartRight} onClick={()=>{count(item,+1)}}>+</div>
                  </div>
              </div>
            })
          }
        </div>
      </div>
      <div className={styles.cart_footer}>
        <div className={styles.cart_footer_left}>
          <div className={styles.cart_footer_dan}>
            <div className={styles.allcheckout}>
              <img onClick={()=>allcheckout(0)} style={{display:props.cartTotal.checkedGoodsCount === props.cartTotal.goodsCount?'':'none'}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg==' alt=""/>
              <img onClick={()=>allcheckout(1)} style={{display:props.cartTotal.checkedGoodsCount === props.cartTotal.goodsCount?'none':''}} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC' alt=""/>
            </div>
            <span>已选({props.cartTotal.checkedGoodsCount})</span>
            <span>￥{props.cartTotal.checkedGoodsAmount}</span>
          </div>
          <div className={styles.cart_footer_deair}>编辑</div>
        </div>
        <div className={styles.cart_footer_right}>
          下单
        </div>
      </div>
   </>

}

const mapStateToProps = (state: any)=>{
    return {
        ...state.cart
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getCartList(){
            dispatch(CartAction())
        },
        getCartAdd(goodsId:string,number:string,productId:string){
            dispatch(AddCartAction(goodsId,number,productId))
        },
        isCheck(isChecked:number,productIds:string){
          dispatch(CheckedAction(isChecked,productIds))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(CartPage)