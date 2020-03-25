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

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RouterView routes={config.routes}/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

