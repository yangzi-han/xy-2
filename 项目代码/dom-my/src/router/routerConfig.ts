import Home from "../views/Home";
import {PropType} from '../utils/interface'
import MyHome from '../views/children/Myhome';
import Release from '../views/children/release';
import Massage from '../views/children/message';
import My from '../views/children/my';
import Login from '../views/login'
import Regst from '../views/regest'
import Zhuan from '../views/children/zhuan'
import Detail from '../views/detail/detail'
import Search from '../views/search/search'
import TypeDetail from '../views/detail/detailType'
import HomeDetail from '../views/detail/homeDetail'
import GoodsDetail from '../views/detail/detailGoods'
import Address from '../views/address/address'
import Add from '../views/address/add'
import Collect from '../views/collect/collect'
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