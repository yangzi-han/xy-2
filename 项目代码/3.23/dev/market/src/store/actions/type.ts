import {Type} from '../../api'

export let TypeAction=()=>{
    return async (dispatch:Function)=>{
        let data=await Type()
        if(data){
            dispatch({
                type:"TYPE",
                payload:data
            })
        }
    }
}