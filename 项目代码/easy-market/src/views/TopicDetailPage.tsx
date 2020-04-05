import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {TopicDetailAction,TopicRelatedAction,TopicCommentAction} from '../store/actions/topic'
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
    }>,
    commentList: Array<{
        id:string,
        content:string,
        username:string,
        add_time:string,
        scene_pic_url:string,
        user_info:{
            username:string
        }
    }>,
}
interface DispatchType{
    getTopicDetail:Function,
    getTopicRelated:Function,
    getTopicComment:Function
}
let TopicDetailPage: React.FC<DispatchType&StateType&RouteComponentProps<{id:string}>> = props=>{
    console.log(props)
    let [id]=useState(props.match.params.id)
    useEffect(()=>{
        props.getTopicDetail(id)
        props.getTopicRelated(id)
        props.getTopicComment(id)
    },[])
    return <div>
        <div className={styles.header}>
            <p onClick={props.history.goBack}><i className="iconfont icon-icon-test"></i></p>
            <p>{props.TopicDetailList.title}</p>
            <p></p>
        </div>
        <div className={styles.topicDetailImg} dangerouslySetInnerHTML = {{ __html:props.TopicDetailList.content }}></div>
        <div className={styles.commentWrap}>
            <div className={styles.titleLine}>精选留言</div>
            <div className={styles.commentList}>
                {
                    props.commentList.length?props.commentList.map(item=>{
                        return <div className={styles.commentItem} key={item.id}>
                            <p className={styles.userInfo}><span className={styles.userInfospan}>{item.user_info.username?item.user_info.username:"匿名用户"}</span><span>{item.add_time}</span> </p>
                            <p>{item.content}</p>
                        </div>
                    }):'等你来留言'
                }
            </div>  
        </div>
        <div className={styles.relateTopic}>
            <p className={styles.relateTopicTitle}>推荐专题</p>
            {
                props.TopicRelated.map(item=>{
                    return <div className={styles.relateTopicItem} key={item.id} data-id={item.id}>
                        <img src={item.scene_pic_url} alt=""/>
                        <p>{item.title}</p>
                    </div>
                })
            }
        </div>
    </div>
}

const mapStateToProps = (state: any)=>{
    console.log('state.topic...', state.topic)
    return state.topic
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getTopicDetail: (id:any)=>{
            dispatch(TopicDetailAction(id))
        },
        getTopicRelated:(id:any)=>{
            dispatch(TopicRelatedAction(id))
        },
        getTopicComment:(valueId:any)=>{
            dispatch(TopicCommentAction(valueId))
        }
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(TopicDetailPage)