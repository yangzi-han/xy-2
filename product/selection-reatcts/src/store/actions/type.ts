import {getType , getTypeContent} from '../../api'

export let typePage = ()=>{
    return async (dispatch:Function)=>{
        let data = await getType();
        dispatch({
            type: 'GET_TYPEDATA',
            payload: data
        })
    }
}

export let typeClassifyActions = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTypeContent(id);
        console.log(data)
        dispatch({
            type: 'GET_CLACCIFY',
            payload: data
        })
    }
}