import React,{useEffect} from 'react'
import styles from '../../style/index.module.scss'
import {connect} from 'react-redux'
import {typePage} from '../../store/actions/type'
interface DispatchProps{
    getTypeData:Function,
    type:[]
}

const TypePage: React.FC<DispatchProps> = props =>{
    useEffect(()=>{
        props.getTypeData()
        console.log(props.type)        
    },[])
    return <div className={styles.tabPageContent}>
        <div className={styles.searchWrap}>
            <div className={styles.searchInput}>
                <i className={styles.search}></i>
                <span>搜索商品，共239款好物</span>
            </div>
        </div>
        <div className={styles.tabsWrap}></div>
        <div className={styles.categogContet}></div>
    </div>
}
const mapStateToProps = (state: any)=>{
    return {
        type:state.type
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getTypeData: () => {
            dispatch(typePage())
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TypePage)