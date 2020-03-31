import {getClassifyList} from '../../api'

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