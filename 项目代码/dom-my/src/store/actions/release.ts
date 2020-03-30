import {getReleaseList} from '../../api'

export let releaseAction = (page:number)=>{
    return async (dispatch:Function)=>{
        let data = await getReleaseList(page);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_RELEASE',
                payload: data.data,
                page:page
            })
        }
    }
}