import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styles from './scss/detail/goodsDetail/detail.module.scss'
import { goodsDetailAction } from '../store/actions/type'
import { addCollectAction, deleteCollectAction } from '../store/actions/favor'
import { cartAction,addCartAction } from '../store/actions/cart'
import { Carousel, WingBlank, Toast } from 'antd-mobile'

interface DispatchProps {
    getGoods: Function,
    getAddCollect: Function,
    DeleteCollectList: Function,
    getCart: Function,
    getAddCart: Function
}

interface StateProps {
    info: {
        [name: string]: string | number
        goods_brief: string,
        retail_price: number,
        goods_desc: string,
        list_pic_url:string,
        goods_number:string,
        counter_price:number
    },
    gallery: Array<{
        img_url: string,
        [name: string]: string | number
    }>,
    attribute: Array<{
        value: string,
        name: string
    }>
    issue: Array<{
        question: string,
        answer: string
    }>,
    comment: Array<{
        count: number,
        content: string,
    }>,
    brand: Array<{
        name: string
    }>
    specificationList: Array<{
        name: string,
        valueList: Array<{
            [value: string]: string | number
        }>
    }>,
    productList: Array<{
        goods_number: number,
        retail_price: number
    }>,
    userHasCollect: number, //判断是否收藏
}

