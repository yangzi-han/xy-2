import {TypeRight} from '../../api'

export let TypeRightAction=(id:number)=>{
    return async (dispatch:Function)=>{
        let data=await TypeRight(id)
        console.log(data)
        if(data){
            dispatch({
                type:"TYPE_RIGHT",
                payload:data
            })
        }
    }
}