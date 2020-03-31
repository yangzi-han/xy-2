//专题页详情
import React,{useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {connect} from 'react-redux'
import {TopiceDetailAction} from '../store/actions/topicdetail'
import styles from '../scss/topicedetail.module.scss'
interface dispatchType{
    topicedetail:Function
}
interface actionType{
    [name:string]:string|number,
}


let TopicDetailPage: React.FC<RouteComponentProps& dispatchType&actionType> = props=>{
    useEffect(()=>{
        props.topicedetail(props.match.params.id)
    },[])
    const back=()=>{
        props.history.go(-1)
      }
    function createMarkup() {
        return {__html: `${props.content}`};
      }

    return <>
        <div className={styles.topicedetailtop} ><span className={styles.back} onClick={back}>&lt;</span>{props.title}</div>
        <div className={styles.topicedetailimg} dangerouslySetInnerHTML={createMarkup()}></div>
    </>;
}

let mapStateToProps=(state:any)=>{
    console.log(state.topicedetail)
    return state.topicedetail
}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        topicedetail:(id:any)=>{
            dispatch(TopiceDetailAction(id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopicDetailPage);