import {Address} from '../../api'

export let AddressAction=()=>{
    return async (dispatch:Function)=>{
        let data= await Address()
        console.log(data)
        if(data){
            dispatch({
                type:"ADDRESS",
                payload:data
            })
        }
    }
}