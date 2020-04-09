import React, { useState, useEffect } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {getClassifyCategoryAction,getClassifyGoodListAction} from '../store/actions/classify'
import styles from '../style/index.module.scss'
import CateGoryBox from '../component/cateGoryBox/index'
interface StateTypes{
    brotherCategory:Array<{
        [name:string]: string|number
    }>,//横滚tab
    currentCategorylist:{
        name:string,
        front_name:string
        id:string,
    },//介绍
    ClassifyGoodList:Array<{
        list_pic_url:string,
        [name:string]: string|number
    }>,///对应商品
}
interface DispatchType{
    getClassifyCategory:Function,
    getClassifyGoodList:Function, 
}
let TypeGoodsPage: React.FC<RouteComponentProps<{id:string}>&DispatchType&StateTypes> = props=>{
    let [id]=useState(props.match.params.id)
    let [activeIndex,setactiveIndex]=useState(props.match.params.id)
    useEffect(()=>{
        props.getClassifyCategory(id)
        props.getClassifyGoodList(activeIndex)
    },[])
    let changeindex=(index:any)=>{
        
        setactiveIndex(activeIndex=index)
        // console.log(activeIndex,index)
        props.getClassifyGoodList(activeIndex)
        props.getClassifyCategory(activeIndex)
    }
    
    return <div className={styles.classifyboxs}>
        <div className={styles.classifypageheader}>
            <div className={styles.classifyheader}>
                <p onClick={props.history.goBack}><i className="iconfont icon-icon-test"></i></p>
                <p>奇趣分类</p>
                <p></p>
            </div>
            <div className={styles.tabWrap}>
                {
                    props.brotherCategory.map(item=>{
                        return <li className={activeIndex==item.id?styles.active:''} onClick={()=>{changeindex(item.id)}} key={item.id}>{item.name}</li>
                    })
                }
            </div>
        </div>
        
        <div className={styles.categoryDetail}>
            <p>{props.currentCategorylist.name}</p>
            <p>{props.currentCategorylist.front_name}</p>
        </div>
        <CateGoryBox goodsList={props.ClassifyGoodList} 
        name={props.currentCategorylist.name} 
        />
    </div>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.classify...', state.classify)
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getClassifyCategory:(id:string)=>{
            dispatch(getClassifyCategoryAction(id))
        },
        getClassifyGoodList:(id:string)=>{
            dispatch(getClassifyGoodListAction(id))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TypeGoodsPage);