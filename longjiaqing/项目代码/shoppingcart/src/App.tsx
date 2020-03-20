import React from 'react';
import './App.css'
import List from './components/List'
import Footer from './components/Footer'


interface ItemType{
  id:number,
  name:string,
  list_pic_url:string,
  retail_price:number,
  num:number
}
interface StateType{
  list:ItemType[],
  totalPice:number,
  totalNum:number
}
class App extends React.Component<{},StateType>{
  constructor(props:{}){
    super(props)
    this.numChange=this.numChange.bind(this)
  }
  state={
    list:[],
    totalPice:0,
    totalNum:0
  }
  componentDidMount(){
    fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(data=>{
      console.log('data...',data.data.data)
      this.setState({
        list:data.data.data.map((item:Object)=>{return {...item,num:0}})
      })
    })
  }
  numChange(id:number,type:string){
    // console.log(id,type)
    let list=[...this.state.list] as ItemType[]
    let index=list.findIndex((item:any)=>item.id===id)
    type=='+'?list[index].num++:list[index].num--
    if(list[index].num<0){
      list[index].num=0
    }
    this.setState({
      list
    })
  }
  render(){
    let {list,totalNum,totalPice} =this.state
    return <>
      <List list={list} numChange={this.numChange}/>
      <Footer totalNum={totalNum} totalPice={totalPice}/>
    </>
  }
}
export default App