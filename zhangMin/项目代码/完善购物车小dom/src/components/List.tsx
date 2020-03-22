import * as React from 'react';
import style from './List.module.scss'
interface FooterType{
   list:ItemType[],
   numChange:Function
}
interface ItemType {
   id:number,
   name:string,
   list_pic_url: string,
   retail_price: number,
   num: number
}
class List extends React.Component<FooterType>{
   render(){
       return <>
          {
              this.props.list.map((item)=>{
                 return <li key={item.id}>
                   <img src={item.list_pic_url} alt=""/>
                   <div className="desc">
                        <p>{item.name}</p>
                        <p>{item.retail_price}</p>
                    </div>
                    <div className={style.action}>
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