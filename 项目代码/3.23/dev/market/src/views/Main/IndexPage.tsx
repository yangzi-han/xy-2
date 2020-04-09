import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import Swiper from '../../component/swiper/swiper'
import styles from '../../style/index.module.scss'
import SwiperCarousel from '../../component/swiperCarousel/carousel'
import CateGoryBox from '../../component/cateGoryBox/index'
interface StateType{
    banner: Array<{
        image_url: string,
        img_url: string,
        [name:string]: string|number
    }>,
    channel: Array<{
        icon_url:string,
        [name:string]: string|number
    }>,
    newGoodsList: Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>,
    brandList: Array<{
        new_pic_url:string,
        [name:string]: string|number
    }>,
    topicList: Array<{
        item_pic_url:string,
        [name:string]: string|number
    }>,
    categoryList: Array<{
        goodsList:Array<{
            list_pic_url:string,
            [name:string]: string|number
        }>,
        [name:string]: string|number|Array<{}>
    }>,
    
}
interface DispatchType{
    getBanner: Function,
}

let TopicDetailPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    // console.log('props----',props)
    useEffect(()=>{
        props.getBanner();
    }, []);
    let goclassify=(id:any)=>{
        // console.log(id)
        props.history.push('/categorys/'+id)
    }
    
    return <div className={styles.homewrap}>
        <Swiper banner={props.banner}/>
        <div className={styles.channelWrap}>
            {
                props.channel.map((item)=>{
                    return <div key={item.id} onClick={()=>{
                        goclassify(item.id)
                    }} className={styles.channelItem}>
                        <img src={item.icon_url} alt=""/>
                        <p>{item.name}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.brandBox}>
            <div className={styles.brandTitle}>品牌制造商直供</div>
            <div className={styles.brandWrap}>
                {
                   props.brandList.map(item=>{
                        return <div className={styles.brandItem} key={item.id}>
                            <div className={styles.brandItemName}>{item.name}</div>
                            <div className={styles.brandItemMinPrice}>{item.floor_price}元起</div>
                            <img src={item.new_pic_url} alt=""/>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={styles.newGoodsBox}>
            <div className={styles.newGoodsTitle}>新品首发</div>
            <div className={styles.newGoodsWrap}>
                {
                    props.newGoodsList.map(item=>{
                        return <div className={styles.newGoodsItem} key={item.id}>
                            <img src={item.list_pic_url} alt=""/>
                            <div className={styles.newGoodsName}>{item.name}</div>
                            <div className={styles.newGoodsPrice}>￥{item.retail_price}</div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={styles.hotGoodsBox}>
            <div className={styles.hotGoodsTitle}>人气推荐</div>
            <div className={styles.hotGoodsWrap}>
                {
                    props.hotGoodsList.map(item=>{
                        return <div className={styles.hotGoodsItem} key={item.id}>
                            <img src={item.list_pic_url} alt=""/>
                            <div className={styles.hotGoodsInfos}>
                                <p className={styles.hotGoodsName}>{item.name}</p>
                                <p className={styles.hotGoodsInfo}>{item.goods_brief}</p>
                                <p className={styles.hotGoodsPrice}>￥{item.retail_price}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div  className={styles.topGoodsBox}>
            <div className={styles.topGoodsTitle}>专题精选</div>
            <SwiperCarousel topicList={props.topicList}/>
        </div>
        <div className={styles.cateGoryBox}>
        {
            props.categoryList.map((item,index)=>{
                return <div key={index} className={styles.categorywary}>
                    <div className={styles.cateGoryName}>{item.name}</div>
                    <CateGoryBox goodsList={item.goodsList} 
                    name={item.name}
                   />
                    
                </div>    
            })
        }
        
    </div>
        
    </div>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.home...', state.home)
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