import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styles from '../scss/cart/cart.module.scss'
import { cartAction ,deleteCartAction} from '../../store/actions/cart'
import { SwipeAction, List } from 'antd-mobile';

interface DispatchType {
    getCart: Function,
    delete:Function
}

interface StateType {
    cartList: Array<{
        goods_id: number,
        goods_name: string,
        list_pic_url: string,
        number: string,
        retail_price: number,
        product_id:string
    }>,
    cartTotal: Array<{
        goodsCount: number,
        goodsAmount: number,
        checkedGoodsCount: number,
        checkedGoodsAmount: number
    }>
}

let CartPage: React.FC<StateType & DispatchType & RouteComponentProps> = props => {
    let [is_default, setis_default] = useState(false) //是否默认地址
    useEffect(() => {
        props.getCart()
    }, [])

    let goDetail = (id: any) => {
        props.history.push('/goodsDetail/' + id)
    }

    let check = () => {
        setis_default(is_default = !is_default)
    }
    let checkAll = () => {
        setis_default(is_default = !is_default)
    }

    return <div className={styles.cartPage}>
        <div className={styles.serviceList}>
            <li><span>★</span>30天无忧退货</li>
            <li><span>★</span>48小时快速退款</li>
            <li><span>★</span>满88元免邮费</li>
        </div>
        <div className={styles.cartList}>
            {
                props.cartList ? props.cartList.map((item, index) => {
                    return <SwipeAction
                        key={item.goods_id}
                        style={{ backgroundColor: 'gray', width: '100%' }}
                        autoClose
                        right={[
                            {
                                text: '删除',
                                onPress: () => {
                                    console.log("item",item)
                                    props.delete(`${item.product_id}`)
                                    window.history.go(0)
                                },
                                style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                        ]}  // onOpen={() => console.log('global open')}onClose={() => console.log('global close')}
                    >
                        <List.Item
                            style={{ padding: 0 }}
                            onClick={e => console.log(e)}
                        >
                            <div key={index} className={styles.cartGoodsItem}>
                                <div className={styles.isCheckItem} onClick={() => { check() }}>
                                    <img style={{ display: is_default ? 'none' : '' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                            UgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMz
                            MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+K
                            UEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhzt
                            DIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V0
                            6YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4Po
                            YwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbB
                            Z9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"></img>

                                    <img style={{ display: is_default ? '' : 'none' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                            UgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyu
                            rKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEo
                            MgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEp
                            nCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJ
                            UQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSTh
                            PkNi75AAAAABJRU5ErkJggg==" alt="check"></img>
                                </div>
                                <div className={styles.goodsImg} onClick={() => { goDetail(item.goods_id) }}>
                                    <img src={item.list_pic_url} alt="" />
                                </div>
                                <div className={styles.cartGoodsMsg}>
                                    <div className={styles.ItemName}>{item.goods_name}</div>
                                    <div style={{ color: 'red' }}>￥{item.retail_price}</div>
                                </div>
                                <div className={styles.cartGoodsNum}>x{item.number}</div>
                            </div>
                        </List.Item>
                    </SwipeAction>
                }) : ''
            }
        </div>

        <div className={styles.cartGoodsDo}>
            <div className={styles.isCheckItem} onClick={() => { checkAll() }}>
                <img style={{ display: is_default ? 'none' : '' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                UgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMz
                MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+K
                UEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhzt
                DIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V0
                6YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4Po
                YwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbB
                Z9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"></img>

                <img style={{ display: is_default ? '' : 'none' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                UgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyu
                rKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEo
                MgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEp
                nCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJ
                UQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSTh
                PkNi75AAAAABJRU5ErkJggg==" alt="check"></img>
            </div>
            <div className={styles.cartMsgAll}>已选(0)  ￥0</div>
            <div className={styles.cartAllDoButton}>编辑</div>
            <div className={styles.cartAllDoButtonPay}>下单</div>
        </div>
    </div>;
}

const mapStateToProps = (state: any) => {
    console.log('购物车', state.cart)
    return { ...state.cart }
}
const mapDisptachToProps = (dispatch: Function) => {
    return {
        getCart: () => {
            dispatch(cartAction())
        },
        delete:(id:string)=>{
            dispatch(deleteCartAction(id))
        }

    }
}

export default connect(mapStateToProps, mapDisptachToProps)(CartPage);
