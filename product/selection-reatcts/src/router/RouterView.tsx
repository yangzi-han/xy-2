import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {PropType} from '../utils/interface'
import {getToken} from '../utils/index'
import { connect } from 'react-redux';
import { loginAction } from '../store/actions/my';
// create-reacr-app 包名 --template typescript
interface StateType{
    info: {}
}
interface DispatchType{
    getUserinfo: ()=>void
}
const RouterView:React.FC<StateType&DispatchType&PropType>=(props)=>{
    return <Switch>
        {
            props.routes.map((item,key)=>{
                if(item.redirect){
                    return <Redirect from={item.path} exact key={key}  to={item.redirect}/>
                }else{
                    return <Route  path={item.path} key={key} render={renderProps=>{
                         // 路由拦截
                       let {match: {path}} = renderProps;
                       if (path !== '/login' && path !== '/index/home' && !getToken()){
                            return <Redirect to={`/login?redirect=${encodeURIComponent(path)}`}/>
                        }
                         // 如果已经登陆且没有用户信息，就去拉取用户信息
                        // if (getToken() && !Object.keys(props.info).length){
                        //       props.getUserinfo();
                        // }

                        if(item.children){
                            return <item.component routes={item.children} {...renderProps} />
                        }else{
                            return <item.component {...renderProps} />
                        }
                    }}/>
                }
            })
        }
    </Switch>
}
const mapStateToProps = (state: any)=>{
    return {
        info: state.my.info
    }
}

const mapDispatchToProps = (dispatch: Function)=>{
    return {
        getUserinfo: ()=>dispatch(loginAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterView)