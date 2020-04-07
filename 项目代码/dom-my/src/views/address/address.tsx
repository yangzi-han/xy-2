import React,{useEffect} from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'
import {addRessListAction,addRessDeletAction,addRessAddAction} from '../../store/actions/address'
// import { getAddRessList, getAddRessDelet, getAddRessAdd } from '../../api/address';
interface DispatchProps{
  getAddRessList:Function,
  getAddRessDelet:Function,
  getAddRessAdd:Function
  addressList:Array<{
      name:string,
      mobile:string,
      address:string,
      id:number
  }>
}
let Address:React.FC<RouteComponentProps&DispatchProps>=props=>{
   useEffect(()=>{
      props.getAddRessList()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   let goBack=()=>{
        props.history.push('/index/zhuan')
   }
   let goAdd=()=>{
        props.history.push('/add')
   }
   let btnDelet=(id: number)=>{
      props.getAddRessDelet(id)
      props.getAddRessList()
   }
   let goListItem=()=>{
      props.history.push('/add')
   }
  return <>
     <div className={styles.address_header}>
       <span>
         <p className="iconfont icon-fanhui" onClick={goBack}></p>   
       </span>
       <span>地址管理</span>
       <span></span>
     </div>
     <div className={styles.address_context}>
       {
          props.addressList&&props.addressList.map((item)=>{
              return <div key={item.id} className={styles.listItem} onClick={goListItem}>
                  <div className={styles.listName}>{item.name}</div>
                  <div className={styles.listAdd}>
                     <p>{item.mobile}</p>
                     <p>{item.address}</p>
                  </div>
                  <div className={styles.listDelet}>
                     <p className="iconfont icon-shanchu" onClick={()=>{btnDelet(item.id)}}></p>
                  </div>
              </div>
          })
       }
     </div>
     <div className={styles.address_footer} onClick={goAdd}>
       新建地址  
     </div>
  </>
}
const mapStateToProps=(state:any)=>{
  console.log(state.address.addressList)
  return {
    addressList:state.address.addressList
  }
}
const mapDispatchToProps=(dispatch:Function)=>{
  return {
      getAddRessList:()=>{
         dispatch(addRessListAction())
      },
      getAddRessDelet:(id:any)=>{
        dispatch(addRessDeletAction(id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Address)