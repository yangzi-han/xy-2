import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import styles from '../../style/index.module.scss'
import Banner from '../../components/Banner/banner'
import Swipercecae from '../../components/SwiperCon/swiper'
import CateGoryBox from '../../components/Contributor/contributor'

interface StateType{
    banner: Array<{
        image_url: string,
        img_url:string,
        [name:string]: string|number
    }>,
    topicList: Array<{
        item_pic_url:string
        [name:string]: string|number
    }>,
    channel: Array<{
        icon_url:string
        [name:string]: string|number
    }>,
    newGoodsList: Array<{
        list_pic_url: string
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        list_pic_url: string
        [name:string]: string|number
    }>,
    brandList: Array<{
        new_pic_url:string
        [name:string]: string|number
    }>,
    categoryList: Array<{
        goodsList:Array<{
            list_pic_url:string,
            [name:string]: string|number
        }>,
        [name:string]: string|number|Array<{}>
    }>
}

interface DispatchType{
    getBanner: Function
}

let TopicDetailPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getBanner()
    }, []);
    let addDetaile = (id:any) =>{
        props.history.push(`/goodsDetail/${id}`)
    }
    return <>
        <Banner banner = {props.banner} />
        <div className={styles.channelWrap}>
            {
                props.channel?props.channel.map(item=>{
                    return <div key={item.id} className={styles.channelItem}>
                        <img src={item.icon_url} alt=""/>
                        <div>{item.name}</div>
                    </div>
                }):''
            }
        </div>
        <div className={styles.brandBox}>
            <div className={styles.brandTitle}>品牌制造商直供</div>
            <div className={styles.brandWrap}>
                {
                    props.brandList?props.brandList.map(item=>{
                        return <div className={styles.brandItem} key={item.id}>
                            <div className={styles.brandItemName}>{item.name}</div>
                            <div className={styles.brandItemMinPrice}>{item.floor_price}元起</div>
                            <img className={styles.imgLazyload} src={item.new_pic_url} alt=""></img>
                        </div>
                    }):''
                }
            </div>
        </div>
        <div className={styles.newGoodsBox}>
            <div className={styles.newGoodsTitle}>新品首发</div>
            <div className={styles.newGoodsWrap}>
                {
                    props.newGoodsList?props.newGoodsList.map(item=>{
                        return <div onClick={()=>addDetaile(item.id)} className={styles.newGoodsItem} key={item.id}>
                            <img className={styles.imgLazyload} src={item.list_pic_url} alt=""/>
                            <div className={styles.newGoodsName}>{item.name}</div>
                            <div className={styles.newGoodsPrice}>￥{item.retail_price}</div>
                        </div>
                    }):''
                }
            </div>
        </div>
        <div className={styles.hotGoodsBox}>
            <div className={styles.hotGoodsTitle}>人气推荐</div>
            <div className={styles.hotGoodsWrap}>
                {
                    props.hotGoodsList?props.hotGoodsList.map(item=>{
                        return <div className={styles.hotGoodsItem} key={item.id}>
                            <img className={styles.imgLazyload} src={item.list_pic_url} alt=""/>
                            <div className={styles.hotGoodsInfos}>
                                <div className={styles.hotGoodsNamev}>{item.name}</div>
                                <div className={styles.hotGoodsInfo}>{item.goods_brief}</div>
                                <div className={styles.hotGoodsPrice}>￥{item.retail_price}</div>
                            </div>
                            
                        </div>
                    }):''
                }
            </div>
        </div>
        <div className={styles.topGoodsBox}>
            <div className={styles.topGoodsTitle}>专题精选</div>
            <Swipercecae topicList = {props.topicList} />
        </div>
        <div className={styles.cateGoryBox}>
        {
            props.categoryList?props.categoryList.map((item,index)=>{
                return <div key={index} className={styles.categorywary}>
                    <div className={styles.cateGoryName}>{item.name}</div>
                    <CateGoryBox goodsList={item.goodsList} name={item.name}/>
                </div>    
            }):''
        }
        
    </div>
    </>;
}

const mapStateToProps = (state: any)=>{
    console.log("首页",state.home)
    return state.home
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getBanner: ()=>{
            dispatch(bannerAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TopicDetailPage);