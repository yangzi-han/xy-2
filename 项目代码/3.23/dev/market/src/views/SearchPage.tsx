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
    GetSearchListAction:(keyword:string,order:string,sort:string)=>void
}
let SearchPage: React.FC<RouteComponentProps&DispatchType&StateTypes> = props=>{
    let [keyword,setkeyword]=useState(props.defaultKeyword.keyword)
    let [isFlage,setisFlage]=useState(false)
    let [isOrder,setisOrder]=useState(false)
    let [isOrderd,setisOrderd]=useState(false)
    let [isOrders,setisOrders]=useState(true)
    useEffect(()=>{
        props.GetSearchAction()
        let text:any=document.querySelector('input')
        let wrapSearch=debounce(ChangekeyWord)//防抖
        text.addEventListener("input",wrapSearch)
    },['keyword'])
    let ChangekeyWord=(e:any)=>{
        // console.log(e.target.value)
        if(e.target.value){
            props.GetSearchListAction(e.target.value,'default','id')
            setisFlage(isFlage=true)
        }
    }
    let changeValue=(keyword:any)=>{
        props.GetSearchListAction(keyword,'default','id')
        setkeyword(keyword=keyword)
        setisFlage(isFlage=true)
    }
    let orderchange=(isOrders:boolean,isOrder:boolean,isOrderd:boolean)=>{
        if(isOrder){
            props.GetSearchListAction(keyword,'asc','price')
        }else{
            props.GetSearchListAction(keyword,'desc','price')
        }
        setisOrders(isOrders=isOrders)
        setisOrder(isOrder=isOrder)
        setisOrderd(isOrderd=isOrderd)
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
        <div style={{display:isFlage?'':'none',paddingTop:'0.8rem'}}>
        <div className={styles.searchConditionWrap}>
            <div className={styles.searchCondition}>
                <div className={styles.active} onClick={()=>{
                    props.GetSearchListAction(keyword,'default','id')
                    setisOrders(isOrders=true)
                    setisOrder(isOrder=false)
                    setisOrderd(isOrderd=false)
                }}>综合</div>
                <div className="">价格
                    <img style={{display:isOrders?'':'none'}}  onClick={()=>{orderchange(false,true,false)}}
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg
                    AAAA8AAAAVCAMAAACuRUSFAAAABGdBTUEAALGPC/xhBQAAAAFzUkdC
                    AK7OHOkAAAAzUExURf///+Li4vz8/NLPz8zMzOfn5+zs7MvLy87Ozt
                    nZ2ff39/Ly8t3d3dLS0s3NzdXV1e/v7x5kADsAAAB6SURBVBjTlU5J
                    EsAgDEKNBtf6/9fWse3Ea7lkIAkAbERmD4Oj6CFEjtS1fcKkTpSu8RF
                    q0GRjL7aeKBXwXd1nM1hwSbMYuZDP4JbxF9ns4HNY/s6oBJTB+FKnfW
                    VN4XzqaC+7p4ZqY93tRRUm2GPiiEeOynBHCd/40htqjAOfArDeuwAAA
                    ABJRU5ErkJggg==" alt="sort" className={styles.sortPrice}/>
                    <img style={{display:isOrder?'':'none'}} onClick={()=>{orderchange(false,false,true)}} 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA
                    8AAAAVCAMAAACuRUSFAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHO
                    kAAABFUExURf////b29ua/v64zM/Dw8N/f38p4eM3NzasrK9jY2Orq6uTk5
                    NDQ0KwtLdyoqNOPj/36+u3R0bI8PMRqarpPT/Ph4cBfXxAqC/oAAAB2SURB
                    VBjTlY1HFoQwDEOVguVQQ73/UYGEGTPL0Ubvu0jArSxBMkyiqmI46eIXnT44
                    apgxBx0r+mHwZrYoZ9jt8YrZsb2CRTccqxXn9cC/SukXEpsvNkxwPbsHO/YOc
                    GRbsCXd7ZGMZnUR7aw+RospwXzVlMGDJy9ABE2PslE1AAAAAElFTkSuQmCC"
                     alt="sort" className={styles.sortPrice}></img>
                    <img  style={{display:isOrderd?'':'none'}} onClick={()=>{orderchange(false,true,false)}}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA
                    8AAAAVCAMAAACuRUSFAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkA
                    AAB7UExURf///+fn58/Pz68zM6gkJM3NzdLS0svLy/7+/vz7++3t7fLy8t
                    ra2qooKP79/eDg4Pf399fX19eZmbE5Oa0uLvz29s2AgPLd3cJlZdzc3OK2
                    tt+vr+rLy7lNTcBhYfbq6rVDQ+bAwNOPj+jFxcZubsZwcLxXV9qiovnv74
                    XOz3UAAACYSURBVBjTlY7ZFoMgDESDgMEFFbSgbd26//8XtnIEfO28zLlD
                    MgHAifAygyjCEQ8B4TxPsfZBnmABTYqkclgkmItg7kG4MY6FgOy3KEJNAw
                    oH4XtrVFCWVbw7KPhX0yPun/oexs54zJ7yBZZ2ekcjlxmqu6Rnh5q1dvML
                    a6/BthbNFgvrPrYFho1rR9/hzmdikt4On5h7j1/xZwfGevdtjgAAAABJRU
                    5ErkJggg==" alt="sort" className={styles.sortPrice}></img>
                </div>
                <div className={styles.chooseCategory}>全部分类</div>
            </div>
        </div>
        <CateGoryBox goodsList={props.SearchList} 
        name='商品'
        />
        </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.Search...',state.search)
    return {
        ...state.search
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        GetSearchAction:()=>{
            dispatch(SearchAction())
        },
        GetSearchListAction:(keyword:string,order:string,sort:string)=>{
            dispatch(SearchListAction(keyword,order,sort))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(SearchPage);