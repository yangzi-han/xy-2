import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {getAddcartAction,updatacartAction,checkedCartAction,deleteCartAction} from '../../store/actions/cart'
import {RouteComponentProps} from 'react-router'
import styles from '../../style/index.module.scss'
interface StateType{
    cartList:Array<{
        list_pic_url:string,
        number:number,
        goods_id:number,
        id:number,
        product_id:number,
        checked:number,
        [name:string]:string|number
    }>,
    cartTotal:{
        goodsCount:number,
        checkedGoodsCount:number,
        checkedGoodsAmount:number
    }
}
interface DispatchType{
    getAddcart:Function,
    updatacart:Function,
    checkedCart:Function,
    deleteCart:Function
}

let CartPage: React.FC<StateType&DispatchType&RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getAddcart()
    },[])
    let addnum=(type:string,item:{number:number,goods_id:number,id:number,product_id:number})=>{
        if(type=='add'){
            item.number++
        }else{
            if(item.number<=1){
                item.number=1
            }
            else{
                item.number--
            }
        }
        props.updatacart(item.goods_id,item.id,item.number,item.product_id)
        console.log(item.number)
    }
    let checkedchange=(item:{checked:number,product_id:number})=>{
        if(item.checked){
            item.checked=0
        }else{
            item.checked=1
        }
        props.checkedCart(item.checked,item.product_id)
    }
    let allchecked=(type:number)=>{
        let productIds = props.cartList.map(item=>{
            return item.product_id
        }).join(",")
        props.checkedCart(type,`${productIds}`)
    }
    let deleteList=()=>{
        let arr= props.cartList.filter((item)=>{
            if(item.checked){
                return item.product_id
            }
        })
        // console.log(arr)
        let productIds = arr.map(item=>{
            return item.product_id
        }).join(",")
        console.log(productIds)
        props.deleteCart(`${productIds}`)
    }
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
                        <div className={styles.defaultimg} onClick={()=>{
                            checkedchange(item)
                        }}>
                        <img style={{display:item.checked?'none':''}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQ
                        AAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz
                        MzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2t
                        dt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T
                        2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm
                        +D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v
                        4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"/>
                        <img  style={{display:item.checked?'':'none'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAA
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
                            <p className={styles.hotGoodsPrice}>￥{item.retail_price}</p>
                            <div className={styles.countOp}>
                                <div onClick={()=>{
                                    addnum('delete',item)
                                }}>-</div><div>{item.number}</div><div  onClick={()=>{
                                    addnum('add',item)
                                  }}>+</div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
        <div className={styles.cartGoodsDo}>
            <div className={styles.isCheckItem}>
                <img onClick={()=>{allchecked(1)}}
                style={{display:props.cartTotal.goodsCount===props.cartTotal.checkedGoodsCount?'none':''}}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA
                AACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK
                7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM
                zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAA
                AVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZ
                TplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4
                txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4r
                B4T2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBr
                Y8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4
                PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQO
                U652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v4sqiqju34jyD97JD4d
                kfgo1AAAAAElFTkSuQmCC" alt="check"/>
                <img  onClick={()=>{allchecked(0)}}
                style={{display:props.cartTotal.goodsCount===props.cartTotal.checkedGoodsCount?'':'none'}}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAA
                ACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurK
                yurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++A
                MAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXB
                X6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88F
                sNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eE
                j8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5
                ErkJggg==" alt="check"></img>
            </div>
            <div className={styles.cartMsgAll}>已选({props.cartTotal.checkedGoodsCount})  ￥{props.cartTotal.checkedGoodsAmount}</div>
            <div className={styles.cartAllDoButton} onClick={()=>{
                deleteList()
            }}>选中删除</div>
            <div className={[`${styles.cartAllDoButton}`,`${styles.pay}`].join(' ')}>下单</div></div>
</div>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.cart...', state.cart)
    return {
       ...state.cart
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getAddcart:()=>{
            dispatch(getAddcartAction())
        },
        updatacart:(goodsId:number,id:number,number:number,productId:number)=>{
            dispatch(updatacartAction(goodsId,id,number,productId))
        },
        checkedCart:(isChecked:number,productIds:number)=>{
            dispatch(checkedCartAction(isChecked,productIds))
        },
        deleteCart:(productIds:string)=>{
            dispatch(deleteCartAction(productIds))
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(CartPage);