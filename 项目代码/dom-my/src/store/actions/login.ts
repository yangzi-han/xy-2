import {login,getUserInfo} from '../../api'
import {updateAvatar,uploadAvatar} from '../../api/login'
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
export let userInfoAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getUserInfo();
         console.log(data)
        if (data){
            dispatch({
                type: 'UPDATE_INFO',
                payload: data
            })
        }
    }
}

export let uploadAvatarAction = (form: FormData)=>{
    return async (dispatch:Function)=>{
        let data = await uploadAvatar(form);
        console.log('login...', data);
        if (data){
            dispatch({
                type: 'UPLOAD_AVATAR',
                payload: data
            })
        }
    }
}


export let updateAvatarAction = (avatar: string)=>{
    return async (dispatch:Function)=>{
        let data = await updateAvatar(avatar);
        if (data){
            dispatch({
                type: 'UPDATE_AVATAR',
                payload: avatar
            })
        }
    }
}