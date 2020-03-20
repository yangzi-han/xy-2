import React from 'react';
import './App.css';
import List from './components/List'
import Footer from './components/Footer'

interface ItemTypes {
  id: number,
  name: string,
  list_pic_url: string,
  retail_price: number,
  num:number
}
interface StateTypes{
  list:ItemTypes[],
  totalPrice:number,
  totalNum:number
}
class App extends React.Component<{},StateTypes>{

  constructor(props:{}){
    super(props)
    this.numChange=this.numChange.bind(this)
  }
  state = {
    list:[],
    totalPrice:0,
    totalNum:0

  }
  numChange(id:number,type:string):void{
    let list=[...this.state.list] as ItemTypes[]
    let index=list.findIndex((item:any)=>item.id===id)
    type==='+'?list[index].num++:list[index].num--;
    let totalNum=this.state.totalNum 
    let totalPrice=this.state.totalPrice
    if(type==="+"){
    totalNum++
    totalPrice+=list[index].retail_price
    }else{
      totalNum--
      totalPrice-=list[index].retail_price
    }
   
    if(list[index].num<0){
      list[index].num=0
    }else{
      this.setState({
        list,
        totalNum,
        totalPrice
      })
    }
    

  }
  componentDidMount () {
    fetch('http://easymarket.jasonandjay.com/goods/list')
    .then(res=>res.json())
    .then(data=>{
      this.setState({
        list:data.data.data.map((item:object)=>{return{...item,num:0}})
      })
    })
  }
  render() {
   var {list, totalNum, totalPrice} = this.state
    return <>
    <List list={list} numChange={this.numChange} />
    <Footer totalNum={totalNum} totalPrice= {totalPrice} />
    </>
  }
}
export default App;
