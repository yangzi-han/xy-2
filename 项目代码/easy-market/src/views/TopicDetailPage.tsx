import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {TopicDetailAction,TopicRelatedAction} from '../store/actions/topic'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../style/index.module.scss'
interface StateType{
    TopicDetailList:{
        title:string,
        content:string
    },
    TopicRelated: Array<{
        scene_pic_url:string,
        [name:string]: string|number
    }>
}
interface DispatchType{
    getTopicDetail:Function,
    getTopicRelated:Function
}
let TopicDetailPage: React.FC<DispatchType&StateType&RouteComponentProps> = props=>{
    console.log(props)
    let [id]=useState(props.match.params)
    useEffect(()=>{
        props.getTopicDetail(id)
        props.getTopicRelated(id)
    },[])
    let goDetail=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        let id=event.currentTarget.dataset.id
        props.history.replace('/topicDetail/'+id)
    }
    return <>
        <div className={styles.header}>
            <p onClick={props.history.goBack}>返回</p>
            <p>{props.TopicDetailList.title}</p>
            <p></p>
        </div>
        <div className={styles.topicDetailImg} dangerouslySetInnerHTML = {{ __html:props.TopicDetailList.content }}></div>
        <div className={styles.relateTopic}>
            <p className={styles.relateTopicTitle}>推荐专题</p>
            {
                props.TopicRelated.map(item=>{
                    return <div className={styles.relateTopicItem} key={item.id} data-id={item.id} onClick={goDetail}>
                        <img src={item.scene_pic_url} alt=""/>
                        <p>{item.title}</p>
                    </div>
                })
            }
            
        </div>
    </>
}

const mapStateToProps = (state: any)=>{
    console.log('state.topic...', state.topic)
    return state.topic
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getTopicDetail: (id:any)=>{
            dispatch(TopicDetailAction(id.id))
        },
        getTopicRelated:(id:any)=>{
            dispatch(TopicRelatedAction(id.id))
        }
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(TopicDetailPage)