let GoodsDetailPage: React.FC<RouteComponentProps<{ id: string }> & DispatchProps & StateProps> = props => {
    let [id] = useState(props.match.params.id)
    // console.log('goods详情Id', id)
    let [isFlage, setisFlage] = useState(false)
    let [isShow, setisShow] = useState(false)
    useEffect(() => {
        props.getGoods(id);
    }, []);
    let favor = () => {
        // 收藏
        setisFlage(isFlage = !isFlage)
        if (isFlage == true) {
            props.getAddCollect(id)
            Toast.info("收藏成功");
        } else {
            props.DeleteCollectList(id)
            Toast.info("收藏失败");
        }
    }
    let goShop=()=>{
        // 下单
        console.log('下单',id,props.info.retail_price)
        props.getAddCart(id,1,props.info.retail_price)
        // console.log('下单成功', 1);
        props.getCart()
    }

    let add =()=>{
        props.info.counter_price = props.info.counter_price + 1
        console.log('jiajiajiaj',props.info.counter_price)
        props.getGoods(id);
    }
    let del =()=>{
        props.info.counter_price -= 1
        props.getGoods(id);
    }
    let back=()=>{
        props.history.go(-1)
    }

    return <div className={styles.goodsDetailPage}>
        <div className={styles.goodHeader}>
            <p> <span className={styles.left} onClick={back} >&lt;</span>{props.info && props.info.name}</p>
        </div>
        {/* 轮播图 */}
        <WingBlank style={{ margin: 0 }}>
            <Carousel
                autoplay={true}
                infinite
            >
                {
                    props.gallery ? props.gallery.map(item => {
                        return <div
                            key={item.id}
                            className={styles.swiperr}
                        >
                            <img src={item.img_url}
                                alt=""
                                style={{ verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            />
                        </div>
                    }) : ''
                }
            </Carousel>
        </WingBlank>
        <div className={styles.goodBlanktitle}>
            <li> <span>★</span> 30天无忧退货</li>
            <li> <span>★</span> 48小时快速退款</li>
            <li> <span>★</span> 30满88元免邮费</li>
        </div>
        {/* 商品信息 */}
        <div className={styles.goodsMsgWrap}>
            <div className={styles.goodsNameTitle}>{props.info && props.info.name}</div>
            <div className={styles.goodsNameSubTitle}>{props.info && props.info.goods_brief}</div>
            <div className={styles.goodsNamePrice}>￥{props.info && props.info.retail_price}</div>
        </div>
        {/* 商品规格 */}
        {/* <div className={styles.goodsSize}>
            <div></div>
            <div>x 0</div>
            <div>选择规格</div>
        </div> */}
        {/* 商品参数 */}
        <div className={styles.goodsAttribute}>
            <div className={styles.goodsAttributeLine}>—— 商品参数 ——</div>
            <div className={styles.goodsAttributeList}>
                {
                    props.attribute ? props.attribute.map((item, index) => {
                        return <div key={index} className={styles.goodsAttributeItem}>
                            <div className={styles.attributeLabel}>{item.name}</div>
                            <div className={styles.attributeContent}>{item.value}</div>
                        </div>
                    }) : ''
                }
            </div>
        </div>
        <div className={styles.goodsImg} dangerouslySetInnerHTML={{ __html: props.info && props.info.goods_desc }}></div>
        {/* 常见问题 */}
        <div className={styles.goodsAttribute}>
            <div className={styles.goodsAttributeLine}>—— 常见问题 ——</div>
            {
                props.issue ? props.issue.map((item, index) => {
                    return <div key={index} className={styles.problemWrap}>
                        <div className={styles.problemLabel}>
                            <span>√</span>{item.question}
                        </div>
                        <div className={styles.problemContent}>
                            {item.answer}
                        </div>
                    </div>
                }) : ''
            }
        </div>
        {/* 详情底部 */}
        <div className={styles.goodsPageDo}>
            <div className={isFlage || props.userHasCollect ? styles.Like : styles.isLike} onClick={() => { favor() }}>★</div>
            <div className={styles.cartNum}>
                <i className="iconfont icon-gouwuche"><span>0</span></i>
            </div>
            <div className={styles.addCart} onClick={() => { setisShow(isShow = !isShow) }}>加入购物车</div>
            <div className={styles.payGoods} onClick={()=>{goShop()}}>立即购买</div>
        </div>

        <div style={{ display: isShow ? '' : 'none' }} className={styles.amModalWrap} role="dialog">{/* amModalWrapPopup */}
            <div role="document" className={styles.amModal}>  {/*  amModalPopup amModalPopupSlideUp */}
                <div className={styles.amModalContent}>
                    <div className={styles.amModalBody}>
                        <div className={styles.goodsSizeDo}>
                            <div className={styles.goodsSizeSetMsg}>
                                <img src={props.info 
                                    && props.info.list_pic_url} alt=""/>
                                <div className={styles.gooodsSizePriceAndSize}>
                                <div>单价: <span>￥{props.info && props.info.retail_price}</span></div>
                                <div>库存: <span>{props.info && props.info.goods_number}件</span></div>
                                    <div>已选择:<br /></div></div>
                                <div className={styles.closeModel} onClick={() => { setisShow(isShow = false) }}> x </div>
                            </div>
                            <div className={styles.goodsSizeWrap}>
                                <div className={styles.goodsSizeItem}>
                                    <div className={styles.goodsSizeItemName}>数量</div>
                                    <div className={styles.goodsSizeListWrap}>
                                        <div className={styles.goodsBuyCount}>
                                            <div className={styles.onePx_border} onClick={()=>{del()}}>-</div>
                                            <div className={styles.onePx_border}>{props.info && props.info.counter_price}</div>
                                            <div className={styles.onePx_border} onClick={()=>{add()}}>+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.goodsDoWrap}>
                            <div className={styles.addCart}>加入购物车</div>
                            <div className={styles.payGoods} onClick={()=>{goShop()}}>立即下单</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

let mapStateToProps = (state: any) => {
    console.log('详情数据', state.type.classifyDetail)
    console.log('收藏数据', state.favor)
    return {
        ...state.type.classifyDetail,
    }
}
let mapDisptachToProps = (dispatch: Function) => {
    return {
        getGoods: (id: any) => {
            dispatch(goodsDetailAction(id))
        },
        getAddCollect: (valueId: string) => {
            dispatch(addCollectAction(valueId))
        },
        DeleteCollectList: (valueId: number) => {
            dispatch(deleteCollectAction(valueId))
        },
        getCart: () => {
            dispatch(cartAction())
        },
        getAddCart: (goodsId: string, number: string, productId: string) => {
            dispatch(addCartAction(goodsId,number,productId))
        },
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(GoodsDetailPage);