import { getSearch,getSearchData } from '../../api'
export let searchAction = ()=>{
    return async (dispatch:Function)=>{
        // 热门搜索
        let data = await getSearch();
        if (data){
            console.log('查看search',data)
            dispatch({
                type: 'GET_SEARCH',
                payload: data.data
            })
        }
    }
}

export let searchDataAction = (keyword: string)=>{
    return async (dispatch:Function)=>{
        // 搜索商品数据
        let data = await getSearchData(keyword?keyword:'0');
        if (data){
            console.log('查看search数据',data)
            dispatch({
                type: 'GET_SEARCH_DATA',
                payload: data.data
            })
        }
    }
}
  