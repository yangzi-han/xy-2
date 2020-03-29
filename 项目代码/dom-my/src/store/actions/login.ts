import {login} from '../../api'

export let loginAction = (mobile: string, password: string)=>{
    return async (dispatch:Function)=>{
        let data = await login(mobile, password);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'LOGIN',
                payload: data
            })
        }
    }
}

export let logoutAction = ()=>{
    return ({
        type: 'LOGOUT'
    })
}