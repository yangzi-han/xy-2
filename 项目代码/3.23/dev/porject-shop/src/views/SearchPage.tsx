/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import styles from './scss/search/search.module.scss'
import { connect } from 'react-redux'
import { searchAction} from '../store/actions/search'
import { searchDataAction } from '../store/actions/search'
import {RouteComponentProps} from 'react-router'
interface DispatchType {
    searchhot: Function,
    search: Function
}
interface ActionType {
    hot: {
        hotKeywordList: data[],
        historyKeywordList:[]
    }
    searchs: {
        data: datas[]
        filterCategory:filterCategory[]
    }
}
interface data {
    keyword: string,
    is_hot: number
}
interface datas {
    list_pic_url: string,
    name: string,
    id: string,
    retail_price: string
}
interface filterCategory{
    id:number,
    name:string
}
let Search: React.FC<DispatchType & ActionType&RouteComponentProps> = props => {
    let [count,SetCount]=useState(0)
    let [flag, Setflag] = useState(false)
    let [flag2,Setflag2]=useState(true)
    let [prices,SetPrice]=useState("id")
    let [newdata,Setnewdata]=useState('')
    useEffect(() => {
        props.searchhot()
        props.search()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let change = (e: any) => {

        if (e.data === null) {
            Setflag(flag = false)
        } else {
            Setnewdata(newdata=e.data)
            props.search(e.data)
            Setflag(flag = true)
        }

    }
   let classify=()=>{
    Setflag2(flag2=false)
   }
   let fenlei=(index:number)=>{
    SetCount(count=index)
    Setflag2(flag2=true)
   }
   let price=()=>{
    SetPrice(prices==="id"?"price":"id")
    props.search(newdata)
   }
   let quxiao=()=>{
    Setflag(flag=false)
   }
   let back=()=>{
       window.history.go(-1)
   }
    return <>
        <div className={styles.searchtop}>
            <span className={styles.searchspan} onClick={back}>&lt;</span>
            <input type="search" className={styles.searchinput} placeholder="520元礼包抢先领" onChange={() => change(event)} />
            <button className={styles.searchbutton} onClick={()=>quxiao()}>取消</button>
        </div>
        <div className={[`${styles.searchcenter}`, `${flag ? styles.actives : ""}`].join(" ")}>
            <div className={styles.searchcentertop}></div>
            <div className={styles.searchcentercenter}>
                <p>历史记录</p>
                <div className={styles.hot}>
                    {
                        props.hot.historyKeywordList && props.hot.historyKeywordList.map((item, index) => {
                            return <div key={index}>{item}</div>
                        })
                    }
                </div>
                <p>热门搜索</p>
                <div className={styles.hot}>
                    {
                        props.hot.hotKeywordList && props.hot.hotKeywordList.map((item, index) => {
                            return <div key={index} className={item.is_hot === 1 ? styles.active : ""}>{item.keyword}</div>
                        })
                    }
                </div>
            </div>
        </div>
        <div className={[`${!flag ? styles.actives : ""}`].join(" ")} >
                    <div className={[`${styles.searchitemtop}`].join("")}>
                        <span>综合</span>
                        <span onClick={()=>price()}>价格</span>
                <span onClick={()=>classify()}>{props.searchs.filterCategory&&props.searchs.filterCategory[count].name}分类</span>
                <span className={[`${flag2?styles.actives:""}`,`${styles.apn}`].join(" ")}>{
                    props.searchs.filterCategory&&props.searchs.filterCategory.map((item,index)=>{
                    return <span key={item.name} className={count===index?styles.activesss:""} onClick={()=>fenlei(index)}>{item.name}</span>
                    })
                    }</span>
                    </div>
                    <div className={styles.name}>
            {
                props.searchs.data&& props.searchs.data.map(item => {
                    return <div className={styles.searchitem} key={item.id}>
                        <div><img src={item.list_pic_url} alt="" /></div>
                        <div className={styles.itemname}>{item.name}</div>
                        <div className={styles.itemprice}>￥{item.retail_price}元</div>
                    </div>
                })
            }
            </div>
        </div>
    </>
}
let mapStateToProps = (state: any) => {
    console.log(state.search)
    return {
        hot: state.search.searchHot,
        searchs: state.search.searchData
    }
}
let mapDispatchToProp = (dispatch: Function) => {
    return {
        searchhot: () => {
            dispatch(searchAction())
        },
        search: (keyword: string,price:string) => {
            dispatch(searchDataAction(keyword))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProp)(Search)