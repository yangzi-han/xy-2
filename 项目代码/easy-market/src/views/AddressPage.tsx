import React, { useEffect, useState } from 'react'
import {RouteComponentProps, Link} from 'react-router-dom'
import {connect} from 'react-redux'//
import {AddressListAction,AddressAction,DeleteAddressListAction} from '../store/actions/my'
import { List, Picker,Toast} from 'antd-mobile'
import { district } from 'antd-mobile-demo-data'
import { createForm } from 'rc-form'
import styles from '../style/index.module.scss'
interface StateTpes{
    AddressList:Array<{
        [name:string]:string|number
    }>
}
interface DispatchType{
    getAddressList:Function,
    getAddress:Function,
    DeleteAddressList:Function
}
let AddressPage: React.FC<RouteComponentProps&DispatchType&StateTpes> = props=>{
    let [ifFlage,setifFlage]=useState(true)
    let [name,setname]=useState('')
    let [mobile,setmobile]=useState('')
    let [addresss,setaddress]=useState('')
    let [is_default,setis_default]=useState(false)
    let [id,setid]=useState()
    let [is_show,setis_show]=useState(false)
    let [pickValue,setPickValue]=useState([])
    useEffect(()=>{
        props.getAddressList()
    },[])
    let addressactive=()=>{
        setname(name='')
        setmobile(mobile='')
        setaddress(addresss='')
        setis_default(is_default=false)
        setifFlage(ifFlage=!ifFlage)
    }
    let changeiupt=(item:any)=>{
        setname(name=item.name)
        setmobile(mobile=item.mobile)
        setaddress(addresss=item.address)
        setis_default(is_default=item.is_default?true:false)
        setid(id=item.id)
        setifFlage(ifFlage=!ifFlage)
    }
    let Addresslist=()=>{
        // name: "aaa"
        // mobile: "17612345678"
        // province_id: 2
        // city_id: 37
        // district_id: 410
        // address: "123"
        // is_default: false
        // console.log('---------',name,mobile,addresss,is_default)
        if(name!==''){
            if(id){
                props.getAddress(name,mobile,addresss,is_default,id)
            }else{
                props.getAddress(name,mobile,addresss,is_default)
            }
            setifFlage(ifFlage=!ifFlage)
            props.getAddressList()
        }
        else{
            Toast.fail('请输入姓名!!!', 1);
        }
    }
    let getPicker=(e: any)=>{
        setPickValue(e)
    }
    let btn=()=>{
    
    }
    //@ts-ignore
    const { getFieldProps } = props.form;
    return<div className={styles.noTabPageContent}>
            <div id={ifFlage?styles.addressPage:styles.addressPagenone}>
                <div className={styles.header}>
                    <p onClick={props.history.goBack}><i className="iconfont icon-icon-test"></i></p>
                    <p>地址管理</p>
                    <p></p>
                </div>
                <div className={styles.addressList}>
                    {
                        props.AddressList.map(item=>{
                            return <div className={item.is_default?styles.addressMsgactive:styles.addressMsg} key={item.id}>
                                <div className={styles.concatName}>{item.name}</div>
                                <div className={styles.addressDetail} onClick={()=>{
                                    changeiupt(item)
                                }} >
                                    <div className={styles.concatPhone}>{item.mobile}</div>
                                    <div className={styles.concatAddress}>{item.full_region}</div>
                                    <div className={styles.concatAddress}>{item.address}</div>
                                </div>
                                <div className={styles.deleteAddress} onClick={()=>{
                                    props.DeleteAddressList(item.id)
                                    props.getAddressList()
                                }}>
                                    <i className="iconfont icon-shanchu"></i>
                                </div>
                            </div>
                        })
                    }
                    
                </div>
                <button className={styles.addAddress} onClick={()=>{addressactive()}}>新建地址</button>
            </div>
            <div className={ifFlage?styles.addressSetPagenone:styles.addressSetPage}>
                <div className={styles.addressHeader}>新增地址</div>
                <div className={styles.onePx_bottom}><input className={styles.addressInput} placeholder="姓名" value={name} onChange={(e)=>setname(name=e.target.value)}/></div>
                <div className={styles.onePx_bottom}><input className={styles.addressInput} placeholder="电话号码" value={mobile} onChange={(e)=>setmobile(mobile=e.target.value)}/></div>
                {/* <div className={styles.onePx_bottom}><div className={styles.chooseAddress} onClick={()=>{
                    setis_show(is_show=true)
                }}>北京/北京市/东城区</div></div> */}
                 <List>
                    <Picker extra="请选择(可选)"
                        data={district}
                        {...getFieldProps('district')}
                        onOk={e => console.log('ok', e)}
                        value={pickValue}
                        onChange={getPicker}
                        onClick={btn}
                        >
                    <List.Item arrow="horizontal">地址</List.Item>
                    </Picker>
                </List>
                <div className={styles.onePx_bottom}><input className={styles.addressInput} placeholder="详细地址" value={addresss} onChange={(e)=>setaddress(addresss=e.target.value)}/></div>
                <div className={styles.onePx_bottom}>
                    <div className={styles.isDefaultAddress} onClick={()=>setis_default(is_default=!is_default)}>设置默认地址
                        <img style={{display:is_default?'none':''}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAABGdBTUEAALGPC/xhBQ
                        AAAAFzUkdCAK7OHOkAAABCUExURUdwTMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz
                        MzMzMzMzMzMzMzMzMzAV+Z0EAAAAVdFJOUwAJ+KUEFTPay2bzRXdZ7RkhmJ6qJOWhY+QAAAEDSURBVDjLnZTplsIgDIUNWwK2t
                        dt9/1cdxHGmVcAc+dH25Hw0+71cvjhztDIZM4mNc4txo+BwZKxSVwbSFoMn8iFuCeDrG0RLNkc6GGK+ttCZ8gIzuJcgBgPxJ4rB4T
                        2OkM0HjgRyq8V7Y8i/3/V06YVb/nKECa0qBYPffB1jaFd8AD8+RrBrY8R41FkQew2MkPtrR6IeRglzoW1/HrbizfZ9Pv8jCH0slOAm
                        +D7mMeUn4PoYwegxpVNlCsqCKMurbJay9R8GyT0HSTmWeciTYsh7K+MPK1MW0H9eQOU652sqcch+15rUrFQXLpuFy7ksXLYuXDUZbBZ9v
                        4sqiqju34jyD97JD4dkfgo1AAAAAElFTkSuQmCC" alt="check"/>
                        <img  style={{display:is_default?'':'none'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAA
                        ACf4xmcAAAAQlBMVEUAAACrKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurKyurK
                        yurKyurKyvw19exOzv////z4uK1Q0Pt0dGxOjp+CNkCAAAADnRSTlMARVn7B9cVoc/jIWtnJIM++A
                        MAAADUSURBVDjLndRLEoMgEEVRPyCg+FAh+99qYqmAabFL7/hMaKCrN/VWyRZopbJ9ETUaWbq5RLXB
                        X6YmSChcpMRZdRKX6e6kDAqZzAmNYlpEpnCTimfEbfWmhLlnZp8qmLY5a47pVY0oNIWArfV+h5Jy88F
                        sNg2q3JTNRLIK8sd4hTZnwfmzSuVsmRdPFGV+d1S18QjJUQUZB5IcVVBxvMlRBRsvKzmq0JOr9y58yNU/eE
                        j8s3zyyPkvcyQk9wH57/xwOfCrhl9cNMGswdQ4HEt1GKsXfQHGSThPkNi75AAAAABJRU5
                        ErkJggg==" alt="check"></img>
                    </div>
                </div>
                <div className={styles.closeAddress}>
                    <div  onClick={()=>{
                        setifFlage(ifFlage=!ifFlage)
                    }}>
                        <a 
                            role="button" 
                            className="am-button am-button-inline" 
                            aria-disabled="false" 
                            style={{marginRight: '4px',lineHeight: '0.5rem', height:' 1rem', width: '100%', borderRadius:'0px'}}>
                            <span>取 消</span>
                        </a>
                    </div>
                    <div onClick={()=>{
                        Addresslist()
                    }}>
                        <a 
                            role="button" 
                            className="am-button am-button-primary am-button-inline" 
                            aria-disabled="false" 
                            style={{marginRight: '4px',lineHeight: '0.5rem', height:' 1rem', width: '100%', borderRadius:'0px'}}>
                            <span>保 存</span>
                        </a>
                </div>
            </div>
         </div>
    </div>
}


const mapStateToProps = (state: any)=>{
    // console.log('state.my...',state.my)
    return {
        ...state.my
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getAddressList:()=>{
            dispatch(AddressListAction())
        },
        getAddress:(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
            dispatch(AddressAction(name,mobile,address,is_default,id))
        },
        DeleteAddressList:(id:string)=>{
            dispatch(DeleteAddressListAction(id))
        }
    }
}
const TestWrapper = createForm()(AddressPage);
export default connect(mapStateToProps,mapDisptachToProps)(TestWrapper);