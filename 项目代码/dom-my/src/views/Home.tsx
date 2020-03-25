import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import RouterView from '../router/routerViews'
import '../static/home.css'
import '../static/foot/font_y0v5zzz4arj/iconfont.css'
class Home extends Component<any> {
    state={
          currentIndex:0
    }
    check_tittle_index(index:number){
       return index===this.state.currentIndex ? "active":" "
    }
    render() {
        return (
            <div className="home"> 
                <div className="main">
                    <RouterView routes={this.props.routes}></RouterView>
                </div>
                <div className="footer">
                    <Link to="/index/home" onClick={() => {this.setState({currentIndex : 0})}} className={ this.check_tittle_index(0)}>
                      <p className="iconfont icon-shouye"></p>  
                      <span className="mess1">首页</span> 
                    </Link>
                    <Link to="/index/release" onClick={() => {this.setState({currentIndex : 1})}} className={ this.check_tittle_index(1)}>
                      <p className="iconfont icon-zhuantifuwu"></p>   
                      <span className="mess1">专题</span>  
                    </Link>
                    <Link to="/index/massage" onClick={() => {this.setState({currentIndex : 2})}} className={ this.check_tittle_index(2)}>
                      <p className="iconfont icon-fenlei"></p>   
                      <span className="mess1">分类</span> 
                    </Link>
                    <Link to="/index/my" onClick={() => {this.setState({currentIndex : 3})}} className={ this.check_tittle_index(3)}>
                      <p className="iconfont icon-gouwuche"></p>  
                      <span className="mess1">购物车</span> 
                    </Link>
                    <Link to="/index/zhuan" onClick={() => {this.setState({currentIndex : 4})}} className={ this.check_tittle_index(4)}>
                      <p className="iconfont icon-ziyuan"></p>  
                      <span className="mess1">我的</span> 
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;