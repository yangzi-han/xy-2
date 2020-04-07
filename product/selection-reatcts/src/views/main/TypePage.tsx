import React,{useEffect} from 'react'
import styles from '../../style/index.module.scss'
import {connect} from 'react-redux'
import {typePage,typeClassifyActions} from '../../store/actions/type'
import TabsBox from '../../components/Tab/index'
import {RouteComponentProps} from 'react-router'
interface DispatchProps{
    getTypeData:Function,
    categoryList:Array<{
        [name:string]: string|number
    }>,
    currentCategory:{
        subCategoryList:Array<{
            wap_banner_url:string
            id:number
            [name:string]:string|number
        }>,
        front_name:string,
        name:string,
        wap_banner_url:string
    },
    getClassifyContent:Function,
}

const TypePage: React.FC<DispatchProps & RouteComponentProps> = props =>{
    useEffect(()=>{
        props.getTypeData()
    },[])
    let addClassIfy = (id:number) => {
        props.history.push('/gategorys/'+id)
    }
    let addseach = () =>{
        props.history.push('/seachPage')
    }
    return <div className={styles.tabPageContent}>
        <div className={styles.searchWrap}>
            <div className={styles.searchInput} onClick={addseach}>
                <i className={styles.search}></i>
                <span>搜索商品，共239款好物</span>
            </div>
        </div>
        <TabsBox categoryList={props.categoryList} getClassifyContent={props.getClassifyContent} />
        <div className={styles.categogContet}>
            <div className={styles.categoryWrap} style={{backgroundImage:`url(${props.currentCategory.wap_banner_url})`}}>{props.currentCategory.front_name}</div>
            <div className={styles.categoryTitle}>——{props.currentCategory.name}分类——</div>
            <div className={styles.subCategory}>
                    {
                        props.currentCategory.subCategoryList?props.currentCategory.subCategoryList.map(item=>{
                            return <div key={item.id} className={styles.subCategoryItem}  onClick={()=>addClassIfy(item.id)}>
                                <img src={item.wap_banner_url} alt=""/>
                                <p className={styles.subCategoryItemName}>{item.name}</p>
                            </div>
                        }):""
                    }
            </div>
        </div>
    </div>
}
const mapStateToProps = (state: any)=>{
    return {...state.type}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getTypeData: () => {
            dispatch(typePage())
        },
        getClassifyContent:(id:number) =>{
            dispatch(typeClassifyActions(id))
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TypePage)