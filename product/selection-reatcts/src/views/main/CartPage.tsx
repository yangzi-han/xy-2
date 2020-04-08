import React,{useEffect} from 'react'
import styles from '../../style/index.module.scss'
import {connect} from 'react-redux'
import {CartAction} from '../../store/actions/cart'

interface StateProps{
    getCartList:Function,
    cartList:Array<{
        list_pic_url:string
        [name: string]: string | number
    }>
}

const CartPage: React.FC<StateProps> = props =>{
    useEffect(()=>{
        props.getCartList()
    },[])
    let getJian = (item:any) =>{

    }
    let getJia = (item:any) =>{
        
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
      <div className={styles.cart_context}>
        {
          props.cartList&&props.cartList.map((item,index)=>{
             return <div key={index} className={styles.cart_context_wrap}>
                <div className={styles.cart_context_left}><input type="checkbox"/></div>
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
                  <div className={styles.cartLeft} onClick={()=>{getJian(item)}}>-</div>
                  <div className={styles.cartMiddle}>{item.number}</div>
                  <div className={styles.cartRight} onClick={()=>{getJia(item)}}>+</div>
                </div>
             </div>
          })
        }
      </div>
      <div className={styles.cart_footer}>
        <div className={styles.cart_footer_left}>
          <div className={styles.cart_footer_dan}>
            <input type="checkbox"/>
            <span>已选({0})</span>
            <span>￥{0}</span>
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
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(CartPage)