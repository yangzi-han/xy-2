import React,{useState,useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import {topicDetaileAction} from '../store/actions/topic'
import {connect} from 'react-redux'

// interface ItemProps{
//     title:string,
// }
// interface StateProps{
//     // DetaileData:ItemProps{}
// }
interface DetaileState{
    getdetaileData:Function
}
let GoodsDetailPage: React.FC<RouteComponentProps & DetaileState> = props=>{
    let [id] = useState(props.match.params)
    useEffect(()=>{
        props.getdetaileData(id)
        console.log()        
    },[])
    return <>
        详情
    </>;
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