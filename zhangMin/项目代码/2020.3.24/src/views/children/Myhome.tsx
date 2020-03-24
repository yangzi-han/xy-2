import React, { Component } from 'react';
// import '../../static/home.css'
import '../../static/foot/font_u3qmegalvjp/iconfont.css'
import {connect} from 'react-redux'
import request from '../../until/request'
import Release from '../children/release'
class Home extends Component {
    render() {
        let {navlist}:any=this.props
        console.log(navlist)
        // let {newNav}=this.state
        return (
            <div className="home">
              <div className="main1 main">
              <ul className="uls uls1">
                  {
                      navlist.map((item:any,index:any)=>{
                          return<li key={index}>
                                    <div className="left">
                                      <p>{item.name}</p>
                                    </div>
                                    <div className="right1 right">
                                      <p className="p1"><div className="code">{item.trade}</div><div className="add">{item.pricechange}</div></p>
                                    </div>
                                 </li>
                            })
                  }
                </ul>
              </div>
              <div className="footer footer-2">
                <Release/>
              </div>
              <div className="footer-1 footer">
                <span>
                  Yahoo!
                </span>
                <span>
                  Marked closed
                </span>
                <span>
                  <span className="iconfont icon-gengduo"></span> 
                </span>
              </div>
            </div>
        );
    }
    componentDidMount():void{
        //@ts-ignore
        this.props.getNav()
    }
}
let mapStateToProps=(store:any)=>{
    const {navlist}=store
    return {
       navlist
    }
  }
  let mapDispathToProps=(dispatch:any)=>{
    return {
       getNav(){
         request.get('/finance/stock/szall?stock=&page=&type=&key=e36e386bf637ce2074b52d14ca8bdab9').then((data:any)=>{
          dispatch({type:"DDD_LIST",navlist:data})
         })
       }
    }
  }
  //@ts-ignore
  Home=connect(mapStateToProps,mapDispathToProps)(Home)
  export default Home