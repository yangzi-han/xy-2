import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom'
import {PropType} from '../untils/interface'

let RouterView: React.FC<PropType>=props=>{
    return <Switch>{
        props.routes.map((item,index)=>{
            if(item.redirect){
                if(item.path=='*'){
                    return <Redirect key={item.path} to={item.redirect}/>
                }
                // return <Redirect from={item.path} key={item.path} exact to={item.redirect} />
            }
            return <Route key={item.path} path={item.path} render={renderProps=>{
                if(item.children){
                    return <item.component routes={item.children} {...renderProps} />
                }else{
                    return <item.component {...renderProps} />
                }
            }}></Route>
        })
    }</Switch>
}
export default RouterView