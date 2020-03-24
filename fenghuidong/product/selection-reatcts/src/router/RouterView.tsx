import * as React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'
import {PropType} from '../utils/interface'

const RouterView: React.FC<PropType>= props =>{
    return <Switch>
        {
            props.routes.map((item,key)=>{
                if(item.redirect){
                    return <Redirect from={item.path} exact key={key} to={item.redirect} />
                }else{
                    return <Route path={item.path} key={key} render={props => {
                        if(item.children){
                            return <item.component routes={item.children} {...props} />
                        }else{
                            return <item.component {...props} />
                        }
                    }} />
                }
            })
        }
    </Switch>
}
export default RouterView