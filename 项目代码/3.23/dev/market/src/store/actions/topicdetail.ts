import {TopiceDetail} from '../../api'

export let TopiceDetailAction=(id:any)=>{
    return async (dispatch:Function)=>{
        let data=await TopiceDetail(id.id)
        if(data){
            dispatch({
                type:'TOPIC_DETAIL',
                payload:data
            })
        }
    }
}