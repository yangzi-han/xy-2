import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
// import { template } from '@babel/core'

export default (props: { routes: { map: (arg0: (item: any, index: any) => JSX.Element) => React.ReactNode; }; })=>{
    return <Switch>{
        props.routes.map((item, index)=>{
            if (item.redirect){
                return <Redirect from={item.path} exact key={index} to={item.redirect}/>
            }else{
                return <Route path={item.path} key={index} render={props=>{
                    if (item.children){
                        return <item.component routes={item.children} {...props}/>
                    }else{
                        return <item.component {...props}/>
                    }
                }}/>
            }
        })    
    }</Switch>
}
// create-reacr-app 包名 --template typescript

