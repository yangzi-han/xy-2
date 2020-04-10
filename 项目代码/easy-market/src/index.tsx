import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
///引入路由
import {HashRouter} from 'react-router-dom'
import RouterView from './router/RouterView'
import config from './router/router.config'
//引入redux
import store from './store';
import {Provider} from 'react-redux'

//引入antd-mobile
import 'antd-mobile/dist/antd-mobile.css'

//引入icon图标
import './style/font_hr48v5umwc/iconfont.css'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterView routes={config.routes}/>
    </React.Suspense>
      
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

console.log=function(){}
