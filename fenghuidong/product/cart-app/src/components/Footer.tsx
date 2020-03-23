import React from 'react'
import style from './List.module.scss'

interface PropsType{
    totalPrice: number,
    totalNum: number
}

class Footer extends React.Component<PropsType>{
    render(){
        return <>
            <div className={style.footer}>
            <div className={style.left}>
              <span>总价:</span>
              <span>{this.props.totalPrice}</span>
            </div>
            <div className={style.right}>
              <span>总数量:</span>
              <span>{this.props.totalNum}</span>  
            </div>
         </div>
        </>
    }
}

export default Footer