import Home from "../views/Home";
// import MyHome from '../views/children/Myhome';
// import Release from '../views/children/release';
// import Massage from '../views/children/message';
// import My from '../views/children/my';
import First from '../views/newChild/firstHome';
import Addlist from '../views/newChild/addList';
import List from '../views/newChild/list';
import Mine from '../views/newChild/mine';
import Message from '../views/newChild/message';
import Login from '../views/login';

import TitleH from '../views/newChild/child/titleHome'
import TilteM from '../views/newChild/child/titleMine'
export default {
    routes:[{
        path:'/index',
        component:Home,
        children:[{
            path:'/index/home',
            component:First,
            children:[
                {
                    path:'/index/home/room',
                    component:TitleH
                },
                {
                    path:'/index/home/mine',
                    component:TilteM
                }
            ]
        },{
            path:'/index/list',
            component:List
        },{
            path:'/index/massage',
            component:Message
        },{
            path:'/index/mine',
            component:Mine
        },{
            path:'/index/addlist',
            component:Addlist
        }]
    },{
        path:'/',
        redirect:'/index/home/room'
    },{
        path:'/login',
        component:Login
    }]
}