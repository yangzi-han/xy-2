import React from 'react';
import styles from '../../static/mine.module.scss'
let Mine:React.FC=props=>{
  return <>
    <div className={styles.mineHeader}>
      <div className={styles.mineLeft}></div>
      <div className={styles.mineRight}></div>
    </div>
    <div className={styles.mineMain}>
      <div className={styles.mineCollection}>
          
      </div>
      <div className={styles.mineAddress}></div>
    </div>
    <div className={styles.mineFooter}></div>
  </>
}
export default Mine
