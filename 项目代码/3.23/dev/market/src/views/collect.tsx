import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { CollectAction } from '../store/actions/collect'
import {DeteltAction} from '../store/actions/delect'
import styles from '../scss/collrct.module.scss'
import { RouteComponentProps } from 'react-router'
import { SwipeAction, List } from 'antd-mobile';
interface DispatchType {
    coloects: Function
    deletes:Function
}
interface ActionType {
    collectlist: collectlist[]
}
interface collectlist {
    name: string,
    id: string,
    list_pic_url: string,
    goods_brief: string,
    retail_price:string,
    type_id:string,
    value_id:string
}

let Collect: React.FC<DispatchType & RouteComponentProps & ActionType> = props => {
    //let [data,setdata]=useState([])
    useEffect(() => {
        console.log(props.collectlist)
        props.coloects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let back = () => {
        props.history.go(-1)
    }
    return <>
        <div className={styles.top}><span className={styles.left} onClick={() => back()}>&lt;</span>easyLikeGoods</div>

        <div>

            <List>

                {
                    props.collectlist && props.collectlist.map((item, index) => {
                        return <SwipeAction key={item.value_id} 
                            style={{ backgroundColor: 'gray' }}
                            autoClose
                            right={[
                                {
                                    text: '删除',
                                    onPress: () => {
                                       props.deletes("1",item.value_id)
                                       props.coloects()
                                       
                                    },
                                    style: { backgroundColor: '#F4333C', color: 'white',width:'2rem' },
                                },
                            ]}

                        >
                            <List.Item className={styles.list}>
                               <div className={styles.itemleft}>
                                <img src={item.list_pic_url} alt=""/>
                               </div>
                               <div className={styles.itemright}>
                        <p>{item.name}</p>
                        <p>{item.goods_brief}</p>
                               </div>
                            </List.Item>
                        </SwipeAction>
                    })
                }
            </List>
        </div>
    </>;
}
let mapStateToProps = (state: any) => {
    return {
        collectlist: state.collect[0]
    }
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        coloects: () => {
            dispatch(CollectAction())
        },
        deletes:(id:string,valueid:string)=>{
            dispatch(DeteltAction(id,valueid))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Collect)