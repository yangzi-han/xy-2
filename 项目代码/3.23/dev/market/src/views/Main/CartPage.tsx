import React,{useEffect} from 'react'
import styles from '../../scss/cart.module.scss'
import {connect} from 'react-redux'
import {CartlistAction} from '../../store/actions/cartlist'
import { SwipeAction, List } from 'antd-mobile';
import {DeletecartAction} from '../../store/actions/deletecart'
import {ChecktAction} from '../../store/actions/check'
interface DispatchType{
    cartlist :Function,
    deletecart :Function,
    check:Function
}
interface Actiontype{
    cart:{
        cartList:cartList[]
    }
}
interface cartList{
    id:string
    goods_id:string,
    goods_name:string,
    number:number,
    list_pic_url:string,
    retail_price:string,
    product_id:string,
    goods_sn:string,
    checked:number
}
let CartPage: React.FC<DispatchType&Actiontype> = props=>{
    useEffect(()=>{
        props.cartlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let check=(check:number,productid:string)=>{
        props.check(check,productid)
    }
    return <>
    <div className={styles.top}>
        <span><b>★</b>30天无忧退货</span>
        <span><b>★</b>48小时快速退款</span>
        <span><b>★</b>满88元免邮费</span>
    </div>
    <div className={styles.center}>
    <List>

{
    props.cart.cartList&&props.cart.cartList.map((item, index) => {
        return <SwipeAction key={item.goods_id} 
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
                {
                    text: '删除',
                    onPress: () => {
                       props.deletecart(`${item.product_id}`)
                       window.history.go(0)
                    },
                    style: { backgroundColor: '#F4333C', color: 'white',width:'2rem' },
                },
            ]}

        >
            <List.Item className={styles.list}>
            <div key={item.goods_id} className={styles.centeritem}>
                <div className={styles.span}><input type="checkbox" className={styles.input} checked={item.checked===1?true:false} onClick={()=>check(item.checked===1?0:1,item.product_id)} /></div>
                <div className={styles.img}><img src={item.list_pic_url} alt=""/></div>
                <div>
                    <p>{item.goods_name}</p>
         <p className={styles.name}>￥{item.retail_price}</p>
                </div>
         <div>×{item.number}</div>
            </div>
            </List.Item>
        </SwipeAction>
    })
}
</List>
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
    console.log(state.Check)
    return {
        cart:state.Cartlist
    }

}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        cartlist:()=>{
            dispatch(CartlistAction())
        },
        deletecart:(productIds:string)=>{
            dispatch(DeletecartAction(productIds))
        },
        check:(check:number,productid:number)=>{
            dispatch(ChecktAction(check,productid))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartPage);