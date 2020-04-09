import { PropType } from '../utils/interface'

// 一级路由
import LoginPage from '../views/LoginPage'
import MainPage from '../views/MainPage'

import FavorPage from '../views/FavorPage'
import GoodsDetailPage from '../views/GoodsDetailPage'
import TopicDetailPage from '../views/TopicDetailPage'
import ClassifyPage from '../views/ClassifyPage'
import BrandDetailPage from '../views/BrandDetailPage'
import SearchPage from '../views/SearchPage'
import AddressPage from '../views/AddressPage'
import addAddressPage from '../views/addAddressPage'

// 二级路由
import IndexPage from '../views/main/IndexPage'
import CartPage from '../views/main/CartPage'
import TopicPage from '../views/main/TopicPage'
import TypePage from '../views/main/TypePage'
import MyPage from '../views/main/MyPage'

let config = {
    routes: [{
        path: '/login',
        // 登录页面
        component: LoginPage
    },{
        path: '/addAddress',
        // 地址
        component: addAddressPage
    },{
        path: '/address',
        // 地址
        component: AddressPage
    },{
        path: '/favor',
        // 收藏
        component: FavorPage
    },{
        path: '/brandDetail/:id',
        // 首页品牌制造商详情
        component: BrandDetailPage
    }, {
        path: '/search',
        // 分类搜索
        component: SearchPage
    }, {
        path: '/goodsDetail/:id',
        // 分类详情
        component: GoodsDetailPage
    },{
        path: '/classifypage/:id',
        // 分类---三级分类
        component: ClassifyPage
    },{
        path: '/topicDetail/:id',
        // 专题详情
        component: TopicDetailPage
    }, {
        path: '/main',
        component: MainPage,
        redirect: '/main/index',
        children: [{
            path: '/main/index',
            // 首页
            component: IndexPage
        },{
            path: '/main/topic',
            // 专题
            component: TopicPage
        },{
            path: '/main/type',
            // 分类
            component: TypePage
        },{
            path: '/main/cart',
            // 购物车
            component: CartPage
        },{
            path: '/main/my',
            // 我的
            component: MyPage
        }]
    },{
        path: '*',
        redirect: '/main/index'
    }]
}

export default config as PropType