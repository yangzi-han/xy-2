/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bannerAction } from '../../store/actions/home'
import { RouteComponentProps } from 'react-router'
import { Carousel, WingBlank } from 'antd-mobile';
import styles from '../../scss/home.module.scss'
interface StateType {
    banner: Array<{
        image_url: string,
        [name: string]: string | number
    }>,
    channel: Array<{
        icon_url: string,
        [name: string]: string | number
    }>,
    newGoodsList: Array<{
        list_pic_url: string,
        retail_price: number,
        [name: string]: string | number
    }>,
    hotGoodsList: Array<{
        list_pic_url: string,
        retail_price: number,
        goods_brief: string,
        [name: string]: string | number
    }>,
    brandList: Array<{
        new_pic_url: string,
        [name: string]: string | number
    }>,
    topicList: Array<{
        item_pic_url: string,
        price_info: string,
        [name: string]: string | number
    }>,
    categoryList: Array<{
        id:number,
        name: string,
        goodsList: goodlist[]
    }>,

}

interface DispatchType {
    getBanner: Function
}
interface goodlist {
    [name: string]: string | number,
    list_pic_url: string,
    retail_price: number,
    id:number
}



let IndexPage: React.FC<StateType & DispatchType & RouteComponentProps> = props => {

    useEffect(() => {
        props.getBanner();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <WingBlank style={{ margin: 0 }}>
            <Carousel
                autoplay={true}
                infinite
            >
                {
                    props.banner.map((item) => {
                        return <div
                            key={item.id}
                            style={{ display: 'inline-block', width: '100%', height: '200px' }}
                        >
                            <img
                                src={item.image_url}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '200px' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                }}

                            />
                        </div>
                    })
                }
            </Carousel>
        </WingBlank>
        <div className={styles.channel}>
            {
                props.channel.map(item => {
                    return <div key={item.id}>
                        <i><img src={item.icon_url} alt="" className={styles.icon} /></i>
                        <p>{item.name}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.brandList}>
            <div className={styles.top}>品牌制造商直供</div>
            <div className={styles.wrap}>
                {
                    props.brandList.map(item => {
                        return <div key={item.id} className={styles.brandcenter}>
                            <img src={item.new_pic_url} alt="" />
                            <div className={styles.brandwithin}>
                                <p>{item.name}</p>
                                <p>{item.floor_price}</p>
                            </div>
                        </div>
                    })
                }</div>
        </div>
        <div className={styles.newgoods}>
            <div className={styles.newgood}>新品首发</div>
            <div className={styles.new}>
                {
                    props.newGoodsList.map(item => {
                        return <div key={item.id} className={styles.newgoodscenter} >
                            <img src={item.list_pic_url} alt="" />
                            <p>{item.name}</p>
                            <p>￥{item.retail_price}</p>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={styles.hotGoodsList}>
            <div className={styles.hot}>人气推荐</div>
            <div className={styles.hotcenter}>
                {
                    props.hotGoodsList.map(item => {
                        return <div className={styles.hotGood} key={item.id}>
                            <div className={styles.left}>
                                <img src={item.list_pic_url} alt="" />
                            </div>
                            <div className={styles.right}>
                                <p className={styles.hotp}>{item.name}</p>
                                <p className={styles.hotp}>{item.goods_brief}</p>
                                <p className={styles.hotp}>￥{item.retail_price}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <div className={styles.topicList}>
            <div className={styles.topicListtop}>专题精选</div>
            <div className={styles.topicListcenter}>
                <Carousel className="space-carouesl"
                    frameOverflow="hidden"
                    cellSpacing={10}
                    slideWidth={0.8}
                    infinite
                    dots={false}
                >
                    {

                        props.topicList.map((item) => {
                            return <div className={styles.topicListcentertop} key={item.id}>
                                <div className={styles.topicimg}>
                                    <img src={item.item_pic_url} alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                        }}
                                    />
                                </div>

                                <div className={styles.topictext}>{item.title}<span className={styles.active}>￥{item.price_info}</span></div>
                                <div>{item.subtitle}</div>
                            </div>
                        })
                    }
                </Carousel>
            </div>

        </div>
        <div className={styles.categoryList}>
            {
                props.categoryList.map(item => {
                    return <div key={item.id}>
                        <div className={styles.categoryListtop}>{item.name}</div>
                        <div className={styles.categoryListcenter}>
                        {
                            item.goodsList.map(item => {
                                return <div className={styles.categoryListcenteritem} key={item.id}>
                                    <div className={styles.categoryListimg}><img src={item.list_pic_url} alt="" /></div>
                                    <div>{item.name}</div>
                                    <div>{item.retail_price}</div>
                                    </div>
                                
                            })

                        }
                        </div>
                    </div>
                })
            }
        </div>
    </>;
}

const mapStateToProps = (state: any) => {
    return state.home
}
const mapDisptachToProps = (dispatch: Function) => {
    return {
        getBanner: () => {
            dispatch(bannerAction())
        }
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(IndexPage);