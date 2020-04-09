import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from './scss/address/address.module.scss'
import { Toast } from 'antd-mobile'
import { addressAction, addAddressAction } from '../store/actions/address'

interface DispatchType {
    getAddress: Function,
    getAddAddress: Function
}

let AddressPage: React.FC<RouteComponentProps & DispatchType> = props => {
    let [name, setName] = useState('')
    let [mobile, setMobile] = useState('')
    let [address, setAddress] = useState('')
    let [id] = useState("")
    let [is_default,setis_default] = useState(false) //是否默认地址

    useEffect(() => {
        props.getAddress()
        // props.getaddAddress()
    }, [])
    let ressAdd = () => {
        console.log(name!== '' || mobile!== ''||address!=='')
        if(name!== ''||mobile!== ''||address!==''){
            props.getAddAddress(name, mobile,address,id)
            props.getAddress()
            props.history.go(-1)
            
        }else{
            Toast.info('请填入完整地址信息');
        }

    }
    return <div className={styles.addAddressPage}>
        <div className={styles.addressHeader}> 新增地址 </div>

        <div className={styles.addressList}>
            <div className={styles.ressItem}>
                <input className={styles.addressInput} placeholder="姓名" value={name} onChange={(e) => setName(name = e.target.value)} />
            </div>
            <div className={styles.ressItem}>
                <input className={styles.addressInput} placeholder="电话号码" value={mobile} onChange={(e) => setMobile(mobile = e.target.value)} />
            </div>
            <div className={styles.ressItem}>
                <div className={styles.chooseAddress}>北京/北京市/东城区</div>
            </div>
            <div className={styles.ressItem}>
                <input className={styles.addressInput} placeholder="详细地址" value={address} onChange={(e) => setAddress(address = e.target.value)} />
            </div>
            <div className={styles.ressItem}>
                <div className={styles.isDefaultAddress} onClick={()=>{setis_default(is_default=!is_default)}}>
                    设置默认地址

                    <img style={{display:is_default?'none':''}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                    UgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMz
                    MzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+K
                    UEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2tdt9/1cdxHGmVcAc+dH25Hw0+71cvjhzt
                    DIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T2OkM0HjgRyq8V7Y8i/3/V0
                    6YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm+D7mMeUn4Po
                    YwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbB
                    Z9v4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"></img>

                    <img style={{display:is_default?'':'none'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhE
                    UgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyu
                    rKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEo
                    MgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEp
                    nCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJ
                    UQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSTh
                    PkNi75AAAAABJRU5ErkJggg==" alt="check"></img>
                </div>
            </div>
        </div>

        <div className={styles.closeAddress}>
            <button className={styles.cancel} onClick={props.history.goBack}>取消</button>
            <button className={styles.preserve} onClick={ressAdd}>保存</button>
        </div>
{/* 

        <div className="addressSetPage">
            <div className="addressHeader">修改地址</div>
            <div className="onePx_bottom">
                <input className="addressInput" placeholder="姓名" />
            </div>
            <div className="onePx_bottom">
                <input className="addressInput" placeholder="电话号码" />
            </div>
            <div className="onePx_bottom">
                <div className="chooseAddress">北京/北京市/东城区</div>
            </div>
            <div className="onePx_bottom">
                <input className="addressInput" placeholder="详细地址" />
            </div>
            <div className="onePx_bottom">
                <div className="isDefaultAddress">设置默认地址
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAQlBMVEUAAACrKyurKy
                    urKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7
                    B9cVoc/jIWtnJIM++AMAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXBX6
                    YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88FsNg2q3JTNRLIK8sd4hTZn
                    wfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eEj8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswd
                    Q4HEt1GKsXfQHGSThPkNi75AAAAABJRU5ErkJggg==" alt="check" />
                </div>
            </div>
            <div className="closeAddress">
                <div>
                    <a role="button" className="am-button am-button-inline" aria-disabled="false" >
                        <span>取 消</span>
                    </a>
                </div>
                <div>
                    <a role="button" className="am-button am-button-primary am-button-inline" aria-disabled="false" >
                        <span>保 存</span>
                    </a>
                </div>
            </div>
        </div> */}
    </div>
}

const mapStateToProps = (state: any) => {
    console.log('添加地址', state.address)
    return { ...state.address }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getAddress: () => {
            dispatch(addressAction())
        },
        getAddAddress: (name: string, mobile: string, address:string, id: number) => {
            dispatch(addAddressAction(name, mobile,address, id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);