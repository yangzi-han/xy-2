import React, { useEffect } from 'react'
import {RouteComponentProps, Link} from 'react-router-dom'
import {connect} from 'react-redux'//
import {CollectListAction,DeleteCollectListAction} from '../store/actions/my'
import styles from '../style/index.module.scss'
import { SwipeAction, List } from 'antd-mobile';
import Lazyload from 'react-lazyload'
interface StateTypes{
    CollectList:Array<{
        list_pic_url:string,
        [name:string]:string|number
    }>
} 
interface Dispatch{
    getCollectList:Function,
    DeleteCollectList:(valueId:number)=>void
}
let FavorPage: React.FC<Dispatch&StateTypes&RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getCollectList()
    },[])
    return <div style={{background:'#fff'}}>
        <div className={styles.header}>
            <p onClick={props.history.goBack}><i className="iconfont icon-icon-test"></i></p>
            <p>商品收藏</p>
            <p></p>
        </div>
        
        <div className={styles.CollectGoodsWrap}>
            {
                props.CollectList.map(item=>{
                    return<List key={item.value_id}>
                        <SwipeAction
                            style={{ backgroundColor: 'gray' ,width:'100%'}}
                            autoClose
                            right={[
                                {
                                    text: '删除',
                                    onPress: () => {
                                        props.DeleteCollectList(+item.value_id)
                                        props.getCollectList()
                                    },
                                    style: { backgroundColor: '#F4333C', color: 'white' },
                                },
                            ]}
                            onOpen={() => console.log('global open')}
                            onClose={() => console.log('global close')}
                            >
                            <List.Item
                                style={{padding:0}}
                                onClick={e => console.log(e)}
                            >
                               <div className={styles.CollectGoodsItem}>
                                   <Lazyload>
                                    <img className={styles.CollectGoodsImgs} src={item.list_pic_url.replace('http:','')} alt=""/>
                                    </Lazyload>
                                    <div className={styles.CollectGoodsInfos}>
                                        <p className={styles.CollectGoodsName}>{item.name}</p>
                                        <p className={styles.CollectGoodsInfo}>{item.goods_brief}</p>
                                        <p className={styles.CollectGoodsPrice}>￥{item.retail_price}</p>
                                    </div>
                                </div>
                            </List.Item>
                        </SwipeAction>
                    </List> 
                })
            }
        </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.my...',state.my)
    return {
        ...state.my
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getCollectList:()=>{
            dispatch(CollectListAction())
        },
        DeleteCollectList:(valueId:number)=>{
            dispatch(DeleteCollectListAction(valueId))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(FavorPage);