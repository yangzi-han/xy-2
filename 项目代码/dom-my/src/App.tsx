import React from 'react';
import './App.css';
// import Home from './views/Home';
// import {BrowserRouter as Router} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import config from './router/routerConfig'
import RouterView from './router/routerViews'
import {Provider} from 'react-redux'
import store from './store'
// import 'antd-mobile/dist/antd-mobile.css'
const App: React.FC = () => {
  return (
    <div className="App">
     <Provider store={store}>
       <HashRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
           <RouterView routes={config.routes}/>
        </React.Suspense>
       </HashRouter>
      </Provider>
    </div>
  );
}
// 重载console
console.log = function(){};
export default App;
