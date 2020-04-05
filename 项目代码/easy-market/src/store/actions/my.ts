import {GetcollectList,DeleteCollectList} from '../../api'

export let MYAction = ()=>{
    return ({
        type: 'GET_MY_LISt'
    })
}
export let CollectListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await GetcollectList();
        // console.log('CollectListAction...', data);
        dispatch({
            type: 'GET_COLLECT_LIST',
            payload: data
        })
    }
}
export let DeleteCollectListAction=(valueId:number)=>{
    return async (dispatch:Function)=>{
        let data=await DeleteCollectList(valueId)
        console.log('DeleteCollectListAction...', data);
    }
}