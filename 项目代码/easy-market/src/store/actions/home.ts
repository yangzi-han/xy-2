import {getBanner} from '../../api'

export let bannerAction=()=>{
    return async (dispatch:Function)=>{
        let data=await getBanner()
        dispatch({
            type:'GET_BANNER',
            payload:data
        })
    }
}
//普通的action写法
export let commonAction=()=>{
    return {
        type:'COMMON_ACTION',
        payload:{}
    }
}