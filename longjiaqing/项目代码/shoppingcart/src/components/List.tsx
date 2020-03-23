import React from 'react';
import styles from './link.module.scss'
interface PropsType{
  list:ItemType[],
  numChange:Function
}
interface ItemType{
  id:number,
  name:string,
  list_pic_url:string,
  retail_price:number,
  num:number
}
// const List:React.FC=()=>{
//   return <>
//   {
//      this.props.list.map((item) => {
//         return <li key={item.id}>
//             <img src={item.list_pic_url} alt="" />
//             <div className="desc">
//                 <p>{item.name}</p>
//                 <p>{item.retail_price}</p>
//             </div>
//             <div className={styles.action}>
//                 <button onClick={()=>this.props.numChange(item.id, '+')}>+</button>
//                 <span>{item.num}</span>
//                 <button onClick={()=>this.props.numChange(item.id, '-')}>-</button>
//             </div>
//         </li>
//     })
//   }
// </>
// }
class List extends React.Component<PropsType>{
  render(){
  // console.log(this.props.list)
  return <>
    {
       this.props.list.map((item) => {
          return <li key={item.id}>
              <img src={item.list_pic_url} alt="" />
              <div className="desc">
                  <p>{item.name}</p>
                  <p>{item.retail_price}</p>
              </div>
              <div className={styles.action}>
                  <button onClick={()=>this.props.numChange(item.id, '+')}>+</button>
                  <span>{item.num}</span>
                  <button onClick={()=>this.props.numChange(item.id, '-')}>-</button>
              </div>
          </li>
      })
    }
    </>
  }
}
export default List