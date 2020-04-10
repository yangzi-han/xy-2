import React, { useEffect } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import {GetClassifyAction,getClassifyCurrentAction,getClassifyCategoryAction,getClassifyGoodListAction} from '../../store/actions/classify'
import {connect} from 'react-redux'
import TabsBox from '../../component/tab/index'
import styles from '../../style/index.module.scss'
import Lazyload from 'react-lazyload'
interface StateTypes{
    categoryList:Array<{
        [name:string]: string|number
    }>,
    currentCategory:{
        front_desc:string,
        name:string,
        wap_banner_url:string
        id:string,
        subCategoryList:Array<{
            wap_banner_url:string,
            [name:string]: string|number
        }>,
    }
}
interface DispatchType{
    getClassifyList:Function,
    getClassifyCurrent:Function,
}
let TypePage: React.FC<DispatchType&StateTypes&RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getClassifyList()
    },[])
    let category=(id:any)=>{
        // console.log(id)
        props.history.push('/categorys/'+id)
    }
    let GoSearch=()=>{
        props.history.push('/goodsSearch')
    }
    return <div>
        <div className={styles.searchWrap}>
            <div className={styles.searchInput} onClick={()=>{GoSearch()}}>
                搜索商品，共239款好物
            </div>
        </div>
        <div>
            <TabsBox categoryList={props.categoryList} getClassifyCurrent={props.getClassifyCurrent} />
            <div className={styles.categogContet}>
                <div className={styles.categoryWrap} style={{backgroundImage:`url(${props.currentCategory.wap_banner_url})`}}>{props.currentCategory.front_desc}</div>
                <div className={styles.categoryTitle}>—— {props.currentCategory.name}分类 ——</div>
                <div className={styles.subCategory}>
                    {
                        props.currentCategory.subCategoryList?props.currentCategory.subCategoryList.map(item=>{
                            return <div key={item.id}  onClick={()=>{category(item.id)}} className={styles.subCategoryItem}>
                                <Lazyload><img src={item.wap_banner_url.replace('http:','')} alt=""/></Lazyload>
                                <p className={styles.subCategoryItemName}>{item.name}</p>
                            </div>
                        }):''
                    }
                </div>
            </div>
        </div>
    </div>
}
const mapStateToProps = (state: any)=>{
    // console.log('state.classify...', state.classify)
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getClassifyList: ()=>{
            dispatch(GetClassifyAction())
        },
        getClassifyCurrent: (id:string)=>{
            dispatch(getClassifyCurrentAction(id))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TypePage);