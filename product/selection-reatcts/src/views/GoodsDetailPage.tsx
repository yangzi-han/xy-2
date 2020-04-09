import React,{useState,useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {DetaileActions, DetlateActions, AddcollectActions} from '../store/actions/type'
import styles from '../style/index.module.scss'
import Banner from '../components/Banner/banner'
import {Toast} from 'antd-mobile'
import {AddCartAction} from '../store/actions/cart'
interface StateProps{
    userDetaileData:Function,
    getDetlate:Function,
    addCollect:Function,
        attribute:Array<{
            [name:string]: string|number
        }>,
        info:{
            is_on_sale:string
            goods_desc:string
            [name:string]: string|number
        },
        issue:Array<{
            [name:string]: string|number
        }>,
        productList:Array<{
            [name:string]: string|number
        }>,
    gallery:Array<{
        image_url:string,
        img_url:string,
        [name:string]: string|number
    }>,
    goodsList:Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>,
    addcart:Function
}

let GoodsDetailPage: React.FC<RouteComponentProps<{id:string}> & StateProps> = props=>{
    let [id] = useState(props.match.params.id)
    useEffect(()=>{
        props.userDetaileData(id)
        props.getDetlate(id)
    },[])
    let addcollect = ()=>{
        props.addCollect(id)
        Toast.success('收藏成功')
    }
    let addCart = () => {
        props.addcart(id,props.info.is_on_sale,props.productList[0].id)
        Toast.info('添加成功')
    }
    return <div className={styles.noTabPageContent}>
        <div className={styles.goodsPage}>
            <div className={styles.header}>
                <div className={styles.left} onClick={props.history.goBack}>{'<'}</div>
                <div className={styles.title}>{props.info?props.info.name:''}</div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.banner}>
                <Banner banner={props.gallery} />
            </div>
            <div className={styles.serviceList}>
                <p><span>★</span>30天无忧退货</p>
                <p><span>★</span>48小时快速退款</p>
                <p><span>★</span>满88元免邮费</p>
            </div>
            <div className={styles.goodsMsgWrap}>
                <div className={styles.goodsNameTitle}>{props.info?props.info.name:''}</div>
                <div className={styles.goodsNameSubTitle}>{props.info?props.info.goods_brief:''}</div>
                <div className={styles.goodsPriceTitle}>￥{props.info?props.info.retail_price:''}</div>
            </div>
            <div className={styles.goodsSize}>
                <div className={styles.sha}></div>
                <div className={styles.money}>X{props.info?props.info.unit_price:''}</div>
                <div className={styles.cla}>选择规格{'>'}</div>
            </div>
            <div className={styles.goodsAttribute}>
                <div className={styles.goodsAttributeLine}>——商品参数——</div>
                <div className={styles.goodsAttributeList}>
                    {
                        props.info?props.attribute.map((item,index)=>{
                            return <div key={index} className={styles.goodsAttributeItem}>
                                <div className={styles.attributeLabel}>{item.name}</div>
                                <div className={styles.attributeContent}>{item.value}</div>
                            </div>
                        }):''
                    }
                </div>
            </div>
            <div className={styles.topicDetailImg} dangerouslySetInnerHTML = {{__html:props.info?props.info.goods_desc:''}}></div>
            <div className={styles.goodsAttribute}>
                <div className={styles.goodsAttributeLine}>——常见问题——</div>
                    {
                        props.issue?props.issue.map(item=>{
                            return <div className={styles.problemWrap} key={item.id}>
                                <div className={styles.problemLabel}><span>√</span>{item.question}</div>
                                <div className={styles.problemContent}>{item.answer}</div>
                            </div>
                        }):''
                    }
            </div>
            <div className={styles.goodsAttribute}>
                <div className={styles.goodsAttributeLine}>——大家都在看——</div>
            </div>
            <div className={styles.goodsList}>
                {
                    props.goodsList?props.goodsList.map(item=>{
                        return <a key={item.id} className={styles.goodsItem}>
                            <div className={styles.goodsItemImg}>
                                <img src={item.list_pic_url} alt=""/>
                            </div>
                            <div className={styles.goodsItemName}>{item.name}</div>
                            <div className={styles.goodsItemPrice}>￥{item.retail_price}元</div>
                        </a>
                    }):''
                }
            </div>
            <div className={styles.goodsPageDo}>
                <div className={styles.isLike}>
                    <i className="iconfont icon-shoucang" onClick={()=>addcollect()}></i>
                </div>
                <div className={styles.cartNum}>
                    <i className="iconfont icon-gouwuche"></i>
                </div>
                <div className={styles.addCart} onClick={()=>addCart()}>添加购物车</div>
                <div className={styles.payGoods}>立即购买</div>
            </div>
        </div>
    </div>;
}
const mapStateToProps = (state: any)=>{
    console.log('GoodList....',state.type)    
    return {
        ...state.type
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        userDetaileData(id:string){
            dispatch(DetaileActions(id))
        },
        getDetlate(id:string){
            dispatch(DetlateActions(id))
        },
        addCollect(id:string){
            dispatch(AddcollectActions(id))
        },
        addcart(goodsId:string,number:string,productId:string){
            dispatch(AddCartAction(goodsId,number,productId))
        }
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(GoodsDetailPage);