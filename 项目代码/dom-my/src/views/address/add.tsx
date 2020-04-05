import React from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'

let Address:React.FC<RouteComponentProps>=props=>{
  let goBack=()=>{
      props.history.push('/address')
  }
  return <>
    <div className={styles.address_header}>
       <span>新增地址</span>
     </div>
     <div className={styles.add_context}></div>
     <div className={styles.add_footer}>
        <div className={styles.add_no} onClick={goBack}>取消</div>
        <div className={styles.add_ok}>保存</div>
     </div>
  </>
}
export default Address