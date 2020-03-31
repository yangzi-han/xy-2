import {getNav} from '../../api'

export let navAction = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await getNav(id);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_RELEASE',
                payload: data,
                id:id
            })
        }
    }
}