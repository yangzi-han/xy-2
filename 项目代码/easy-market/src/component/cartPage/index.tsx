import React, { useState } from 'react'
import { RouteComponentProps ,withRouter} from 'react-router'
import styles from'./index.module.scss'
import { connect } from 'react-redux'
import {Toast} from 'antd-mobile'
interface PropsType {
    info:{
        retail_price:number,
        list_pic_url:string,
        goods_number:number,
        id:number
    },
    productList:Array<{
        [name:string]:string|number
    }>,
}
interface DispatchType {
    isCartflage:Function,
    Addcart:Function
}
let CartPageView:React.FC<PropsType & DispatchType &RouteComponentProps>=props=>{
    let [num,setnum]=useState(0)
    let isCartflageView=()=>{
       props.isCartflage()
    }
    let addnum=(type:string)=>{
        if(type=='add'){
            num++
          setnum(num)
        }else{
            if(num<=0){
                setnum(num=0)
            }
            else{
                num--
                setnum(num)
            }
        }
    }
    let addcartlist=()=>{
        // console.log(num)
        if(num==0){
            Toast.fail('请选择商品数量')
        }else{
            props.Addcart(props.info.id,num,props.productList[0].id)
            Toast.success('添加成功')
        }
    }
    return <div className={styles.wrappopup}>
                    <div className={styles.content}>
                        <div className={styles.goodsSizeDo}>
                            <div className={styles.goodsSizeSetMsg}>
                                <div className={styles.gooodsSizePriceAndSize}>
                                    <div className={styles.imgs}>
                                        <img src={props.info.list_pic_url} alt=""/>
                                    </div>
                                    
                                    <div className={styles.lefsize}>
                                        <div>单价: <span>￥{props.info.retail_price}</span></div>
                                        <div>库存: <span>{props.info.goods_number}件</span></div>
                                        <div>已选择:</div>
                                    </div>
                                    <div className={styles.closeModel} onClick={()=>{
                                      isCartflageView()
                                    }}><p>X</p></div>
                                </div>
                                <div className={styles.goodsSizeItem}>
                                    <div className={styles.goodsSizeItemName}>数量</div>
                                    <div className={styles.goodsBuyCount}>
                                        <div className={styles.onePx_border}onClick={()=>{
                                           addnum('delete')
                                        }}>-</div>
                                        <div className={styles.onePx_border}>{num}</div>
                                        <div className={styles.onePx_border} onClick={()=>{
                                          addnum('add')
                                        }}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.goodsDoWrap}>
                            <div onClick={()=>{
                                addcartlist()
                            }}>加入购物车</div>
                            <div>立即下单</div>
                        </div>
                </div>
            </div>
}
const mapStateToProps = (state: any)=>{
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
       
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(withRouter(CartPageView))