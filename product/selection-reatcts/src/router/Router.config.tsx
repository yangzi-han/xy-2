import React from 'react'
import {PropType} from '../utils/interface'

//一级
import Favorpage from '../views/FavorPage'
import Loginpage from '../views/LoginPage'
import GoodsDetailPage from '../views/GoodsDetailPage'
import MainPage from '../views/MainPage'
import TopicDetaile from '../views/TopicDetaile'
import Categorys from '../views/Categorys'
import CollectPage from '../views/CollectPage'
import AddressPage from '../views/AddressPage'
import Seachpage from '../views/SeachPage'
import Add from '../views/AddPage'
//二级
import IndexPage from '../views/main/IndexPage'
import TypePage from '../views/main/TypePage'
import MyPage from '../views/main/MyPage'
import CartPage from '../views/main/CartPage'
import TopicPage from '../views/main/TopicPage'


const config = {
    routes :[
        {
            path:'/',
            redirect:'/main'
        },{
            path:'/login',
            component:Loginpage
        },{
            path:'/favor',
            component:Favorpage
        },{
            path:'/add',
            component:Add
        },{
            path:'/goodsDetail/:id',
            component:GoodsDetailPage
        },{
            path:'/seachPage',
            component:Seachpage
        },{
            path:'/collectpage',
            component:CollectPage
        },{
            path:'/addresspage',
            component:AddressPage
        },{
            path:'/topicDetaile/:id',
            component:TopicDetaile
        },
        {
            path:'/gategorys/:id',
            component:Categorys
        },{
            path:'/main',
            component:MainPage,
            children:[
                {
                    path: '/main/index',
                    component: IndexPage
                },{
                    path: '/main/topic',
                    component: TopicPage
                },{
                    path: '/main/type',
                    component: TypePage
                },{
                    path: '/main/cart',
                    component: CartPage
                },{
                    path: '/main/my',
                    component: MyPage
                },
                {
                    path:'/main',
                    redirect:'/main/index'
                }
            ]
        }
    ]
}

export default config as PropType