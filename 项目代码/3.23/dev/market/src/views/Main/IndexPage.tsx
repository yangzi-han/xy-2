
import styles from '../../scss/home.module.scss'
import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import '../../../node_modules/swiper/css/swiper.min.css'
import  Swiper from 'swiper'
interface StateType{
    banner: Array<{
        image_url: string,
        [name:string]: string|number
    }>,
    channel: Array<{
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

let IndexPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(()=>{
         new Swiper ('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
          })
    },[])
        
    return <>
        <div className={styles.swiperContainer}>
            <div className="swiper-wrapper">
        {
        props.banner.map(item=>{
            return <div className="swiper-slide" key={item.id}><img src={item.image_url} alt=""/></div>
        })
    }
     <div className="swiper-pagination"></div>
        </div>
        </div>
    </>;
}

const mapStateToProps = (state: any)=>{
    return state.home
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getBanner: ()=>{
            dispatch(bannerAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(IndexPage);