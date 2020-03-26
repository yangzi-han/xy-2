import * as React from 'react'
import {Switch,Redirect,Route} from 'react-router-dom'
import {PropType} from '../utils/interface'
import {getToken} from '../utils/index'

const RouterView: React.FC<PropType>= props =>{
    return <Switch>
        {
            props.routes.map((item,key)=>{
                if(item.redirect){
                    return <Redirect from={item.path} exact key={key} to={item.redirect} />
                }else{
                    return <Route path={item.path} key={key} render={props => {
                        // 路由拦截
                        let {path} = props.match//获取到上一个页面的路由
                        console.log(props,'1111111')
                        if(path !== '/login' && path !== '/main' && !getToken()){//判断
                            return <Redirect to={`/login?redirect=${encodeURIComponent(path)}`} />
                        }
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