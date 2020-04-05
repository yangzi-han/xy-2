import React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'
import {PropType} from '../utils/interface'
import { getToken } from '../utils/index'
let RouterView:React.FC<PropType>=props=>{

        return <Switch>
            {
                props.routes.map((item) => {
                    if (item.redirect){
                        if(item.path==="*"){
                        return <Redirect key={item.path} exact to={item.redirect}/>
                        }
                    }
                    return <Route key={item.path} path={item.path} render={renderProps=>{
                        let {match:{path}}=renderProps
                        if(path!=='/login'&&path!=="/main"&&!getToken()){
                            return <Redirect to={`/login?redirect=${encodeURIComponent(path)}`}/>
                        }
                        if (item.children){
                            return <item.component routes={item.children} {...renderProps}/>
                        }else{
                            return <item.component {...renderProps}/>
                        }
                    }}></Route>
                })
            }
        </Switch>
}
export default RouterView