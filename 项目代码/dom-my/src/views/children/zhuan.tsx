import React from 'react';
import styles from '../../static/mine.module.scss'
import img from '../../static/a1.jpeg'
import {RouteComponentProps} from 'react-router-dom'
let Mine:React.FC<RouteComponentProps>=props=>{
  let goAddress=()=>{
    props.history.push('/address')
  }
  let goCollect=()=>{
    props.history.push('/collect')
  }
  return <>
    <div className={styles.mineHeader}>
      <div className={styles.mineLeft}>
        <div className={styles.mine_img}>
           <img src={img} alt=""/>
        </div>
      </div>
      <div className={styles.mineRight}>
        <p className={styles.mineRight_num}>17501679924</p>
        <p className={styles.mineRight_name}>普通用户</p>
      </div>
    </div>
    <div className={styles.mineMain}>
      <div className={styles.mineCollection} onClick={goCollect}>
         <p className={styles.mine_Img}>
           <span className="iconfont icon-shoucang" ></span>
         </p>
         <p className={styles.mine_clooect}>我的收藏</p> 
      </div>
      <div className={styles.mineAddress} onClick={goAddress}>
         <p className={styles.mine_Img}>
           <span className="iconfont icon-dizhiguanli"></span>
         </p>
         <p className={styles.mine_clooect}>地址管理</p> 
      </div>
      <div className={styles.mineBox3}>
          
      </div>
      <div className={styles.mineBox4}>

      </div>
      <div className={styles.mineBox5}>
          
      </div>
      <div className={styles.mineBox6}>

      </div>
      <div className={styles.mineBox7}>
          
      </div>
      <div className={styles.mineBox8}>

      </div>
      <div className={styles.mineBox9}>
          
      </div>
      <div className={styles.mineBox10}>

      </div>
      <div className={styles.mineBox11}>
          
      </div>
      <div className={styles.mineBox12}>

      </div>
    </div>
    <div className={styles.mineFooter}>退出登录</div>
  </>
}
export default Mine
