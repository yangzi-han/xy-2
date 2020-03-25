import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from 'react-router-dom'
import config from './router/router'
import RouterView from './router/RouterView'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <RouterView routes={config.routes}></RouterView>
    </HashRouter>
    </Provider>,document.getElementById('root')
);
