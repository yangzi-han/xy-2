import React from 'react'
import {Link} from 'react-router-dom'
import RouterView from '../../router/routerViews'
class First extends React.Component<any,any>{
 state={
        currentIndex:0
  }
  check_tittle_index(index:any){
     return index===this.state.currentIndex ? "active":" "
  }
  render(){
      return (
          <div className="home">
             <div className="main">
               <RouterView routes={this.props.routes}></RouterView>
             </div>
             <div className="footer">
               <Link to="/index/home/room" onClick={() => {this.setState({currentIndex : 0})}} className={ this.check_tittle_index(0)}>
                      <span className="mess1">主页</span> 
               </Link>
               <Link to="/index/home/mine" onClick={() => {this.setState({currentIndex : 1})}} className={ this.check_tittle_index(1)}>
                      <span className="mess1">我的</span>  
               </Link>
             </div> 
          </div>
      )
  }
}
export default First