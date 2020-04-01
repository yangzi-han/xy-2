//专题页详情
import React,{useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {TopiceDetailAction} from '../store/actions/topicdetail'
import {TopiceDetailIdAction} from '../store/actions/topicedetailid'
import styles from '../scss/topicedetail.module.scss'
interface dispatchType{
    topicedetail:Function,
    topicedetailid:Function
}
interface actionType{
    topicedetaillist:{
        title:string,
        content:string
    },
    conlist:{
        data:data[]
    }
    
}
interface data{
    content:string,
    id:number,
    add_time:string
}



let TopicDetailPage: React.FC<RouteComponentProps& dispatchType&actionType> = props=>{
    useEffect(()=>{
        props.topicedetail(props.match.params)
        props.topicedetailid(props.match.params)
        console.log(props.conlist.data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const back=()=>{
        props.history.go(-1)
      }
    function createMarkup() {
        return {__html: `${props.topicedetaillist.content}`};
      }

    return <>
        <div className={styles.topicedetailtop} ><span className={styles.back} onClick={back}>&lt;</span>{props.topicedetaillist.title}</div>
        <div className={styles.topicedetailimg} dangerouslySetInnerHTML={createMarkup()}></div>
        <div className={styles.topicdetailjingxuan}>
            <div className={styles.topicdetailjingxuantop}>精选留言</div>
            <div className={styles.topicdetailjingxuancenter}>
            {
                props.conlist.data.map(item=>{
                return <div className={styles.topicdetailjingxuanitem} key={item.id}>
                    <p className={styles.p}><span className={styles.left}>匿名用户</span><span className={styles.right}>{item.add_time}</span></p>
                    {item.content}
                    </div>
                })
            }
</div>
            <div className={styles.topicdetailjingxuanfooter}>查看更多评论</div>
        </div>
    </>;
}

let mapStateToProps=(state:any)=>{
    console.log(state.topicedetailid)
    return {topicedetaillist:state.topicedetail,conlist:state.topicedetailid}
}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        topicedetail:(id:any)=>{
            dispatch(TopiceDetailAction(id))
        },
        topicedetailid:(id:any)=>{
            dispatch(TopiceDetailIdAction(id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopicDetailPage);