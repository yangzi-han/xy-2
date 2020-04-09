import { getLogin, getUserInfo } from '../../api'
import {uploadAvatar, updateAvatar} from '../../api/indexApi'

export let loginAction = (mobile: string, password: string) => {
    return async (dispatch: Function) => {
        // 手机号密码
        let data = await getLogin(mobile, password);
        if (data) {
            console.log('查看login', data)
            dispatch({
                type: 'GET_LOGIN',
                payload: data.data
            })
        }
    }
}

export let logoutAction = () => {
    return ({
        type: 'GET_LOGOUT'
    })
}

export let userInfoAction = () => {
    return async (dispatch: Function) => {
        // 用户信息
        let data = await getUserInfo();
        console.log('info',data)
        if (data) {
            dispatch({
                type: 'UPDATE_INFO',
                payload: data
            })
        }
    }
}

export let uploadAvatarAction = (form: FormData) => {
    return async (dispatch: Function) => {
        let data = await uploadAvatar(form);
        if (data) {
            dispatch({
                type: 'UPLOAD_AVATAR',
                payload: data.data
            })
        }
    }
}

export let updateAvatarAction = (avatar: string) => {
    return async (dispatch: Function) => {
        let data = await updateAvatar(avatar);
        if (data) {
            dispatch({
                type: 'UPDATE_AVATAR',
                payload: avatar
            })
        }
    }
}