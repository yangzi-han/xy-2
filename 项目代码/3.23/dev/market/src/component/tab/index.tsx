import React from 'react'
import {RouteComponentProps} from 'react-router'
import styles from './index.module.scss'
import {connect} from 'react-redux'
import {getClassifyCurrentAction} from '../../store/actions/classify'
interface PropsType{
    categoryList:Array<{
        [name:string]: string|number
    }>
}
interface DispatchType{
    getClassifyCurrent:Function
}
class TabsBox extends React.Component<PropsType&DispatchType>{
    state={
        activeIndex:1005000
    }
    ChangeCategoryList=(id:any)=>{
        this.props.getClassifyCurrent(id)
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
const mapStateToProps = (state: any)=>{
    // console.log('state.classifytab...', state.classify)
    return {...state.classify}
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        // getClassifyCurrent: (id:string)=>{
        //     dispatch(getClassifyCurrentAction(id))
        // }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TabsBox)