import React from 'react';
import List from './components/List'
import Footer from './components/Footer'
interface ItemType {
  id: number,
  name: string,
  list_pic_url: string,
  retail_price: number,
  num: number
}
interface StateType{
  list: ItemType[],
  totalPrice: number,
  totalNum: number
}
class App extends React.Component<{}, StateType>{
  constructor(props:{}){
    super(props);
  }
  state = {
    list: [],
    totalPrice: 0,
    totalNum: 0
  } 
  componentDidMount(){
    fetch('http://easymarket.jasonandjay.com/goods/list')
    .then(res=>res.json())
    .then(data=>{
      console.log('data...', data, data.data.data);
      this.setState({
        list: data.data.data.map((item:object)=>{return {...item, num:0}})
      })
    })
  }
  numChange = (id:number, type:string)=>{
    let list = [...this.state.list] as ItemType[];
    let index = list.findIndex((item:any)=>item.id===id);
    type==='+'?list[index].num++: list[index].num--;
    if (list[index].num < 0){
      list[index].num = 0;
    }
    this.setState({
      list
    })
  }
  // totalPrice(){
  //    let list = [...this.state.list] as ItemType[];
  //    let {totalPrice}= this.state
  //    console.log(list)
  //    for(let i=0;i<list.length;i++){
  //      totalPrice+=list[i].num*list[i].retail_price
  //    }
  //    this.setState({
  //       totalPrice
  //    })
  //    console.log(totalPrice)
  // }
  get totalPrice(){
    let list = [...this.state.list] as ItemType[];
    return list.reduce((total,item)=>{
          total += item.num*item.retail_price
          console.log(total)
          return total
     },0)
  }
  get totalNum(){
    let list = [...this.state.list] as ItemType[];
    return list.reduce((total,item)=>{
          total += item.num
          return total
     },0)
  }

  render(){
    let {list} = this.state;
    return <>
      <List list={list} numChange={this.numChange}/>
      <Footer totalPrice={this.totalPrice} totalNum={this.totalNum}/>
    </>;
  }
}
export default App;
