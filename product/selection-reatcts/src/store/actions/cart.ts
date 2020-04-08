import {getCartData} from '../../api'

export let CartAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getCartData();
        dispatch({
            type: 'GET_CARTDATA',
            payload: data
        })
    }
}