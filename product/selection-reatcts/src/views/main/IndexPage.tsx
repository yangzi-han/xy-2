import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import styles from '../../style/index.module.scss'
import Banner from '../../components/Banner/banner'

interface StateType{
    banner: Array<{
        image_url: string,
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
        [name:string]: string|number
    }>,
    brandList: Array<{
        new_pic_url:string
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
    useEffect(()=>{
        props.getBanner()
    }, []);

    return <>
        <Banner banner = {props.banner} />
        <div className={styles.channelWrap}>
            {
                props.channel?props.channel.map(item=>{
                    return <a href="" key={item.id} className={styles.channelItem}>
                        <img src={item.icon_url} alt=""/>
                        <div>{item.name}</div>
                    </a>
                }):''
            }
        </div>
        <div className={styles.brandBox}>
            <div className={styles.brandTitle}>品牌制造商直供</div>
            <div className={styles.brandWrap}>
                {
                    props.brandList?props.brandList.map(item=>{
                        return <a href="" className={styles.brandItem} key={item.id}>
                            <div className={styles.brandItemName}>{item.name}</div>
                            <div className={styles.brandItemMinPrice}>{item.floor_price}元起</div>
                            <img className={styles.imgLazyload} src={item.new_pic_url} alt=""></img>
                        </a>
                    }):''
                }
            </div>
        </div>
        <div className={styles.newGoodsBox}>
            <div className={styles.newGoodsTitle}>新品首发</div>
            <div className={styles.newGoodsWrap}>
                {
                    props.newGoodsList?props.newGoodsList.map(item=>{
                        return <a href="" className={styles.newGoodsItem} key={item.id}>
                            <img className={styles.imgLazyload} src={item.list_pic_url} alt=""/>
                            <div className={styles.newGoodsName}>{item.name}</div>
                            <div className={styles.newGoodsPrice}>{item.retail_price}</div>
                        </a>
                    }):''
                }
            </div>
        </div>
    </>;
}

const mapStateToProps = (state: any)=>{
    console.log(state.home,"1111111111111111111111111")
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