import {getCollectAdd,getCollectList} from '../../api'
export let collectAddAction = (typeid:string,valueid:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCollectAdd(typeid,valueid);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_COLLECTADD',
                payload: data
            })
        }
    }
}
export let collectListAction = (typeid:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCollectList(typeid);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_COLLECTLIST',
                payload: data
            })
        }
    }
}