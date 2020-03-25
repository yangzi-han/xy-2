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
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        [name:string]: string|number
    }>,
    brandList: Array<{
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