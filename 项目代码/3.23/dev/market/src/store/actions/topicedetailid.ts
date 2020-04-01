import {TopiceDetailId} from '../../api'

export let TopiceDetailIdAction=(id:any)=>{
    return async (dispatch:Function)=>{
        let data= await TopiceDetailId(id.id)
        console.log(data)
        if(data){
            dispatch({
                type:'TOPICE_DETAIL_ID',
                payload:data
            })
        }
    }
}