import {Getuserinfo} from '../../api'

export let GetuserinfoAction=()=>{
    return async (dispatch:Function)=>{
        let data= await Getuserinfo()
        if(data){
            dispatch({
                type:"Getuserinfo",
                payload:data
            })
        }
    }
}