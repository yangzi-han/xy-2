import React,{useState,useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import { ClassifyActions } from '../store/actions/type'
import styles from '../style/index.module.scss'

interface StateProps{
    brotherCategory:Array<{
        [name:string]: string|number
    }>
}

interface cateGorysState{
    getscrollData:Function,
    getclassFiyIdList:Function
}

let CateGorys: React.FC<cateGorysState & RouteComponentProps & StateProps>= props=>{
    let [id] = useState(props.match.params)
    useEffect(()=>{
        props.getscrollData(id)
    },[])
    let ChangeLi = (id:any) => {
        console.log(id)
        props.getclassFiyIdList(id)
    }
    console.log(props.brotherCategory)
    return <div className={styles.noTabPageContent}>
                <div className={styles.header}>
                    <div className={styles.left}>返回</div>
                    <div className={styles.title}>奇趣分类</div>
                    <div className={styles.right}></div>
                </div>
                <div className={styles.tabWrap}>
                    {
                        props.brotherCategory.map(item=>{
                            return <li key={item.id} onClick={()=>ChangeLi(item.id)}>{item.name}</li>
                        })
                    }
                </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    console.log(state.type,'111111')
    return {
        ...state.type
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getscrollData: (id:any) => {
            dispatch(ClassifyActions(id.id))
        }
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(CateGorys);