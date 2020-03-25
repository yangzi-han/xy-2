import React from 'react';
import  styles from './List.module.scss'

interface Proptypes {
    list: ItemTypes[],
    numChange: Function
}
interface ItemTypes {
    id: number,
    name: string,
    list_pic_url: string,
    retail_price: number,
    num:number
}
class List extends React.Component<Proptypes>{
    render() {
        return <div className={styles.div}>
            {
                this.props.list.map((item) => {
                    return <li key={item.id} >
                        <img src={item.list_pic_url} alt="" />
                        <div className={styles.desc}>
                            <p>{item.name}</p>
                            <p>{item.retail_price}</p>
                        </div>
                        <div className={styles.action}>
                            <button onClick={()=>this.props.numChange(item.id,"+")}>+</button>
                            <span>{item.num}</span>
                            <button onClick={()=>this.props.numChange(item.id,"-")}>-</button>
                        </div>
                    </li>
                })
            }
        </div>
    }
}
export default List