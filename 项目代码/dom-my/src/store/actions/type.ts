import {getType,getCurrent} from '../../api'
export let typeAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getType();
            console.log('type...', data);
            dispatch({
                type: 'GET_TYPE',
                payload: data
            })
    }
}
export let currentAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCurrent(id);
            console.log('type...', data);
            dispatch({
                type: 'GET_CURRENT',
                payload: data
            })
    }
}