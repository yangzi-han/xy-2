//商品详情
import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {GoodsDetailAction} from '../store/actions/goodsdetail'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from '../scss/detail.module.scss'
interface DispatchType{
    goodlist:Function
}
interface ActionTYPE{
    goodsdetaillist:{
        info: {
            [name: string]: string | number
            goods_brief: string,
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
        }>
    }
}
let GoodsDetail: React.FC<RouteComponentProps<{id:string}>&DispatchType&ActionTYPE> = props=>{
   let id=props.history.location.pathname.split("/")[2]
    useEffect(()=>{
        props.goodlist(id)
        window.scrollTo(0,0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let back=()=>{
        props.history.go(-1)
    }
    return <div className={styles.goodsDetailPage}>
    <div className={styles.goodHeader}>
        <p><span className={styles.left} onClick={()=>back()}>&lt;</span>{props.goodsdetaillist.info && props.goodsdetaillist.info.name}</p>
    </div>
    {/* 轮播图 */}
    <WingBlank style={{ margin: 0 }}>
        <Carousel
            autoplay={true}
            infinite
        >
            {
                props.goodsdetaillist.gallery ?props.goodsdetaillist.gallery.map(item => {
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
        <div className={styles.goodsNameTitle}>{props.goodsdetaillist.info && props.goodsdetaillist.info.name}</div>
        <div className={styles.goodsNameSubTitle}>{props.goodsdetaillist.info &&props.goodsdetaillist.info.goods_brief}</div>
        <div className={styles.goodsNamePrice}>￥{props.goodsdetaillist.info && props.goodsdetaillist.info.retail_price}</div>
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
                props.goodsdetaillist.attribute ? props.goodsdetaillist.attribute.map((item, index) => {
                    return <div key={index} className={styles.goodsAttributeItem}>
                        <div className={styles.attributeLabel}>{item.name}</div>
                        <div className={styles.attributeContent}>{item.value}</div>
                    </div>
                }) : ''
            }
        </div>
    </div>
    {/* 常见问题 */}
    <div className={styles.goodsAttribute}>
        <div className={styles.goodsAttributeLine}>—— 常见问题 ——</div>
        {
            props.goodsdetaillist.issue ? props.goodsdetaillist.issue.map((item,index) => {
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

    <div className={styles.goodsPageDo}>
        <div className={styles.isLike}>☆</div>
        <div className={styles.cartNum}> <i className="iconfont icon-gouwuche" /> </div>
        <div className={styles.addCart}>加入购物车</div>
        <div className={styles.payGoods}>立即购买</div>
    </div>
</div>;
}
let  mapStateToProps=(state:any)=>{
    console.log(state.goodsdetail)
    return{
        goodsdetaillist:state.goodsdetail
    }

}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        goodlist:(id:string)=>{
            dispatch(GoodsDetailAction(id))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(GoodsDetail)