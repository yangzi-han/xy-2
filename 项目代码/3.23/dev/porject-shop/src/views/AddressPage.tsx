import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from './scss/address/address.module.scss'
import { addressAction, addAddressAction, deleteAddressAction } from '../store/actions/address'

interface DispatchType {
    getAddress: Function,
    getDeleteAddress: Function
}

interface StateType {
    addressList: Array<{
        [name: string]: number | string,
        address: string,
        mobile: string,
        full_region: string,
    }>
}

let AddressPage: React.FC<RouteComponentProps & DispatchType & StateType> = props => {
    let [name, setName] = useState()
    useEffect(() => {
        props.getAddress()
        // props.getaddAddress()
        // props.getDeleteAddress()
    }, [])

    let addcity = () => {
        props.history.push('/addAddress')
    }

    return <div className={styles.addressPage}>

        <div className={styles.header}>
            <div className={styles.left} onClick={props.history.goBack} > &lt; </div>
            <div className={styles.title}> 地址管理 </div>
            <div className="right"> </div>
        </div>

        <div className={styles.addressList}>
            {
                props.addressList ? props.addressList.map(item => {
                    return <div key={item.id} className={styles.addressItem}>
                        <div className={styles.addressMsg}>
                            <div className={styles.concatName}>{item.name}</div>
                            <div className={styles.addressDetail}>
                                <div className={styles.concatPhone}>{item.mobile}</div>
                                <div className={styles.concatAddress}>{item.full_region}</div>
                                <div className={styles.concatAddress}>{item.address}</div>
                            </div>

                            <div className={styles.deleteAddress} onClick={() => {
                                props.getDeleteAddress(item.id)
                                props.getAddress()
                            }}>删除</div>
                        </div>
                    </div>
                }) : ''
            }
        </div>

        <div className={styles.addAddress}>
            <button onClick={addcity}>新建地址</button>
        </div>
    </div>
}

const mapStateToProps = (state: any) => {
    console.log('地址', state.address)
    return { ...state.address }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getAddress: () => {
            dispatch(addressAction())
        },
        getDeleteAddress: (id: string) => {
            dispatch(deleteAddressAction(id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);