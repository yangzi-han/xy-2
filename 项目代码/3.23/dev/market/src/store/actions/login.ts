import {login,getUserInfo,uploadAvatar,updateAvatar} from '../../api'

export let loginAction = (mobile: string, password: string)=>{
    return async (dispatch:Function)=>{
        let data = await login(mobile, password);
        // console.log('data...', data);
        if (data){
            dispatch({
                type: 'LOGIN',
                payload: data
            })
        }
    }
}
//退出登录
export let logoutAction = ()=>{
    return ({
        type: 'LOGOUT'
    })
}
//获取用户信息
export let userInfoAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getUserInfo();
        // console.log('userInfoAction',data)
        if (data){
            dispatch({
                type: 'UPDATE_INFO',
                payload: data
            })
        }
    }
}
//上传头像
export let uploadAvatarAction = (form: FormData)=>{
    return async (dispatch:Function)=>{
        let data = await uploadAvatar(form);
        console.log('uploadAvatarAction...',data)
        if (data){
            dispatch({
                type: 'UPLOAD_AVATAR',
                payload: data
            })
        }
    }
}

///更新头像
export let updateAvatarAction = (avatar: string)=>{
    return async (dispatch:Function)=>{
        let data = await updateAvatar(avatar);
        console.log('updateAvatarAction...',data)
        if (data){
            dispatch({
                type: 'UPDATE_AVATAR',
                payload: avatar
            })
        }
    }
}