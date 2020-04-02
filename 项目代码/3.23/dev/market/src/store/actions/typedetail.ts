import {TypeDetail} from '../../api'


export let TypeDetailAction=(id:any)=>{
    return async (dispatch:Function)=>{
        let data=await TypeDetail(id)
        if(data){
            dispatch({
                type:'TYPE_DETAIL',
                payload:data
            })
        }
    }
}