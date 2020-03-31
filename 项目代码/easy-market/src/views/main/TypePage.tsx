import React, { useEffect } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {GetClassifyAction} from '../../store/actions/classify'
import {connect} from 'react-redux'
import TabsBox from '../../component/tab/index'
import styles from '../../style/index.module.scss'
interface StateTypes{
    categoryList:Array<{
        [name:string]: string|number
    }>,
    currentCategory:{
        front_desc:string,
        name:string,
        wap_banner_url:string
        id:string
    }
}
interface Dispatch{
    getClassifyList:Function
}
let TypePage: React.FC<Dispatch&StateTypes&RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getClassifyList()
    },[])
    return <div>
        <div className={styles.searchWrap}>
            <div className={styles.searchInput}>
                搜索商品，共239款好物
            </div>
        </div>
        <div>
            <TabsBox categoryList={props.categoryList} />
            <div className={styles.categogContet}>
                <div className={styles.categoryWrap} style={{backgroundImage:props.currentCategory.wap_banner_url}}>{props.currentCategory.front_desc}</div>
            </div>
        </div>
    </div>;
}
const mapStateToProps = (state: any)=>{
    console.log('state.classify...', state.classify)
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getClassifyList: ()=>{
            dispatch(GetClassifyAction())
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TypePage);