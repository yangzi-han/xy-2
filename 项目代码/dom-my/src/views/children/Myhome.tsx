/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction,channelAction,brandListAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from '../../static/home.module.scss'
// import { getChannel, getNewGoodsList, getBrandList } from '../../api/home';
interface StateType{
    banner: Array<{
        image_url: string,
        [name:string]: string|number
    }>,
    channel: Array<{
        icon_url: string,
        [name:string]: string|number
    }>,
    newGoodsList: Array<{
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        [name:string]: string|number
    }>,
    brandList: Array<{
        pic_url:string
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
    getChannel:Function
    getBrandList:Function
}

let TopicDetailPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getBanner();
        props.getChannel();
        props.getBrandList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <><div>
        <WingBlank style={{margin:0}}>
        <Carousel
          autoplay={true}
          infinite
        >
        {
            props.banner.map(item=>{
                return <div
                  key={item.id}
                  style={{ display: 'inline-block', width: '100%', height:'200px'}}
                >
                  <img 
                   src={item.image_url} 
                   style={{ width: '100%', height:'200px' }}
                   onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </div> 
            })
        }
        </Carousel>
      </WingBlank>
        <div className={styles.conter}>
          {
              props.channel.map(item=>{
                 return <div key={item.id} className={styles.conterItem}>
                     <p>
                        <img src={item.icon_url} alt=""/>
                     </p>
                     <p>
                       {item.name}  
                     </p>
                 </div>
              })
          }
        </div>
        <div className={styles.ListWrap}>
          <div className={styles.ListText}>
            品牌制造商直供
          </div>
          <div className={styles.ListItem}>
            {
               props.brandList.map(item=>{
                   return <div key={item.id} className={styles.brandItem}>
                      <div className={styles.brandName}>{item.name}</div>
                      <div className={styles.brandPrice}>
                        {item.floor_price}
                        元起
                      </div>
                      <img src={item.pic_url} alt="" className={styles.brandImg}/>
                   </div>
               })
            }
          </div>
        </div>
        </div></>;
}

const mapStateToProps = (state: any)=>{
    console.log(state.home)
    return state.home
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getBanner: ()=>{
            dispatch(bannerAction())
        },
        getChannel:()=>{
            dispatch(channelAction())
        },
        getBrandList:()=>{
            dispatch(brandListAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TopicDetailPage);