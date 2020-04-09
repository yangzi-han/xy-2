import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bannerAction } from '../../store/actions/homes'
import { RouteComponentProps } from 'react-router'
import styles from '../scss/home/home.module.scss'
import { Carousel, WingBlank } from 'antd-mobile';
// import { NavLink } from 'react-router-dom'

interface StateType {
    banner: Array<{
        image_url: string,
        [name: string]: string | number
    }>,
    channel: Array<{
        icon_url: string,
        [name: string]: string | number
    }>,
    brandList: Array<{
        id: number,
        [name: string]: string | number
        new_pic_url: string,
        floor_price: number
    }>,
    newGoodsList: Array<{
        list_pic_url: string,
        retail_price: number,
        [name: string]: string | number
    }>,
    hotGoodsList: Array<{
        [name: string]: string | number,
        list_pic_url: string,
        retail_price: number,
        goods_brief: string
    }>,
    topicList: Array<{
        [title: string]: string | number,
        item_pic_url: string,
        subtitle: string,
        price_info: number
    }>,
    categoryList: Array<{
        [name: string]: string | number | Array<{}>,
        goodsList: Array<{
            [name: string]: string | number,
            list_pic_url: string,
            retail_price: number
        }>
    }>
}

interface DispatchType {
    getBanner: Function
}

