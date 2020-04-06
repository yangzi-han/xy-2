import React,{useState,useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import { ClassifyActions, clasGoodListActions } from '../store/actions/type'
import styles from '../style/index.module.scss'
import CateGoryBox from '../components/Contributor/contributor'

interface StateProps{
    brotherCategory:Array<{
        [name:string]: string|number
    }>
    currentCategoryData:{
        name:string,
        front_name:string
        id:string,
    }
    parentCategory:Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>
}

interface cateGorysState{
    getscrollData:Function,
    getclassFiyIdList:Function
}

let CateGorys: React.FC<cateGorysState & RouteComponentProps<{id:string}> & StateProps>= props=>{
    let [id] = useState(props.match.params.id)
    let [activeIndex,setActiveIndex ] = useState(props.match.params.id)
    useEffect(()=>{
        props.getscrollData(id)
        props.getclassFiyIdList(activeIndex)
    },[])
    let ChangeLi = (id:any) => {
        setActiveIndex(activeIndex = id)
        props.getclassFiyIdList(activeIndex)
        props.getscrollData(activeIndex)
    }
    return <div className={styles.noTabPageContent}>
                <div className={styles.header}>
                <div className={styles.left} onClick={props.history.goBack}>{'<'}</div>
                    <div className={styles.title}>奇趣分类</div>
                    <div className={styles.right}></div>
                </div>
                <div className={styles.tabWrap}>
                    {
                        props.brotherCategory.map(item=>{
                            return <li key={item.id} className={activeIndex == item.id?styles.active:''} onClick={()=>ChangeLi(item.id)}>{item.name}</li>
                        })
                    }
                </div>
                <div className={styles.categoryDetail}>
                    <div className={styles.title}>{props.currentCategoryData.name}</div>
                    <div className={styles.front_name}>{props.currentCategoryData.front_name}</div>
                </div>
                <div>
                    <CateGoryBox goodsList={props.parentCategory} name={props.currentCategoryData.name} />
                </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    return {
        ...state.type
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getscrollData: (id:any) => {
            dispatch(ClassifyActions(id))
        },
        getclassFiyIdList:(id:number)=>{
            dispatch(clasGoodListActions(id))
        }
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(CateGorys);