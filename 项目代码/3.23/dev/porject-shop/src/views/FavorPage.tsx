import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from './scss/favor/favor.module.scss'
import { collectAction, deleteCollectAction } from '../store/actions/favor'
import { SwipeAction, List } from 'antd-mobile';

interface DispatchType {
    getCollectList: Function
    DeleteCollectList: (valueId: number) => void
}

interface StateTypes {
    collectList: Array<{
        [name: string]: string | number,
        list_pic_url: string,
        value_id: number
    }>
}

let FavorPage: React.FC<StateTypes & DispatchType & RouteComponentProps> = props => {
    // let [id] = useState(props.match.params.id)
    // console.log('收藏商品Id', id)
    console.log(props.collectList)
    useEffect(() => {
        props.getCollectList()
    }, [])
    return <div className={styles.favorPage}>
        <div className={styles.header}>
            <p onClick={props.history.goBack}>&lt;</p>
            <p>商品收藏</p>
            <p></p>
        </div>
        <div className={styles.collectList}>
            <List>
                {
                    props.collectList ? props.collectList.map(item => {
                        return <SwipeAction
                            key={item.value_id}
                            style={{ backgroundColor: 'gray', width: '100%' }}
                            autoClose
                            right={[
                                {
                                    text: '删除',
                                    onPress: () => {
                                        props.DeleteCollectList(item.value_id)
                                        window.history.go(0)
                                    },
                                    style: { backgroundColor: '#F4333C', color: 'white' },
                                },
                            ]}  // onOpen={() => console.log('global open')}onClose={() => console.log('global close')}
                        >
                            <List.Item
                                style={{ padding: 0 }}
                                onClick={e => console.log(e)}
                            >
                                <div className={styles.collectItem}>
                                    <img src={item.list_pic_url} alt="" />
                                    <div className={styles.collectItemMsg}>
                                        <div className={styles.collectItemName}>{item.name}</div>
                                        <div className={styles.collectItemInfo}>{item.goods_brief}</div>
                                        <div className={styles.collectItemPrice}>￥{item.retail_price}</div>
                                    </div>
                                </div>
                            </List.Item>
                        </SwipeAction>
                    }) : ''
                }
            </List>
        </div>
    </div>
}

const mapStateToProps = (state: any) => {
    console.log('收藏', state.favor)
    return {
        collectList: state.favor.collect
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getCollectList: () => {
            dispatch(collectAction())
        },
        DeleteCollectList: (valueId: number) => {
            dispatch(deleteCollectAction(valueId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavorPage);