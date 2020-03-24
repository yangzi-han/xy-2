import React from 'react';
import './App.css';
// import Home from './views/Home';
import {BrowserRouter as Router} from 'react-router-dom'
import routes from './router/routerConfig'
import RouterView from './router/routerViews'
import {Provider} from 'react-redux'
import store from './store'
import './api/mockdata'
declare global{
  interface Window{
      store:any
  }
}
window.store = store
const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <RouterView routes={routes.routes} />      
        </Router>
      </Provider>
    </div>
  );
}

export default App;
