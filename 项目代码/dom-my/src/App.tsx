import React from 'react';
import './App.css';
// import Home from './views/Home';
// import {BrowserRouter as Router} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import config from './router/routerConfig'
import RouterView from './router/routerViews'
import {Provider} from 'react-redux'
import store from './store'
import 'antd-mobile/dist/antd-mobile.css'
const App: React.FC = () => {
  return (
    <div className="App">
     <Provider store={store}>
       <HashRouter>
        <RouterView routes={config.routes}/>
       </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
