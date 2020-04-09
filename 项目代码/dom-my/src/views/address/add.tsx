import React ,{useEffect,useState}from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import { List, Picker,Toast} from 'antd-mobile';
import { district} from 'antd-mobile-demo-data';
import {addRessAddAction} from '../../store/actions/address'
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
interface DispatchProps{
   getAddRessAdd:Function
}
let Address:React.FC<RouteComponentProps&DispatchProps>=props=>{
  let [name,setName]=useState<string>()
  let [mobile,setMobile]=useState<string>()
  let [address,setAddress]=useState<string>()
  let [pickValue,setPickValue]=useState([])
  let [pathname]=useState(props.location.pathname)
  // let [is_default,setIs_default]=useState<boolean>()
  useEffect(()=>{
    //  props.getAddRessAdd(name,mobile,address)
    document.title=pathname!=='/add'?'编辑地址':'添加地址'
    console.log(pathname)
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
  let getPicker=(e: any)=>{
    setPickValue(e)
  }
  let btn=()=>{
   
  }
  let goOk=()=>{
    props.getAddRessAdd(name,mobile,address)
    // console.log(name,mobile,address)
    props.history.push('/address')
  }
  
  //@ts-ignore
  const { getFieldProps } = props.form;
  return <>
    <div className={styles.address_header}>
    {
      pathname!=='/add'?<span>编辑地址</span>:<span>新增地址</span>
    }
      
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
             {...getFieldProps('district')}
            //  onOk={e => console.log('ok', e)}
             value={pickValue}
             onChange={getPicker}
             onClick={btn}
            >
          <List.Item arrow="horizontal">地址</List.Item>
        </Picker>
         </List>
         <p>
            <input type="text" placeholder="详细地址" onChange={getAddR}/>
         </p>
      <div className={styles.sure} onClick={btnSure}>设为默认地址<input type="button"/></div>
     </div>
     <div className={styles.add_footer}>
        <div className={styles.add_no} onClick={goBack}>
        {
           pathname!=='/add'?<div>删除</div>:<div onClick={goBack}>取消</div>
        }
        </div>
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
const TestWrapper = createForm()(Address);
export default connect(mapStateToProps,mapDispatchToProps)(TestWrapper)