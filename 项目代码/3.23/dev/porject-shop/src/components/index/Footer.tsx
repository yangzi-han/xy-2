import React from 'react';

interface PropsType{
  totalPrice: number,
  totalNum: number
}

class Footer extends React.Component<PropsType>{

  render(){
    return <>
      <span>{`总数:${this.props.totalNum}`}</span>
      <span>{`总价:${this.props.totalPrice}`}</span>
      <button>立即支付</button>
    </>;
  }
}

export default Footer;