import React, { Component } from 'react';

import RouterView from '../router/routerViews'
import '../static/home.css'
import '../static/foot/font_ur9bpv15dnh/iconfont.css'
class Home extends Component<any> {
    state={
          currentIndex:0
    }
    check_tittle_index(index:any){
       return index===this.state.currentIndex ? "active":" "
    }
    render() {
        return (
            <div className="home"> 
                <div className="main">
                    <RouterView routes={this.props.routes}></RouterView>
                </div>
                {/* <div className="footer">
                    <Link to="/index/home" onClick={() => {this.setState({currentIndex : 0})}} className={ this.check_tittle_index(0)}>
                      <p className="iconfont icon-xiaoxi"></p>  
                      <span className="mess1">消息</span> 
                    </Link>
                    <Link to="/index/release" onClick={() => {this.setState({currentIndex : 1})}} className={ this.check_tittle_index(1)}>
                      <p className="iconfont icon-lianxiren"></p>   
                      <span className="mess1">联系人</span>  
                    </Link>
                    <Link to="/index/massage" onClick={() => {this.setState({currentIndex : 2})}} className={ this.check_tittle_index(2)}>
                      <p className="iconfont icon-yanjing"></p>   
                      <span className="mess1">看点</span> 
                    </Link>
                    <Link to="/index/my" onClick={() => {this.setState({currentIndex : 3})}} className={ this.check_tittle_index(3)}>
                      <p className="iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai"></p>  
                      <span className="mess1">动态</span> 
                    </Link>
                </div> */}
            </div>
        );
    }
}

export default Home;