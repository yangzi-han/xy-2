import React,{useEffect,useState} from 'react'
import styles from '../style/index.module.scss'
import {connect} from 'react-redux'
import {SeachAction, getpaoodAction} from '../store/actions/seach'
import {RouteComponentProps} from 'react-router'
import {throttle,debounce} from '../utils/index'
interface StateProps{
    gethistory:Function,
    gethelper:(keyword:string)=>void
    defaultKeyword:{
        keyword:string
    },
    historyKeywordList:Array<{
        [name: string]:string|number
    }>,
    hotKeywordList:Array<{
        [name: string]:string|number
    }>,
    goodsList:Array<{
        list_pic_url:string,
        id:string,
        [name:string]:String|number
    }>
}
let SeachPage: React.FC<StateProps & RouteComponentProps> = props=>{
    let [keyword,setkeyword] = useState(props.defaultKeyword.keyword)
    useEffect(()=>{
        props.gethistory()
        let inpText = document.querySelector('input') as HTMLInputElement
        let WrapSeach = throttle(changeWrap)//节流
        inpText.addEventListener('input',WrapSeach) 
    },['keyword'])
    let changeWrap = (e:any)=>{
        console.log(e.target.value)
        if(e.target.value){
            props.gethelper(e.target.value)
        }
    }
    let remData = () =>{
        setkeyword('')
    }
    let claBth = () =>{
       let allcla = document.querySelector('#classifySeach') as HTMLInputElement
       allcla.style.display='block'
    }
    return <div className={styles.noTabPageContent}>
        <div className={styles.searchPage}>
            <div className={styles.searchFix}>
                <div className={styles.Input}>
                    <div className={styles.searchInputWrap}>
                        <div className='iconfont icon-fanhui' onClick={props.history.goBack}></div>
                        <input type="text" placeholder={props.defaultKeyword.keyword} value={keyword} onChange={(e)=>setkeyword(keyword=e.target.value)}/>
                        <div onClick={()=>remData()}>取消</div>
                    </div>
                </div>
            </div>
            {
                keyword?<div className={styles.searchGoods}>
                    <div className={styles.searchConditionWrap}>
                        <div className={styles.searchCondition}>
                            <div className={styles.all}>综合</div>
                            <div className={styles.money}>价格</div>
                            <div className={styles.chooseCategory} onClick={()=>claBth()}>全部分类</div>
                        </div>
                        <div id="classifySeach" className={styles.classifySeach}>
                            所有分类
                        </div>
                    </div>
                    <div className={styles.goodsList}>
                        {
                            props.goodsList?props.goodsList.map(item=>{
                                return <div className={styles.goodsItem} key={item.id}>
                                <img src={item.list_pic_url} className={styles.goodImg} alt=""/>
                                <div className={styles.goodsItemName}>{item.name}</div>
                                <div className={styles.goodsItemPrice}>￥{item.retail_price}</div>
                            </div>
                            }):''
                        }
                    </div>
                </div>:<div className={styles.searchMsg}>
                <div className={styles.searchItemWrap}>
                    <div className={styles.title}>
                        历史记录
                        <i className='iconfont icon-shanchu'></i>
                    </div>
                    <div className={styles.listWrap}>
                        {
                            props.historyKeywordList?props.historyKeywordList.map((item,index)=>{
                                return <button className={styles.listItem} key={index}>{item}</button>
                            }):''
                        }
                    </div>
                </div>
                <div className={styles.searchItemWrap}>
                    <div className={styles.title}>热门搜索</div>
                    <div className={styles.listWrap}>
                        {
                            props.hotKeywordList?props.hotKeywordList.map((item,index)=>{
                                return <button className={styles.listItem} key={index}>{item.keyword}</button>
                            }):''
                        }
                    </div>
                </div>
            </div>
            }
            
        </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    console.log('seacPage.....',state.seach)    
    return{
        ...state.seach
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        gethistory(){
            dispatch(SeachAction())
        },
        gethelper(keyword:string){
            dispatch(getpaoodAction(keyword))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(SeachPage);