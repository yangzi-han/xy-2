import React from 'react';

interface PropsType{
  totalPice:number,
  totalNum:number
}
class Footer extends React.Component<PropsType>{
  state={
    list:[],
    totalPice:0,
    totalNum:0
  }
  render(){
    // console.log(this.props)
    return <>
      <span>总数量:{this.props.totalNum}</span>
      <span>总价:{this.props.totalPice}</span>
      <button>去支付</button>
    </>
  }
}
export default Footer