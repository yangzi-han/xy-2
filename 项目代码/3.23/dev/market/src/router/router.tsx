
import {PropType} from '../utils/interface'

//引入一级路由

import LoginPage from '../views/LoginPage'
import AddressPage from '../views/AddressPage'
import BrandDetalPage from '../views/BrandDetalPage'
import FavorPage from '../views/FavorPage'
import GoodsDetail from '../views/GoodsDetail'
import MainPage from '../views/MainPage'
import TopicDetail from '../views/TopicDetail'
import classifyPage from '../views/classifyPage'
import TypeDetail from '../views/Typedetail'
import Search from '../views/search'
import ChannerDetail from '../views/channeldetail'
import Manufacturer from '../views/manufacturer'
import Gooddetail from '../views/GoodsDetail'
//引入二级路由

import IndexPage from '../views/Main/IndexPage'
import CartPage from '../views/Main/CartPage'
import MyPage from '../views/Main/MyPage'
import TopicPage from '../views/Main/TopicPage'
import TypePage from '../views/Main/TypePage'

let config={
    routes:[
        {
            path:"/login",
            component: LoginPage
        },
        {
            path:"/address",
            component: AddressPage
        },
        {
            path:"/brandDetal",
            component: BrandDetalPage
        },
        {
            path:"/favor",
            component: FavorPage
        },
        {
            path:"/goodsDetail",
            component: GoodsDetail
        },
        {
            path:"/topicDetail/:id",
            component: TopicDetail
        },
        {
            path:"/classify",
            component: classifyPage
        },
        
        {
            path:"/typedetail/:id",
            component:TypeDetail
        },
        {
            path:"/search",
            component:Search
        },
        {
            path:"/channeldetail/id=:id&index=:index",
            component:ChannerDetail
        },
        {
            path:"/manufacturer/:id",
            component:Manufacturer
        },
        {
            path:"/goodsdetail/:id",
            component:Gooddetail
        },
        {
            path:"/main",
            component:MainPage,
            redriect:"/main/index",
            children:[
                {
                    path:"/main/index",
                    component:IndexPage
                },
                {
                    path:"/main/cart",
                    component:CartPage
                },
                {
                    path:"/main/my",
                    component:MyPage
                },
                {
                    path:"/main/topic",
                    component:TopicPage
                },
                {
                    path:"/main/type",
                    component:TypePage
                }
            ]
        },
        {
            path: '*',
            redirect: '/main/index'
        }

    ]
}

export default config as PropType
