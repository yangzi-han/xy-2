import React from 'react';
import {PropType} from '../utils/interface'
import Home from "../views/Home";
const MyHome= React.lazy(() => import('../views/children/Myhome'));
const Release= React.lazy(() => import('../views/children/release'));
const Massage= React.lazy(() => import('../views/children/message'));
const My= React.lazy(() => import('../views/children/my'));
const Login= React.lazy(() => import('../views/login'));
const Regst= React.lazy(() => import('../views/regest'));
const Zhuan= React.lazy(() => import('../views/children/zhuan'));
const Detail= React.lazy(() => import('../views/detail/detail'));
const Search = React.lazy(() => import('../views/search/search'));
const TypeDetail = React.lazy(() => import('../views/detail/detailType'));
const  HomeDetail = React.lazy(() => import('../views/detail/homeDetail'));
const GoodsDetail = React.lazy(() => import('../views/detail/detailGoods'));
const Address = React.lazy(() => import('../views/address/address'));
const  Add = React.lazy(() => import('../views/address/add'));
const Collect = React.lazy(() => import('../views/collect/collect'));


// import MyHome from '../views/children/Myhome';
// import Release from '../views/children/release';
// import Massage from '../views/children/message';
// import My from '../views/children/my';
// import Login from '../views/login'
// import Regst from '../views/regest'
// import Zhuan from '../views/children/zhuan'
// import Detail from '../views/detail/detail'
// import Search from '../views/search/search'
// import TypeDetail from '../views/detail/detailType'
// import HomeDetail from '../views/detail/homeDetail'
// import GoodsDetail from '../views/detail/detailGoods'
// import Address from '../views/address/address'
// import Add from '../views/address/add'
// import Collect from '../views/collect/collect'
let config = {
    routes:[{
        path:'/',
        redirect:'/index/home'
       },{
        path:'/index',
        component:Home,
        children:[{
            path:'/index/home',
            component:MyHome
        },{
            path:'/index/release',
            component:Release
        },{
            path:'/index/massage',
            component:Massage
        },{
            path:'/index/my',
            component:My
        },{
            path:'/index/zhuan',
            component:Zhuan
        }]
    },{
        path:'/login',
        component:Login
    },{
        path:'/regest',
        component:Regst
    },{
        path:'/detail/:id',
        component:Detail
    },{
        path:'/search',
        component:Search
    },{
        path:'/typeDetail/:id',
        component:TypeDetail
    },{
        path:'/homeDetail/:id',
        component:HomeDetail
    },{
        path:'/goodsDetail/:id',
        component:GoodsDetail
    },{
        path:'/address',
        component:Address
    },{
        path:'/add',
        component:Add
    },{
        path:'/collect',
        component:Collect
    }]
}
export default config as PropType