import Home from "../views/Home";
import MyHome from '../views/children/Myhome';
import Release from '../views/children/release';
import Massage from '../views/children/message';
import My from '../views/children/my';
import Login from '../views/login'
import Regst from '../views/regest'
import Zhuan from '../views/children/zhuan'
export default {
    routes:[{
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
        path:'/',
        redirect:'/index/home'
    },{
        path:'/login',
        component:Login
    },{
        path:'/regest',
        component:Regst
    }]
}