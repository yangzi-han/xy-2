import {Topice} from '../../api'

export let TopiceAction=(page:number)=>{
    return async (dispatch:Function)=>{
        let data=await Topice(page)
        if(data){
            dispatch({
                type:'TOPICE',
                payload:data,
                page:page
            })
        }
    }
}
