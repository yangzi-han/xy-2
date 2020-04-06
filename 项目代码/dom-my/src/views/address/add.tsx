import React from 'react'
import styles from '../../static/address.module.scss'
import {RouteComponentProps} from 'react-router-dom'
import { List, InputItem, Picker} from 'antd-mobile';
import { district} from 'antd-mobile-demo-data';

// import { createForm } from 'rc-form';

let Address:React.FC<RouteComponentProps>=props=>{
  let goBack=()=>{
      props.history.push('/address')
  } 
  return <>
    <div className={styles.address_header}>
       <span>新增地址</span>
     </div>
     <div className={styles.add_context}>
     <List>
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
          <InputItem>
            111
          </InputItem>
     </List>

     </div>
     <div className={styles.add_footer}>
        <div className={styles.add_no} onClick={goBack}>取消</div>
        <div className={styles.add_ok}>保存</div>
     </div>
  </>
}
export default Address