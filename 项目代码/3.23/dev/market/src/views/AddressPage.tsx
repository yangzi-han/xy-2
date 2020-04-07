import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AddressAction } from '../store/actions/address'
import styles from '../scss/address.module.scss'
import { RouteComponentProps } from 'react-router'
import {DeleteAddressAction} from '../store/actions/deleteaddress'
interface DispatchType {
    Address: Function
    deleteAddress:Function
}
interface ActionType {
    aaa:{
        address:aaddress[]
    }
}
interface aaddress {
    name: string,
    id: string,
    district_id: string,
    address: string,
    mobile: string

}
let Address: React.FC<DispatchType & RouteComponentProps & ActionType> = props => {
    useEffect(() => {
        props.Address()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let ADDaddress = () => {
        props.history.push("/ADDaddress")

    }
    let deletes=(id:string)=>{
       props.deleteAddress(id)
        props.Address()
    }
    let back=()=>{
        props.history.push("/main/my")
    }
    return <>
    <div className={styles.top}><span className={styles.left} onClick={()=>back()}>&lt;</span>地址管理</div>
        <div>
            {
              props.aaa.address&&props.aaa.address.map(item => {
                    return <div key={item.id} className={styles.center}>
                        <div>{item.name}</div>
                        <div>
                            <p>手机号{item.mobile}</p>
                            <p>地址{item.district_id}</p>
                            <p>详细地址{item.address}</p>
                        </div>
                        <div onClick={()=>deletes(item.id)}>删除</div>
                    </div>
                })
            }
        </div>
        <div className={styles.add} onClick={() => ADDaddress()}>新增地址</div>

    </>;
}
let mapStateToProps = (state: any) => {
    console.log(state.address)
    return {aaa:state.address}
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        Address: () => {
            dispatch(AddressAction())
        },
        deleteAddress: (id:string) => {
            dispatch(DeleteAddressAction(id))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Address)