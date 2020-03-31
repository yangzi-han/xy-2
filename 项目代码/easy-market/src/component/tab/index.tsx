import React from 'react'
import {RouteComponentProps} from 'react-router'
import styles from './index.module.scss'
interface PropsType{
    categoryList:Array<{
        [name:string]: string|number
    }>
}
export default class TabsBox extends React.Component<PropsType>{
    state={
        activeIndex:1005000
    }
    ChangeCategoryList=(id:any)=>{
        this.setState({
            activeIndex:id
        })
    }
    render(){
        // console.log(this.props)
        return (
            <div className={styles.tabsWrap}>
                {
                    this.props.categoryList.map(item=>{
                        return <li onClick={()=>{this.ChangeCategoryList(item.id)}} className={this.state.activeIndex==item.id?styles.active:''} key={item.id}>{item.name}</li>
                    })
                }
            </div>
        )
    } 
}
