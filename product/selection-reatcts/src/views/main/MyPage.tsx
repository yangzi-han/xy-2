import React from 'react'
import styles from '../../style/index.module.scss'
import '../../style/fonts/iconfont.css'
import {RouteComponentProps} from 'react-router'


const MyPage: React.FC<RouteComponentProps> = (props) =>{
    let goCollect = ()=> {
        props.history.push('/collectpage')
    }
    let goAddress = () => {

    }
    return <>
        <div className={styles.mineHeader}></div>
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
    </>
}
export default MyPage