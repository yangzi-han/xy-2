import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../store/actions/login'
import {RouteComponentProps} from 'react-router'
interface StateType{
    isFlage:boolean
}
interface DispatchType{
    logoutAction:()=>void
}

let CartPage: React.FC<StateType&DispatchType&RouteComponentProps> = props=>{
    // if(!props.isFlage){
    //    props.history.push('/login')
    // }
    // useEffect(()=>{
        
    // },[])
    return <>购物车</>;
}

const mapStateToProps = (state: any)=>{
    // console.log('state.login...', state)
    return {
        isFlage:state.login.isFlage
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        logoutAction: ()=>{
            dispatch()
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(CartPage);