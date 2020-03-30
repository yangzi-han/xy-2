import {getReleaseList} from '../../api'

export let releaseAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getReleaseList();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_RELEASE',
                payload: data.data
            })
        }
    }
}