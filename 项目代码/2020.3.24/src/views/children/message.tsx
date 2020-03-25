import React, { Component } from 'react';
import request from '../../until/request'
import {connect} from 'react-redux'
import '../../static/foot/font_u3qmegalvjp/iconfont.css'
class Home extends Component {
   //删除
    dele(item:any,index:any){
      let {list}:any=this.props
      list.splice(index,1)
      this.setState({
         list:list
      })
    }
    render() {
      let {list}:any=this.props
      // console.log(list,'111')
        return (
           <div className="home">
             <div className="header header-1">
               <span className="spn1">
                 <span className="iconfont icon-jiahao"></span>
               </span>
               <span className="spn3">Stocks</span>
               <span className="spn2">Done</span>
             </div>
             <div className="main main1">
               <ul className="uls">
                 {
                   //@ts-ignore
                   list.map((item,index)=>{
                      return <li key={index}>
                        <div className="left">
                         <div onClick={()=>{this.dele(item,index)}}>-</div>
                        </div>
                        <div className="right">
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
       this.props.getData()
   }
}
let mapStateToProps=(store:any)=>{
  const {list}=store
  return {
     list
  }
}
let mapDispathToProps=(dispatch:any)=>{
  return {
     getData(){
       request.get('/finance/stock/shall?gid=&type=&key=e36e386bf637ce2074b52d14ca8bdab9').then((data:any)=>{
        dispatch({type:"ADD_LIST",list:data})
       })
     }

  }
}
//@ts-ignore
Home=connect(mapStateToProps,mapDispathToProps)(Home)
export default Home