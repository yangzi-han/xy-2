import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {TopicAction} from '../../store/actions/topic'
import {RouteComponentProps} from 'react-router'
import styles from '../../style/index.module.scss'
import Lazyload from 'react-lazyload'
interface StateType{
    topicList: Array<{
        scene_pic_url:string,
        [name:string]: string|number
    }>
}
interface DispatchType{
    getTopicPage:Function
}

let TopicPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    // console.log('props----',props.topicList)
    let [page,setPage]=useState(1)//初始化page页数
    useEffect(()=>{
        props.getTopicPage(page)
        window.addEventListener('scroll',scrollBottom)//滚动事件
    }, []);

    let scrollBottom=()=>{
        const scrollY=window.scrollY//滚动的距离
        const viewHeight=window.innerHeight//页面的高度
        const bodyHeight=document.body.clientHeight//父盒子的高度
        if(Math.round(scrollY+viewHeight)===bodyHeight){
            // console.log('到底了')
            if(page<2){
                // console.log(page)
                setPage(page+=1)
                props.getTopicPage(page)
            }
        }
        // console.log(Math.round(scrollY+viewHeight),bodyHeight)
      }
    let goDetail=(event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        let id=event.currentTarget.dataset.id
        props.history.push('/topicDetail/'+id)
    }
    return <div className={styles.tabPageContent}>
        {
            props.topicList.map(item=>{
                return <div key={item.id} className={styles.topicItem} data-id={item.id} onClick={goDetail}>
                    <Lazyload><img src={item.scene_pic_url.replace('http:','')} alt=""/></Lazyload>
                    <p className={styles.topicItemTitle}>{item.title}</p>
                    <p className={styles.topicItemSubtitle}>{item.subtitle}</p>
                    <p className={styles.topicItemPrice}>{item.price_info}元起</p>
                </div>
            })
        }
    </div>
}

const mapStateToProps = (state: any)=>{
    // console.log('state.topic...', state.topic)
    return {topicList:state.topic.TopList}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getTopicPage: (page:number)=>{
            dispatch(TopicAction(page))
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TopicPage);