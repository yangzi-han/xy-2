import React,{useEffect} from 'react'
import styles from '../../scss/cart.module.scss'
import {connect} from 'react-redux'
import {CartlistAction} from '../../store/actions/cartlist'
interface DispatchType{
    cartlist :Function
}
interface Actiontype{
    cart:{
        cartList:cartList[]
    }
}
interface cartList{
    goods_id:string,
    goods_name:string,
    number:number,
    list_pic_url:string,
    retail_price:string
}
let CartPage: React.FC<DispatchType&Actiontype> = props=>{
    useEffect(()=>{
        props.cartlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return <>
    <div className={styles.top}>
        <span><b>★</b>30天无忧退货</span>
        <span><b>★</b>48小时快速退款</span>
        <span><b>★</b>满88元免邮费</span>
    </div>
    <div className={styles.center}>
    {
         props.cart.cartList&&props.cart.cartList.map(item=>{
            return <div key={item.goods_id} className={styles.centeritem}>
                <div><img src={item.list_pic_url} alt=""/></div>
                <div>
                    <p>{item.goods_name}</p>
         <p>{item.retail_price}</p>
                </div>
         <div>×{item.number}</div>
            </div>
        })
    }
    </div>
    <div className={styles.footer}>
       <div className={styles.left}>
        <span className={styles.span}><input type="checkbox"  className={styles.input} /></span>
        <span className={styles.span}>已选(0) ￥0</span>
        <span className={styles.spans}>编辑</span>
       </div>
        <div className={styles.right}>下单</div>
    </div>
    </>;
}
let mapStateToProps=(state:any)=>{
    console.log(state.Cartlist)
    return {
        cart:state.Cartlist
    }

}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        cartlist:()=>{
            dispatch(CartlistAction())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartPage);