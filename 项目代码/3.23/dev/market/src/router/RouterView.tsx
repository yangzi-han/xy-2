import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'
import {PropType} from '../untils/interface'
import { connect } from 'react-redux';
import { getToken } from '../untils/index';
import { userInfoAction } from '../store/actions/login';
interface StateType{
    info:{}
}
interface DispatchType{
    getUserInfo:Function
}
let RouterView: React.FC<PropType&DispatchType&StateType>=props=>{
    return <Switch>{
        props.routes.map((item,index)=>{
            if(item.redirect){
                if(item.path=='*'){
                    return <Redirect key={item.path} to={item.redirect}/>
                }
                // return <Redirect from={item.path} key={item.path} exact to={item.redirect} />
            }
            return <Route key={item.path} path={item.path} render={renderProps=>{
                //路由拦截
                let {match:{path}}=renderProps
                // console.log(path,'pathrouterview')
                if(path !== '/login' && path !== '/main'&& !getToken()){
                    return <Redirect to={`/login?redirect=${encodeURIComponent(path)}`} />
                }
                if(getToken()&&!Object.keys(props.info).length){
                    props.getUserInfo()
                }
                if(item.children){
                    return <item.component routes={item.children} {...renderProps} />
                }else{
                    return <item.component {...renderProps} />
                }
            }}></Route>
        })
    }</Switch>
}

const mapStateToProps = (state: any)=>{
    // console.log('state.login....',state.login)
    return {
        info:state.login.info
    }
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getUserInfo: ()=>{
            dispatch(userInfoAction())
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterView)