import {getClassifyList,getClassifyCurrent} from '../../api'

export let GetClassifyAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getClassifyList();
        // console.log('GetClassifyAction...', data);
        if (data){
            dispatch({
                type: 'GET_CLASSIFY_LIST',
                payload: data
            })
        }
    }
}
export let getClassifyCurrentAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getClassifyCurrent(id);
        console.log('getClassifyCurrentAction...', data);
        if (data){
            dispatch({
                type: 'GET_CLASSIFY_CURRENT',
                payload: data
            })
        }
    }
}