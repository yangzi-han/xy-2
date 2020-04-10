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
      id:number,
      full_region:string
  }>
}
let Address:React.FC<RouteComponentProps&DispatchProps>=props=>{
  // let [name,setName]=useState<string>()
  // let [mobile,setMobile]=useState<string>()
  // let [address,setAddress]=useState<string>()
   useEffect(()=>{
      props.getAddRessList()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   let goBack=()=>{
        props.history.push('/index/zhuan')
   }
   let goAdd=(add:any)=>{
        // props.history.push('/add')
        // console.log(add.data.name)
        add.type=='E'?props.history.push('/add/'+add.data.id,{
          params:{
             name:add.data.name,
             mobile:add.data.mobile,
             address:add.data.address
          }
        }):props.history.push('/add')
        // if(add.type=='E'){
        //   props.history.push('/add/'+add.data.id)
        // }else{
        //   props.history.push('/add')
        // }
   }
   let btnDelet=(id: number,e: React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{
      e.stopPropagation();
      props.getAddRessDelet(id)
      props.getAddRessList()
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
              return <div key={item.id} className={styles.listItem} onClick={()=>{goAdd({type:"E",data:item})}}>
                  <div className={styles.listName}>{item.name}</div>
                  <div className={styles.listAdd}>
                     <p>{item.mobile}</p>
                     <p>{item.address}</p>
                     <p>{item.full_region}</p>
                  </div>
                  <div className={styles.listDelet}>
                     <p className="iconfont icon-shanchu" onClick={(e)=>{btnDelet(item.id,e)}}></p>
                  </div>
              </div>
          })
       }
     </div>
     <div className={styles.address_footer} onClick={()=>goAdd({type:'A'})}>
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
      },
      getAddRessAdd:(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
        dispatch(addRessAddAction(name,mobile,address,is_default,id))
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Address)