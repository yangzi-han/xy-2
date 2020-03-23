import React,{useState,useEffect} from 'react';
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

const App: React.FC = () =>{
  //声明list
  let [list, setList] = useState<ItemType[]>([]);
  //声明总价
  let [totalPrice, setTotalPrice] = useState<number>(0);
  //声明总数
  let [totalNum, setTotalNum] = useState<number>(0);
  useEffect(()=>{
    fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(resData=>{
      setList(
        resData.data.data.map((item:object)=>{
          return {...item,num:0}
        })
      )
    })
  },[])

  useEffect(()=>{

    setTotalPrice(list.reduce((total,item:ItemType)=>{ 
        return total += item.num*item.retail_price
    },0))

    setTotalNum(list.reduce((total,item:ItemType)=>{ 
      return total += item.num
  },0))

  },[list])

  let numChange = (id:number,type:string) => {
    let newlist = [...list] as ItemType[]
    let index = newlist.findIndex((item:any)=>item.id === id)
    type == '+'?newlist[index].num++ : newlist[index].num--;
    if(newlist[index].num < 0){
      newlist[index].num = 0;
    }
    setList(
      newlist
    )
  }

  return <>
    <List list={list} numChange={numChange}/>
    <Footer totalPrice={totalPrice} totalNum={totalNum}/>
  </>
}

// class App extends React.Component<{}, StateType> {
//   state = {
//     list:[],
//     totalPrice: 0,
//     totalNum: 0
//   }
  // componentDidMount(){
  //   fetch('http://easymarket.jasonandjay.com/goods/list').then(res=>res.json()).then(resData=>{
  //     this.setState({
  //       list: resData.data.data.map((item:object)=>{
  //         return {...item,num:0}
  //       })
  //     })
  //   })
  // }
  // numChange = (id:number,type:string) => {
  //   let list = [...this.state.list] as ItemType[]
  //   let index = list.findIndex((item:any)=>item.id === id)
  //   type == '+'?list[index].num++ : list[index].num--;
  //   if(list[index].num < 0){
  //     list[index].num = 0;
  //   }
  //   this.setState({
  //     list
  //   })
  // }
  // get totalPrice(){
  //   let list = [...this.state.list] as ItemType[];
  //   return list.reduce((total,item)=>{
  //         total += item.num*item.retail_price
  //         console.log(total)
  //         return total
  //    },0)
  // }
  // get totalNum(){
  //   let list = [...this.state.list] as ItemType[];
  //   return list.reduce((total,item)=>{
  //         total += item.num
  //         return total
  //    },0)
  // }
//   render() {
//     let {list, totalPrice, totalNum} = this.state
//     return <>
//       <List list={list} numChange={this.numChange}/>
//       <Footer totalPrice={totalPrice} totalNum={totalNum}/>
//     </>
//   }
// }
export default App;
