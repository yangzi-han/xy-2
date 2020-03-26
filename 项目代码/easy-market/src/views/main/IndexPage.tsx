import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import Swiper from '../../component/swiper/swiper'
import styles from '../../style/index.module.scss'
interface StateType{
    banner: Array<{
        image_url: string,
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
        [name:string]: string|number
    }>,
    brandList: Array<{
        new_pic_url:string,
        [name:string]: string|number
    }>,
    topicList: Array<{
        [name:string]: string|number
    }>,
    categoryList: Array<{
        [name:string]: string|number
    }>
}
interface DispatchType{
    getBanner: Function
}

let TopicDetailPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    console.log('props----',props)
    useEffect(()=>{
        props.getBanner();
    }, []);

    return <div className={styles.homewrap}>
        <Swiper banner={props.banner}/>
        <div className={styles.channelWrap}>
            {
                props.channel.map((item)=>{
                    return <div key={item.id} className={styles.channelItem}>
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
    </div>;
}

const mapStateToProps = (state: any)=>{
    console.log('state.home...', state.home)
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