import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import Swiper from '../../component/swiper/swiper'
import styles from '../style/index.module.scss'
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
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        [name:string]: string|number
    }>,
    brandList: Array<{
        pic_url:string,
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

    return <>
        <Swiper banner={props.banner}/>
        <div className={styles.channelWrap}>
            {
                props.channel?props.channel.map((item)=>{
                    return <div key={item.id} className={styles.channelItem}>
                        <img src={item.icon_url} alt=""/>
                        <p>{item.name}</p>
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
                            <img src={item.pic_url} alt=""/>
                        </div>
                    }):''
                }
                
            </div>
        </div>
    </>;
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