import React from 'react'
import styles from '../style/index.module.scss'
import {RouteComponentProps} from 'react-router'

let AddressPage: React.FC<RouteComponentProps> = props=>{
    return <div className={styles.noTabPageContent}>
        <div className={styles.addressPage}>
            <div className={styles.header}>
                <div className={styles.left} onClick={props.history.goBack}>{'<'}</div>
                <div className={styles.title}>地址管理</div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.addressList}>
                <div className={styles.addressItem}>
                    <div className={styles.addressMsg}>
                        <div className={styles.concatName}>eee</div>
                        <div className={styles.addressDetail}>
                            <div className={styles.concatPhone}>13333469009</div>
                            <div className={styles.concatAddress}>北京北京市东城区</div>
                            <div className={styles.concatAddress}>飞洒发生飞洒发生发生</div>
                        </div>
                        <div className={styles.deleteAddress}>
                            X
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.addAddress}>
                <button>添加地址</button>
            </div>
        </div>
    </div>
}

export default AddressPage;