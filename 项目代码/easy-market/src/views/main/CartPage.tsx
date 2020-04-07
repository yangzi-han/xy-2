import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {getAddcartAction} from '../../store/actions/cart'
import {RouteComponentProps} from 'react-router'
import styles from '../../style/index.module.scss'
interface StateType{
    cartList:Array<{
        list_pic_url:string,
        [name:string]:string|number
    }>,
    cartTotal:{}
}
interface DispatchType{
    getAddcart:Function
}

let CartPage: React.FC<StateType&DispatchType&RouteComponentProps> = props=>{
    let [is_default,setis_default]=useState(false)
    useEffect(()=>{
        props.getAddcart()
    },[])
    return <div>
        <div className={styles.serviceList}>
            <li><span>★</span>30天无忧退货</li>
            <li><span>★</span>48小时快速退款</li>
            <li><span>★</span>满88元免邮费</li>
        </div>
        <div className={styles.hotGoodsWrap} style={{margin:'0',width:'100%'}}>
            {
                props.cartList.map(item=>{
                    return <div className={styles.hotGoodsItem} key={item.id} style={{background:'#fff',height:'0.8rem',width: '100%'}}>
                        <div className={styles.defaultimg} onClick={()=>{}}>
                        <img style={{display:is_default?'none':''}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQ
                        AAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz
                        MzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2t
                        dt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T
                        2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm
                        +D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v
                        4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"/>
                        <img  style={{display:is_default?'':'none'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAA
                        ACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurK
                        yurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++A
                        MAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXB
                        X6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88F
                        sNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eE
                        j8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5
                        ErkJggg==" alt="check"></img>
                        </div>
                        <img src={item.list_pic_url} alt=""/>
                        <div className={styles.hotGoodsInfos} style={{padding:'0.1rem'}}>
                            <p className={styles.hotGoodsName}>{item.goods_name}</p>
                            <p className={styles.hotGoodsPrice}>￥{item.retail_price} x{item.number}</p>
                        </div>
                    </div>
                })
            }
        </div>
</div>;
}

const mapStateToProps = (state: any)=>{
    console.log('state.cart...', state.cart)
    return {
       ...state.cart
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getAddcart:()=>{
            dispatch(getAddcartAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(CartPage);