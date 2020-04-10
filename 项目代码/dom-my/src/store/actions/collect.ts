import {getCollectAdd,getCollectList,getCollectDelet} from '../../api'
export let collectAddAction = (valueId:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCollectAdd(valueId);
        if (data){
            
            dispatch({
                type: 'GET_COLLECTADD',
                payload: data
            })
        }
    }
}
export let collectDeletAction = (valueId:number)=>{
    return async (dispatch:Function)=>{
        let data = await getCollectDelet(valueId);
        if (data){
            
            dispatch({
                type: 'GET_COLLECTDELET',
                payload: data
            })
        }
    }
}
export let collectListAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getCollectList();
        if (data){
           
            dispatch({
                type: 'GET_COLLECTLIST',
                payload: data
            })
        }
    }
}