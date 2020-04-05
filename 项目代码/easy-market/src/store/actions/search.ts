import {getSearch,getSearchList} from '../../api'

export let SearchAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getSearch();
        // console.log('SearchAction...', data);
        dispatch({
            type: 'GET_SEARCH',
            payload: data
        })
    }
}
export let SearchListAction=(keyword:string)=>{
    return async (dispatch:Function)=>{
        let data=await getSearchList(keyword)
        console.log('SearchListAction...', data)
        dispatch({
            type:'GET_SEARCH_LIST',
            payload:data
        })
    }
}