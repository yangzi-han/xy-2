import {getBanner,getChannel,getBrandList} from '../../api'

export let bannerAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getBanner();
        if (data){
            dispatch({
                type: 'GET_BANNER',
                payload: data
            })
        }
    }
}
export let channelAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getChannel();
        if (data){
            dispatch({
                type: 'GET_CHANNEL',
                payload: data
            })
        }
    }  
}
export let brandListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getBrandList();
        if (data){
            dispatch({
                type: 'GET_BRANDLIST',
                payload: data
            })
        }
    }  
}
export let commonAction = ()=>{
    return {
        type: 'COMMON_ACTION',
        payload: {}

    }
}