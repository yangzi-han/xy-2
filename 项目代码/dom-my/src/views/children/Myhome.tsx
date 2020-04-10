/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { bannerAction, channelAction, brandListAction, newGoodsListAction, hotGoodsListAction, topicListAction, categoryListAction } from '../../store/actions/home';
import {RouteComponentProps} from 'react-router'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from '../../static/home.module.scss'
import LazyLoad from 'react-lazyload';
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
        list_pic_url:string,
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>,
    brandList: Array<{
        pic_url:string
        [name:string]: string|number
    }>,
    topicList: Array<{
        item_pic_url:string,
        [name:string]: string|number
    }>,
    categoryList: Array<{
        list_pic_url:string,
        name:string,
        id:number,
        goodsList:Array<ItemType>
    }>
}
interface ItemType{
   id:number,
   name:string,
   list_pic_url:string,
   retail_price:string
}
interface DispatchType{
    getBanner: Function
    getChannel:Function
    getBrandList:Function
    getNewGoodsList:Function
    getHotGoodsList:Function
    getTopicList:Function
    getCategoryList:Function
}

let TopicDetailPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getBanner();
        props.getChannel();
        props.getBrandList();
        props.getNewGoodsList();
        props.getHotGoodsList();
        props.getTopicList();
        props.getCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let goDetail=(e:React.MouseEvent<HTMLDivElement>)=>{
      //监听事件的元素
       let id = e.currentTarget.dataset.id;
  //    console.log(id)
       props.history.push('/homeDetail/'+id)
    }
    let goGoodsDetail=(e:React.MouseEvent<HTMLDivElement>)=>{
      //监听事件的元素
       let id = e.currentTarget.dataset.id;
  //    console.log(id)
       props.history.push('/goodsDetail/'+id)
    }
    return <><div>
        <WingBlank style={{margin:0}}>
        <Carousel
          autoplay={true}
          infinite
        >
        {
            props.banner.map(item=>{
                return <LazyLoad key={item.id}>
                       <div
                          key={item.id}
                          style={{ display: 'inline-block', width: '100%', height:'200px'}}
                          >
                          <img 
                           src={item.image_url.replace('http:', '')} 
                           style={{ width: '100%', height:'200px' }}
                           onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            }}
                          />
                    </div> 
              </LazyLoad>
            })
        }
        </Carousel>
      </WingBlank>
        <div className={styles.conter}>
          {
              props.channel.map(item=>{
                 return <div key={item.id} className={styles.conterItem}>
               
                     <p>
                        <LazyLoad>
                        <img src={item.icon_url.replace('http:', '')} alt=""/>
                        </LazyLoad>
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
                   return <div key={item.id} className={styles.brandItem} onClick={goDetail} data-id={item.id}>
                      <div className={styles.brandName}>{item.name}</div>
                      <div className={styles.brandPrice}>
                        {item.floor_price}
                        元起
                      </div>
                      <LazyLoad>
                        <img src={item.pic_url.replace('http:', '')} alt="" className={styles.brandImg}/>
                      </LazyLoad>
                   </div>
               })
            }
          </div>
        </div>
        <div className={styles.goodsList}>
          <div className={styles.goodsText}>
             新品首发
          </div>
          <div className={styles.goodsItem}>
            {
                props.newGoodsList.map(item=>{
                    return <div key={item.id} className={styles.goodsTitle} onClick={goGoodsDetail} data-id={item.id}>
                      <LazyLoad>
                      <img src={item.list_pic_url.replace('http:', '')} alt=""/>
                      </LazyLoad>
                      <div className={styles.goodsName}>{item.name}</div>
                      <div className={styles.goodsPrice}>
                        $
                        {item.retail_price}
                      </div>
                    </div>
                })
            }
          </div>
        </div>
        <div className={styles.hotList}>
          <div className={styles.hotText}>人气推荐</div>
          <div className={styles.hotItem}>
            {
              props.hotGoodsList.map(item=>{
                 return <div key={item.id} className={styles.hotTitle} onClick={goGoodsDetail} data-id={item.id}>
                    <LazyLoad>
                        <img src={item.list_pic_url.replace('http:', '')} alt=""/>
                    </LazyLoad>
                  
                    <div className={styles.hotRight}>
                      <div className={styles.hotName}>{item.name}</div>
                      <div className={styles.hotBrief}>{item.goods_brief}</div>
                      <div className={styles.hotPrice}>
                        $
                        {item.retail_price}
                      </div>
                    </div>
                 </div>
              })
            }
          </div>
        </div>
        <div className={styles.topicList}>
          <div className={styles.topicText}>专题精选</div>
          <div className={styles.topicItem}>
          <WingBlank>
        <Carousel className={styles.space_carousel}
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
        >
          {props.topicList.map((item) => (
             <LazyLoad key={item.id}>
                  <a  href=" "
            >
              <img
                src={item.item_pic_url.replace('http:', '')}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </a>
             </LazyLoad>
          ))}
        </Carousel>
      </WingBlank>
           {/* {
             props.topicList.map(item=>{
                return <div key={item.id} className={styles.topicTitle}>
                   
                </div>
             })
           } */}
          </div>
        </div>
        <div className={styles.cateList}>
          {
             props.categoryList.map(item=>{
                return <div key={item.id} className={styles.cateTitle}>
                   <div className={styles.cateText}>{item.name}</div>
                   <div className={styles.cateItem}>
                     { 
                       item.goodsList.map(item=>{
                          return <div className={styles.goodsItems}>
                              <div className={styles.goodsItemImg}>
                              <LazyLoad><img src={item.list_pic_url.replace('http:', '')} alt=""/></LazyLoad>
                              </div>
                              <div className={styles.goodsItemName}>
                                {item.name}
                              </div>
                              <div className={styles.goodsItemPrice}>
                              ￥
                              {item.retail_price}
                              </div>
                          </div>
                       })
                     }
                   </div>
                </div>
             })
          }
        </div>
        </div></>;
}

const mapStateToProps = (state: any)=>{
    console.log(state.home.categoryList)
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
        },
        getNewGoodsList:()=>{
            dispatch(newGoodsListAction())
        },
        getHotGoodsList:()=>{
           dispatch(hotGoodsListAction())
        },
        getTopicList:()=>{
           dispatch(topicListAction())
        },
        getCategoryList:()=>{
          dispatch(categoryListAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TopicDetailPage);