import {DeleteAddress} from '../../api'

export let DeleteAddressAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data= await DeleteAddress(id)
        console.log(data)
        if(data){
            dispatch({
                type:"DeleteAddress",
                payload:[data]
            })
        }
    }
}