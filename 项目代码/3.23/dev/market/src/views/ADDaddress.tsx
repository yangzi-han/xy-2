/* eslint-disable no-restricted-globals */
import React,{useState} from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styles from '../scss/ADDaddress.module.scss'
import {ADDaddressAction} from '../store/actions/ADDaddress'
interface DispatchType{
    ADDaddress:Function
}
let ADDaddress: React.FC<RouteComponentProps&DispatchType> = props => {
    let [data1,Setdata1]=useState("")
    let [data2,Setdata2]=useState("")
    let [data3,Setdata3]=useState("")
    let [data4,Setdata4]=useState("")
    let change1=(e:any)=>{
        Setdata1(data1=e.target.value)
    }
    let change2=(e:any)=>{
        Setdata2(data2=e.target.value)
    }
    let change3=(e:any)=>{
        Setdata3(data3=e.target.value)
    }
    let change4=(e:any)=>{
        Setdata4(data4=e.target.value)
    }
    let save=()=>{
        props.ADDaddress(data1,data2,data3,data4)
        props.history.push("/address")
    }
    let qx=()=>{
        
    }
    return <>
    <div className={styles.top}>新增地址</div>
    <div className={styles.center}>
        <input type="text" placeholder="姓名" onChange={()=>change1(event)} value={data1}/>
        <input type="text" placeholder="电话号码" onChange={()=>change2(event)}  value={data2}/>
        <input type="text" placeholder="请输入地址" onChange={()=>change3(event)}  value={data3}/>
        <input type="text" placeholder="详细地址" onChange={()=>change4(event)}  value={data4}/>
    </div>
    <div className={styles.bottom}>
        <span className={styles.qx} onClick={()=>qx()}>取消</span>
        <span className={styles.bc} onClick={()=>save()} >保存</span>
    </div>
    </>;
}
let mapStateToProps = (state: any) => {
    return {
       
    }
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        ADDaddress:(name:string,mobile:string,district_id:string,address:string)=>{
            dispatch(ADDaddressAction(name,mobile,district_id,address))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ADDaddress)