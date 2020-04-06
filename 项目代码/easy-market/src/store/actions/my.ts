import {GetcollectList,DeleteCollectList,AddressList,Address,DeleteRessList} from '../../api'

export let MYAction = ()=>{
    return ({
        type: 'GET_MY_LISt'
    })
}
export let CollectListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await GetcollectList();
        // console.log('CollectListAction...', data);
        dispatch({
            type: 'GET_COLLECT_LIST',
            payload: data
        })
    }
}
export let DeleteCollectListAction=(valueId:number)=>{
    return async (dispatch:Function)=>{
        let data=await DeleteCollectList(valueId)
        // console.log('DeleteCollectListAction...', data);
    }
}
export let AddressListAction=()=>{
    return async(dispatch:Function)=>{
        let data=await AddressList()
        console.log('AddressListAction....',data)
        dispatch({
            type: 'GET_ADDRESS_LIST',
            payload: data
        })
    }
}
export let AddressAction=(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
    return async(dispatch:Function)=>{
        let data=await Address(name,mobile,address,is_default,id)
        // console.log('AddressAction....',data)
    }
}
export let DeleteAddressListAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await DeleteRessList(id)
        console.log('DeleteCollectListAction...', data);
    }
}