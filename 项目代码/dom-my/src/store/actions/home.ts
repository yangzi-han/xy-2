import {getBanner,getChannel,getBrandList,getNewGoodsList,getHotGoodsList,getTopicList,getCategoryList} from '../../api'

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
export let newGoodsListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getNewGoodsList();
        if (data){
            dispatch({
                type: 'GET_NEWGOODSLIST',
                payload: data
            })
        }
    }  
}
export let hotGoodsListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getHotGoodsList();
        if (data){
            dispatch({
                type: 'GET_HOTGOODSLIST',
                payload: data
            })
        }
    }  
}
export let topicListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getTopicList();
        if (data){
            dispatch({
                type: 'GET_TOPICLIST',
                payload: data
            })
        }
    }  
}
export let categoryListAction=()=>{
    return async (dispatch:Function)=>{
        let data = await getCategoryList();
        if (data){
            dispatch({
                type: 'GET_CATEGORYLIST',
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