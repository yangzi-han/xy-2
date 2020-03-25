import React, { useState,useEffect } from 'react';
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
const App:React.FC=()=>{
  ///声明list
  let [list,setList]=useState<ItemType[]>([]);
  //声明总价
  let [totalPice,setotalPice]=useState<number>(0);
  //声明总数
  let [totalNum,settotalNum]=useState<number>(0);
  useEffect(()=>{
    fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(data=>{
      console.log('data...',data.data.data)
      setList(
        data.data.data.map((item:Object)=>{return {...item,num:0}})
      )
    })
  },[]);//模拟componentdDidMount将第二个参数给个空数组[]  componentwillmount  updata
  
  useEffect(()=>{
    setotalPice(list.reduce((prev,item:ItemType)=>{
      return prev+=item.retail_price*item.num
    },0))
    settotalNum(list.reduce((prev,item:ItemType)=>{
      return prev+=item.num
    },0))
  },[list])

  let numChange=(id:number,type:string)=>{
    // console.log(id,type)
    let newlist=[...list] as ItemType[]
    let index=newlist.findIndex((item:any)=>item.id===id)
    type=='+'?newlist[index].num++:newlist[index].num--
    if(newlist[index].num<0){
      newlist[index].num=0
    }
    setList(newlist)
  }

  return <>
      <List list={list} numChange={numChange}/>
      <Footer totalNum={totalNum} totalPice={totalPice}/>
    </>
}

// class App extends React.Component<{},StateType>{
//   constructor(props:{}){
//     super(props)
//     this.numChange=this.numChange.bind(this)
//   }
//   state={
//     list:[],
//     totalPice:0,
//     totalNum:0
//   }
//   componentDidMount(){
//     fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(data=>{
//       console.log('data...',data.data.data)
//       this.setState({
//         list:data.data.data.map((item:Object)=>{return {...item,num:0}})
//       })
//     })
//   }
//   numChange(id:number,type:string){
//     // console.log(id,type)
//     let list=[...this.state.list] as ItemType[]
//     let index=list.findIndex((item:any)=>item.id===id)
//     type=='+'?list[index].num++:list[index].num--
//     if(list[index].num<0){
//       list[index].num=0
//     }
//     this.setState({
//       list
//     })
//   }
//   get totalPice(){
//     return this.state.list.reduce((prev,item:ItemType)=>{
//       return prev+=item.retail_price*item.num
//     },0)
//   }
//   get totalNum(){
//     return this.state.list.reduce((prev,item:ItemType)=>{
//       return prev+=item.num
//     },0)
//   }
//   render(){
//     let {list,totalNum,totalPice} =this.state
  //   return <>
  //     <List list={list} numChange={this.numChange}/>
  //     <Footer totalNum={this.totalNum} totalPice={this.totalPice}/>
  //   </>
  // }
// }
export default App