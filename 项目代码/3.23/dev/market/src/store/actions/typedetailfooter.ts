import {TypeDetailFooter} from '../../api'

export let TypeDetailFooterAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await TypeDetailFooter(id)
        if(data){
            dispatch({
                type:'TYPE_DETAIL_FOOTER',
                payload:data
            })
        }
    }
}