let IndexPage: React.FC<StateType & DispatchType & RouteComponentProps> = props => {
    useEffect(() => {
        props.getBanner();
    }, []);

    console.log('props查找路由信息', props)

    let brandDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        props.history.push('/brandDetail/' + id)
    }

    let shopDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        props.history.push('/goodsDetail/' + id)
    }

    let goClassify = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        props.history.push('/classifypage/' + id)
    }

    return <div className={styles.home}>
        {/* 轮播图 */}
        <WingBlank style={{ margin: 0 }}>
            <Carousel
                autoplay={true}
                infinite
            >
                {
                    props.banner.map(item => {
                        return <div
                            key={item.id}
                            className={styles.swiperr}
                        >
                            <img
                                src={item.image_url}
                                alt=""
                                style={{ verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    // this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </div>
                    })
                }
            </Carousel>
        </WingBlank>
        {/* 恒选 */}
        <div className={styles.channelWrap}>
            {
                props.channel ? props.channel.map(item => {
                    return <div key={item.id} onClick={goClassify} data-id={item.id}>
                        <img src={item.icon_url} alt="" />
                        <p>{item.name}</p>
                    </div>
                }) : ''
            }
        </div>
        {/* 品牌制造商直供 */}
        <div className={styles.brandBox}>
            <div className={styles.brandTitle}>品牌制造商直供</div>
            <div className={styles.brandWrap}>
                {
                    props.brandList ? props.brandList.map(item => {
                        return <div key={item.id} className={styles.brandItem} onClick={brandDetail} data-id={item.id}>
                            <img src={item.new_pic_url} alt="" />
                            <div className={styles.brandItemName}>{item.name}</div>
                            <div className={styles.brandItemMinPrice}>{item.floor_price}元起</div>
                        </div>
                    }) : ""
                }
            </div>
        </div>
        {/* 新品首发 */}
        <div className={styles.newGoodsBox}>
            <div className={styles.newGoodsTitle}>新品首发</div>
            <div className={styles.newGoodsWrap}>
                {
                    props.newGoodsList ? props.newGoodsList.map(item => {
                        return <div key={item.id} className={styles.newGoodsItem} onClick={shopDetail} data-id={item.id}>
                            <img src={item.list_pic_url} alt="" />
                            <div className={styles.newGoodsItemName}>{item.name}</div>
                            <div className={styles.newGoodsItemMinPrice}>￥{item.retail_price}</div>
                        </div>
                    }) : ""
                }
            </div>
        </div>
        {/* 人气推荐 */}
        <div className={styles.hotGoodsBox}>
            <div className={styles.hotGoodsTitle}>人气推荐</div>
            <div className={styles.hotGoodsWrap}>
                {
                    props.hotGoodsList ? props.hotGoodsList.map(item => {
                        return <div key={item.id} className={styles.hotGoodsItem} onClick={shopDetail} data-id={item.id}>
                            <img src={item.list_pic_url} alt="" />
                            <div className={styles.hotGoodsInfos}>
                                <div className={styles.hotGoodsItemName}>{item.name}</div>
                                <div className={styles.hotGoodsItemInfo}>{item.goods_brief}</div>
                                <div className={styles.hotGoodsItemMinPrice}>￥{item.retail_price}</div>
                            </div>
                        </div>
                    }) : ""
                }
            </div>
        </div>
        {/* 专题精选 */}
        <div className={styles.topGoodsBox}>
            <div className={styles.topGoodsTitle}>专题精选</div>
            <div className={styles.topGoodsWrap}>
                <WingBlank style={{ margin: 0 }}>
                    <Carousel
                        infinite
                        dots={false}
                        // style={{ width: '90%', }}
                    >
                        {

                            props.topicList ? props.topicList.map(item => {
                                return <div
                                    key={item.id}
                                    className={styles.topGoodsItem}
                                    style={{
                                        display: 'block',
                                        padding: '0 10px',
                                        // position: 'relative',
                                        // top: this.state.slideIndex === index ? -10 : 0,
                                        // height: this.state.imgHeight,
                                        // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <img
                                        src={item.item_pic_url}
                                        alt=""
                                        style={{ width: '95%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                        }}
                                    />
                                    <div className={styles.topGoodsItemTitle}>
                                        {item.title}
                                        <span className={styles.topGoodsItemPrice}>￥{item.price_info}元起</span>
                                    </div>
                                    <div className={styles.topGoodsItemSubTitle}>{item.subtitle}</div>
                                </div>
                            }) : ''
                        }
                    </Carousel>
                </WingBlank>
                {/* <WingBlank>
                    <Carousel className={styles.spaceCarousel}
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.9}
                        infinite
                        dots={false}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => this.setState({ slideIndex: index })}
                    >
                        {

                            props.topicList ? props.topicList.map(item => {
                                return <div
                                    key={item.id}
                                    className={styles.topGoodsItem}
                                    style={{
                                        display: 'block',
                                        // position: 'relative',
                                        // top: this.state.slideIndex === index ? -10 : 0,
                                        // height: this.state.imgHeight,
                                        // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <img
                                        src={item.item_pic_url}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                        }}
                                    />
                                    <div className={styles.topGoodsItemTitle}>
                                        {item.title}
                                        <span className={styles.topGoodsItemPrice}>￥{item.price_info}元起</span>
                                    </div>
                                    <div className={styles.topGoodsItemSubTitle}>{item.subtitle}</div>
                                </div>
                            }) : ''
                        }
                    </Carousel>
                </WingBlank> */}
            </div>
        </div>
        {/* 商品数据 */}
        <div className={styles.cateGoryBox}>
            {
                props.categoryList ? props.categoryList.map((item, index) => {
                    return <div key={index} className={styles.cateGoryWrap}>
                        <div className={styles.cateGoryTitle}>{item.name}</div>
                        <div className={styles.GoryGoodsWrap}>
                            {
                                item.goodsList.map(items => {
                                    return <div key={items.id} className={styles.GoryGoodsItem} onClick={shopDetail} data-id={items.id}>
                                        <img src={items.list_pic_url} alt="" />
                                        <div className={styles.GoryGoodsItemName}>{items.name}</div>
                                        <div className={styles.GoryGoodsItemPrice}>￥{items.retail_price}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }) : ''
            }

        </div>
    </div >
}

let mapStateToProps = (state: any) => {
    console.log('首页数据', state.home)
    return state.home
}
let mapDisptachToProps = (dispatch: Function) => {
    return {
        getBanner: () => {
            dispatch(bannerAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(IndexPage);