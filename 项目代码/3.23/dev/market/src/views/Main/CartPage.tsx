import React from 'react'
import styles from '../../scss/cart.module.scss'
let CartPage: React.FC = props=>{

    return <>
    <div className={styles.top}>
        <span><b>★</b>30天无忧退货</span>
        <span><b>★</b>48小时快速退款</span>
        <span><b>★</b>满88元免邮费</span>
    </div>
    <div className={styles.center}></div>
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

export default CartPage;