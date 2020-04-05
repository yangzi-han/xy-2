import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from 'react-router-dom'
import config from './router/router'
import RouterView from './router/RouterView'
import store from './store'
import {Provider} from 'react-redux'
import "./static/font_y0v5zzz4arj/iconfont.css"
import 'antd-mobile/dist/antd-mobile.css';
import './static/font_bt4hdzaccew/iconfont.css'



ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <RouterView routes={config.routes}></RouterView>
    </HashRouter>
    </Provider>,document.getElementById('root')
);
