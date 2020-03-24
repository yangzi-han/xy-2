import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {HashRouter} from 'react-router-dom'
import config from './router/Router.config'
import RouterView from './router/RouterView'

ReactDOM.render(
  <HashRouter>
    <RouterView routes={config.routes}></RouterView>
  </HashRouter>,document.getElementById('root')
);