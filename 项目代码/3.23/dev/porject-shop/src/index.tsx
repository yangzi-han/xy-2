import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// 路由
import {HashRouter} from 'react-router-dom'
import config from './router/router'
import RouterView from './router/RouterView'
// redux
import store from './store'
import { Provider } from 'react-redux'
// antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';

import './font_y0v5zzz4arj/iconfont.css'
import './font_bt4hdzaccew/iconfont.css'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
        <RouterView routes={config.routes}/>
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// serviceWorker.unregister();
