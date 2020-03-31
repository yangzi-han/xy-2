import {getType} from '../../api'

export let typePage = ()=>{
    return async (dispatch:Function)=>{
        let data = await getType();
        dispatch({
            type: 'GET_TYPEDATA',
            payload: data
        })
    }
}