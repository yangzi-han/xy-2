import {Seach, getpaood} from '../../api'

// 获取历史记录
export let SeachAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await Seach();
        if (data){
            dispatch({
                type: 'GET_INSTER',
                payload: data
            })
        }
    }
}
// 获取历史记录
export let getpaoodAction = (keyword:string)=>{
    return async (dispatch:Function)=>{
        let data = await getpaood(keyword);
        if (data){
            dispatch({
                type: 'GET_GETSEACHDATA',
                payload: data
            })
        }
    }
}