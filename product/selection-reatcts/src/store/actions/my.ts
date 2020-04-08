import {getUserinfo, uploadAvatar, updateAvatar} from '../../api'

// 个人信息
export let loginAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getUserinfo();
        dispatch({
            type: 'GET_USERINFO',
            payload: data
        })
    }
}
// 上传头像
export let UploderAction = (form: FormData)=>{
    return async (dispatch:Function)=>{
        let data = await uploadAvatar(form);
        // dispatch(updateAvatarAction(data.data[0].path))
        dispatch({
            type: 'UPLOAD_AVATAR',
            payload: data
        })
    }
}
// 跟新头像
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