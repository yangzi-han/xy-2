import React,{useState,useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {topicDetaileAction} from '../store/actions/topic'
import {connect} from 'react-redux'
import styles from '../style/index.module.scss'

interface StateProps{
    DetaileData:{
        avatar:string,
        content:string,
        id:number,
        is_show:number,
        item_pic_url:string,
        price_info:number,
        read_count:string,
        scene_pic_url:string,
        sort_order:number,
        subtitle:string,
        title:string,
        topic_category_id:number,
        topic_tag_id:number,
        topic_template_id:number
    }
}
interface DetaileState{
    getdetaileData:Function
}
let GoodsDetailPage: React.FC<RouteComponentProps & DetaileState & StateProps> = props=>{
    let [id] = useState(props.match.params)
    useEffect(()=>{
        props.getdetaileData(id)
        console.log()        
    },[])
    let goBack=()=>{
        props.history.push('/main/topic')
    }
    return <div className={styles.noTabPageContent}>
        <div className={styles.topicDetail}>
            <div className={styles.header}>
                <div className={styles.left} onClick={goBack}>返回</div>
                <div className={styles.title}>{props.DetaileData.title}</div>
                <div></div>
            </div>
            <div className={styles.topicDetailImg} dangerouslySetInnerHTML = {{__html:props.DetaileData.content}}></div>
        </div>
        
    </div>;
}
const mapStateToProps = (state: any)=>{
    return {
        DetaileData:state.topic.DetaileData
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getdetaileData: (id:any) => {
            dispatch(topicDetaileAction(id.id));
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(GoodsDetailPage); 