import React from 'react';
import {connect} from 'react-redux'
import {navAction} from '../../store/actions/classNav'
import {RouteComponentProps} from 'react-router-dom'
// import styles from '../../static/classfly.module.scss'
interface ItemType{
   
}
interface StateProps{
    
}
interface DispatchProps{
   
}
let Classfly:React.FC<DispatchProps&StateProps&RouteComponentProps>=(props)=>{
    return <>
     123
    </>
}
const mapStateToProps=(state:any)=>{
    return {navList:state.classNav.navList}
}
const mapDispatchToProps=(dispatch:Function)=>{
    return {
        getNav:(id: number)=>{
            dispatch(navAction(id));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Classfly)