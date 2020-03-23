import React from 'react';
import './App.css';
import List from './components/List'
import Footer from './components/Footer'

interface ItemType{
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

class App extends React.Component<{}, StateType> {
  state = {
    list:[],
    totalPrice: 0,
    totalNum: 0
  }
  componentDidMount(){
    fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(resData=>{
      this.setState({
        list: resData.data.data.map((item:object)=>{
          return {...item,num:0}
        })
      })
    })
  }
  numChange = (id:number,type:string) => {
    let list = [...this.state.list] as ItemType[]
    let index = list.findIndex((item:any)=>item.id === id)
    type == '+'?list[index].num++ : list[index].num--;
    if(list[index].num < 0){
      list[index].num = 0;
    }
    this.setState({
      list
    })
  }
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
  render() {
    let {list, totalPrice, totalNum} = this.state
    return <>
      <List list={list} numChange={this.numChange}/>
      <Footer totalPrice={totalPrice} totalNum={totalNum}/>
    </>
  }
}
export default App;
