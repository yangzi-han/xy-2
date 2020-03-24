import React from 'react'
import RouterView from '../router/RouterView'
import { PropType, RouterItemType } from '../utils/interface'
import {NavLink} from 'react-router-dom'

let MainPage: React.FC<PropType> = props=>{
    return <>
        <div>
            <RouterView routes={props.routes}/>
        </div>
        <footer>
            <NavLink to="/main/index">首页</NavLink>
            <NavLink to="/main/topic">专题</NavLink>
            <NavLink to="/main/type">分类</NavLink>
            <NavLink to="/main/cart">购物车</NavLink>
            <NavLink to="/main/my">我的</NavLink>
        </footer>
    </>
}

export default MainPage;