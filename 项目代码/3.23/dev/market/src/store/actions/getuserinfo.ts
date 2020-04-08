import {Getuserinfo} from '../../api'

export let GetuserinfoAction=()=>{
    return async (dispatch:Function)=>{
        let data= await Getuserinfo()
        console.log(data)
        if(data){
            dispatch({
                type:"Getuserinfoss",
                payload:data
            })
        }
    }
}