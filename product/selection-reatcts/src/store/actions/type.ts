import {getType , getTypeContent , getTabList} from '../../api'
// 获取分类页Tab数据
export let typePage = ()=>{
    return async (dispatch:Function)=>{
        let data = await getType();
        dispatch({
            type: 'GET_TYPEDATA',
            payload: data
        })
    }
}
// 获取Tab相对应数据
export let typeClassifyActions = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTypeContent(id);
        dispatch({
            type: 'GET_CLACCIFY',
            payload: data
        })
    }
}
//获取三级分类数据
export let ClassifyActions = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTabList(id);
        dispatch({
            type: 'GET_SCROLLDATA',
            payload: data
        })
    }
}