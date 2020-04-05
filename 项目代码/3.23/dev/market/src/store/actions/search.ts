import {Search} from '../../api'

export let SearchAction=()=>{
    return async (dispatch:Function)=>{
        let data=await Search()
        if(data){
            dispatch({
                type:'SEARCH',
                payload:data
            })
        }
    }
}