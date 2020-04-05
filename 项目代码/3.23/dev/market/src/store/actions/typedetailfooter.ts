import {TypeDetailFooter} from '../../api'

export let TypeDetailFooterAction=(id:string,page:number)=>{
    return async (dispatch:Function)=>{
        let data=await TypeDetailFooter(id,page)
        if(data){
            dispatch({
                type:'TYPE_DETAIL_FOOTER',
                payload:data
            })
        }
    }
}