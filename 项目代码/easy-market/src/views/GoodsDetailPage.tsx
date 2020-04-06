import React, { useEffect, useState } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {Toast} from 'antd-mobile'
import {GoodsDetailListAction,GoodsRelatedAction,AddCollectListAction,DeleteCollectListAction} from '../store/actions/classify'
import styles from '../style/index.module.scss'
import Swiper from '../component/swiper/swiper'
import CateGoryBox from '../component/cateGoryBox/index'
interface StateTypes{
    info:{
        goods_desc:string,
        [name:string]:string|number
    },//商品详情
    gallery:Array<{
        image_url:string,
        img_url: string,
        [name:string]:string|number
    }>,///商品详情轮播图
    attribute:Array<{
        [name:string]:string|number
    }>,//商品规格
    issue:Array<{
        [name:string]:string|number
    }>,//快递评论
    comment:{
        [name:string]:string|number
    },//商品数量
    GoodsRelatedList:Array<{
        [name:string]:string|number
    }>,//相关商品
    userHasCollect:number,//是否收藏
}
interface DispatchType{
    GoodsDetailList:Function,
    GoodsRelated:Function,
    AddCollectList:Function,
    DeleteCollectList:Function
}
let GoodsDetailPage: React.FC<DispatchType&StateTypes&RouteComponentProps<{id:string}>> = props=>{
    let [isFlage,setisFlage]=useState(false)
    useEffect(()=>{
        props.GoodsDetailList(props.match.params.id)
        props.GoodsRelated(props.match.params.id)
    },[])
    let addfover=()=>{
       
        
        if(isFlage===false){
            setisFlage(isFlage=!isFlage)
            props.AddCollectList(props.match.params.id)
            Toast.success('收藏成功', 1);
        }else if(isFlage===true){
            setisFlage(isFlage=!isFlage)
            props.DeleteCollectList(+props.match.params.id)
            Toast.success('取消收藏', 1);
        }
        
    }
    return <div className={styles.goodsdetail}>
         <div className={styles.header}>
            <p onClick={props.history.goBack}><i className="iconfont icon-icon-test"></i></p>
            <p>{props.info.name}</p>
            <p></p>
        </div>
        <div className={styles.Swipreimg}>
            <Swiper banner={props.gallery}/>
        </div>
        
        <div className={styles.serviceList}>
            <li><span>★</span>30天无忧退货</li>
            <li><span>★</span>48小时快速退款</li>
            <li><span>★</span>满88元免邮费</li>
        </div>
        <div className={styles.goodsMsgWrap}>
            <div className={styles.goodsNameTitle}>{props.info.name}</div>
            <div className={styles.goodsNameSubTitle}>{props.info.goods_brief}</div>
            <div className={styles.goodsPriceTitle}>￥{props.info.retail_price}</div>
        </div>
        <div className={styles.goodsAttribute}>
            <div className={styles.goodsAttributeLine}>—— 商品参数 ——</div>
            {
                props.attribute.map((item,index)=>{
                    return <div key={index} className={styles.goodsAttributeList}>
                        <div className={styles.goodsAttributeItem}>
                            <div className={styles.attributeLabel}>{item.name}</div>
                            <div className={styles.attributeContent}>{item.value}</div>
                        </div>
                    </div>
                })
            }
        </div>
        <div className={styles.topicDetailImg} dangerouslySetInnerHTML = {{__html:props.info.goods_desc}}></div>
        <div className={styles.goodsAttribute}>
            <div className={styles.goodsAttributeLine}>—— 常见问题 ——</div>
            {
                props.issue.map(item=>{
                    return <div className={styles.problemWrap} key={item.id}>
                        <div className={styles.problemLabel}><span>√</span>{item.question}</div>
                        <div className={styles.problemContent}>{item.answer}</div>
                    </div>
                })
            }
        </div>
        <div>
            <div className={styles.goodsAttributeLine}>—— 大家都在看 ——</div>
            <CateGoryBox goodsList={props.GoodsRelatedList} 
            name={'商品'} 
            />
        </div>
        <div className={styles.goodsPageDo}>
            <div className={isFlage||props.userHasCollect?styles.Like:styles.isLike}onClick={()=>{addfover()}}>★</div>
        <div className={styles.cartNum}><i className="iconfont icon-gouwuche"><span>{props.comment.count}</span></i></div>
            <div className={styles.addCart}>加入购物车</div><div className={styles.payGoods}>立即购买</div>
        </div>
    </div>;
}
const mapStateToProps = (state: any)=>{
    console.log('state.classify...', state.classify)
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        GoodsDetailList:(id:string)=>{
            dispatch(GoodsDetailListAction(id))
        },
        GoodsRelated:(id:string)=>{
            dispatch(GoodsRelatedAction(id))
        },
        AddCollectList:(valueId:string)=>{
            dispatch(AddCollectListAction(valueId))
        },
        DeleteCollectList:(valueId:number)=>{
            dispatch(DeleteCollectListAction(valueId))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(GoodsDetailPage)