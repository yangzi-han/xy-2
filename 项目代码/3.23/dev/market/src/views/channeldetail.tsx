import React, { useEffect, useState } from 'react'
import styles from '../scss/typedetail.module.scss'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { ChannelAction } from '../store/actions/channel'
interface DispatchType {
        channeldetails: Function
}
interface ActionType {
        channeldetaila: {
                filterCategory: filterCategory[]
                data: data[]
        }

}
interface filterCategory {
        id: string,
        name: string,

}
interface data {
        id: string,
        name: string,
        list_pic_url: string,
        retail_price: string
}
let ChannelDetail: React.FC<RouteComponentProps<{ id: string, index: string }> & DispatchType & ActionType> = props => {
        console.log(props.match.params.id)
        console.log(props.match.params.index)
        let [indexs, setIndex] = useState(props.match.params.index)
        useEffect(() => {
                props.channeldetails(props.match.params.id)
                console.log(props.channeldetaila.filterCategory)
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        let back = () => {
                props.history.go(-1)
        }
        let checkout = (index: string, id: string) => {
                setIndex(indexs = `${index}`)
                props.channeldetails(id)
        }
        return <div>
                <div className={styles.toptop}>
                        <div className={styles.top}><span className={styles.topleft} onClick={() => back()}>&lt;</span>奇趣分类</div>
                        <div className={styles.header}>

                                {

                                        props.channeldetaila.filterCategory && props.channeldetaila.filterCategory.map((item, index) => {
                                                return <div key={item.id} className={`${index}` === indexs ? styles.active : ""}>
                                                        <li onClick={() => checkout(`${index}`, item.id)} >
                                                                {item.name}
                                                        </li>
                                                </div>
                                        })
                                }
                        </div>
                </div>
                <div className={styles.footersss}>
                        {
                                props.channeldetaila.data && props.channeldetaila.data.map(item => {
                                        return <div className={styles.footeritem} key={item.id}>
                                                <div><img src={item.list_pic_url} alt="" /></div>
                                                <div>{item.name}</div>
                                                <div className={styles.channelprice}>￥{item.retail_price}</div>
                                        </div>
                                })
                        }
                </div>
        </div>
}
let mapStateToProps = (state: any) => {
        console.log(state.channeldetail)
        return {
                channeldetaila: state.channeldetail
        }
}
let mapDispatchToProps = (dispatch: Function) => {
        return {
                channeldetails: (id: string) => {
                        dispatch(ChannelAction(id))
                }
        }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail)