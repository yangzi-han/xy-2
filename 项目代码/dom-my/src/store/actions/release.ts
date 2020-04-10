import {getReleaseList,getDetailList,getDetailRelated} from '../../api'
export let releaseAction = (page:number)=>{
    return async (dispatch:Function)=>{
        let data = await getReleaseList(page);
        if (data){
            
            dispatch({
                type: 'GET_RELEASE',
                payload: data.data,
                page:page
            })
        }
    }
}
export let detailAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getDetailList(id);
        if (data){
          
            dispatch({
                type: 'GET_DETAIL',
                payload: data,
            })
        }
    }
}
export let detailRelatedAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getDetailRelated(id);
        if (data){
          
            dispatch({
                type: 'GET_DETAIL_RELATED',
                payload: data,
            })
        }
    }
}