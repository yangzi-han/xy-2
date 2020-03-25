import React, { Component } from 'react';
import '../../static/foot/font_u3qmegalvjp/iconfont.css'
import request from '../../until/request'
import {connect} from 'react-redux'
class Home extends Component {
    state={
      names:'',
      arrNew:[],
    }
    search(){
       let {navlist}:any=this.props
       let {names,arrNew}:any=this.state
       arrNew=navlist.filter((item:any)=>{
           return item.name.includes(names)
       })
       this.setState({
         arrNew
       })
    }
    addlist(item:any,index:any){
      //@ts-ignore
       this.props.addList(item)
    }
    render() {
        // let {list}:any=this.props
        let {names,arrNew}:any=this.state
      //  console.log(arrNew)
        console.log(this,'111')
        return (
            <div className="home">
              <div className="header header-1">
                <span>
                  <span className="iconfont icon-sousuo s1" onClick={()=>{this.search()}}></span>
                </span>
                <span>
                  <input type="text" className="ipt" ref="sear" value={names} onChange={(e)=>{this.setState({names:e.target.value})}}/>
                </span>
                <span>
                  <span className="iconfont icon-chahao s1"></span> 
                </span>
                <span className="spn1">Cancel</span>
              </div>
              <div className="main main1">
                <ul className="uls">
                  {
                      arrNew.map((item:any,index:any)=>{
                          return<li key={index} onClick={()=>{this.addlist(item,index)}}>
                                    <div className="right1">
                                      <p>{item.name}</p>
                                      <p className="p1">编号:{item.symbol}</p>
                                      <p className="p2">详情</p>
                                    </div>
                                 </li>
                            })
                  }
                </ul>
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
          dispatch({type:"BDD_LIST",navlist:data})
         })
       },
       addList:(payload: any)=>{
          dispatch({type:"CDD_LIST",payload})
       }
    }
  }
  //@ts-ignore
  Home=connect(mapStateToProps,mapDispathToProps)(Home)
  export default Home