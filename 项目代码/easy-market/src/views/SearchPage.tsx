import React, { useEffect, useState } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {SearchAction,SearchListAction} from '../store/actions/search'
import styles from '../style/index.module.scss'
import {throttle,debounce} from '../untils/index'
import CateGoryBox from '../component/cateGoryBox/index'
interface StateTypes{
    defaultKeyword:{
        keyword:string,
        id:string
    },//默认keyword
    historyKeywordList:Array<{
        [name:string]:string|number
    }>,//历史记录
    hotKeywordList:Array<{
        [name:string]:string|number
    }>,//热门搜索
    SearchList:Array<{
        [name:string]:string|number
    }>
}
interface DispatchType{
    GetSearchAction:Function,
    GetSearchListAction:(keyword:string)=>void
}
let SearchPage: React.FC<RouteComponentProps&DispatchType&StateTypes> = props=>{
    let [keyword,setkeyword]=useState(props.defaultKeyword.keyword)
    let [isFlage,setisFlage]=useState(false)
    useEffect(()=>{
        props.GetSearchAction()
        let text:any=document.querySelector('input')
        let wrapSearch=debounce(ChangekeyWord)//防抖
        text.addEventListener("input",wrapSearch)
    },['keyword'])
    let ChangekeyWord=(e:any)=>{
        // console.log(e.target.value)
        if(e.target.value){
            props.GetSearchListAction(e.target.value)
            setisFlage(isFlage=true)
        }
    }
    let changeValue=(keyword:any)=>{
        props.GetSearchListAction(keyword)
        setkeyword(keyword=keyword)
        setisFlage(isFlage=true)
    }
    return <div>
        <div className={styles.searchPage}>
            <div className={styles.searchInputWrap}>
                <p onClick={props.history.goBack} className={styles.goback}><i className="iconfont icon-icon-test"></i></p>
                <p className={styles.icon}><i className="iconfont icon-sousuo"></i></p>
                <input type="text" value={keyword} onChange={(e)=>setkeyword(keyword=e.target.value)} placeholder={props.defaultKeyword.keyword} className={styles.searchInput}/>
                <p className={styles.cancelSearch} onClick={()=>{
                    setkeyword(keyword='')
                    setisFlage(isFlage=false)
                }}>取消</p>
            </div>
        </div>
        <div style={{display:isFlage?'none':''}}>
            <div className={styles.searchItemWrap}>
                <div className={styles.title}>历史记录<i className="iconfont icon-shanchu"></i></div>
                <div className={styles.listWrap}>{
                    props.historyKeywordList.map((item,index)=>{
                        return <p onClick={()=>{
                           changeValue(item)
                        }} className={styles.listItem} key={index}>{item}</p>
                        
                    })
                }</div>
            </div>
            <div className={styles.searchItemWrap}>
                <div className={styles.title}>热门搜索</div>
                <div className={styles.listWrap}>{
                    props.hotKeywordList.map((item,index)=>{
                        return <p onClick={()=>{
                            changeValue(item.keyword)
                            
                         }} className={styles.listItem} key={index}>{item.keyword}</p>
                        
                    })
                }</div>
            </div>
        </div>
        <div style={{display:isFlage?'':'none',paddingTop:'0.5rem'}}>
            <CateGoryBox goodsList={props.SearchList} 
            name='商品'
            />
        </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    console.log('state.Search...',state.search)
    return {
        ...state.search
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        GetSearchAction:()=>{
            dispatch(SearchAction())
        },
        GetSearchListAction:(keyword:string)=>{
            dispatch(SearchListAction(keyword))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(SearchPage);