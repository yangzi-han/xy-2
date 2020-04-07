import React ,{useEffect,useState}from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import { List, Picker,Toast} from 'antd-mobile';
import { district} from 'antd-mobile-demo-data';
import {addRessAddAction} from '../../store/actions/address'
import {connect} from 'react-redux'
interface DispatchProps{
   getAddRessAdd:Function
}
let Address:React.FC<RouteComponentProps&DispatchProps>=props=>{
  let [name,setName]=useState<string>()
  let [mobile,setMobile]=useState<string>()
  let [address,setAddress]=useState<string>()
  // let [is_default,setIs_default]=useState<boolean>()
  useEffect(()=>{
    //  props.getAddRessAdd(name,mobile,address)
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  let goBack=()=>{
      props.history.push('/address')
  } 
  let btnSure=()=>{
      Toast.success("已设为默认地址",2)
  }
  let getName=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }
  let getPhone=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setMobile(e.target.value)
  }
  let getAddR=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setAddress(e.target.value)
  }
  let goOk=()=>{
    props.getAddRessAdd(name,mobile,address)
    // console.log(name,mobile,address)
    props.history.push('/address')
  }
  return <>
    <div className={styles.address_header}>
       <span>新增地址</span>
     </div>
     <div className={styles.add_context}>
         <p>
            <input type="text" placeholder="姓名" onChange={getName}/>
         </p>
         <p>
            <input type="text" placeholder="手机号" onChange={getPhone}/>
         </p>
         <List>
           <Picker extra="请选择(可选)"
             data={district}
             // {...getFieldProps('district', {
             //   initialValue: ['340000', '341500', '341502'],
             // })}
             onOk={e => console.log('ok', e)}
             // onDismiss={e => console.log('dismiss', e)}
            >
          <List.Item arrow="horizontal">地址</List.Item>
        </Picker>
         </List>
         <p>
            <input type="text" placeholder="详细地址" onChange={getAddR}/>
         </p>
     {/* <List>
          <InputItem  placeholder="姓名"></InputItem>
          <InputItem  placeholder="电话号码"></InputItem>
          <List>
          <Picker extra="请选择(可选)"
          data={district}
          // {...getFieldProps('district', {
          //   initialValue: ['340000', '341500', '341502'],
          // })}
          onOk={e => console.log('ok', e)}
          // onDismiss={e => console.log('dismiss', e)}
        >
          <List.Item arrow="horizontal">地址</List.Item>
        </Picker>
          </List>
          <InputItem  placeholder="详细地址"></InputItem>
     </List> */}
      <div className={styles.sure} onClick={btnSure}>设为默认地址<input type="button"/></div>
     </div>
     <div className={styles.add_footer}>
        <div className={styles.add_no} onClick={goBack}>取消</div>
        <div className={styles.add_ok} onClick={goOk}>保存</div>
     </div>
  </>
}
const mapStateToProps=(state:any)=>{
  return state.address
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getAddRessAdd:(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
        dispatch(addRessAddAction(name,mobile,address,is_default,id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Address)