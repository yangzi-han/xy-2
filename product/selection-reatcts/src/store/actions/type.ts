import {getType , getTypeContent , getTabList, getTGoodList, getDetaile, getrelated, collect, remcollect, getcollect} from '../../api'
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
//获取三级分类相对的列表数据/goods/detail
export let clasGoodListActions = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await getTGoodList(id);
        dispatch({
            type: 'GET_GOODLIST',
            payload: data
        })
    }
}
//获取三级分类相对的列表数据
export let DetaileActions = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getDetaile(id);
        console.log(data)
        dispatch({
            type: 'GET_DETAILLIST',
            payload: data
        })
    }
}
//获取三级分类相对的列表数据
export let DetlateActions = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getrelated(id);
        console.log(data)
        dispatch({
            type: 'GET_DETLATE',
            payload: data
        })
    }
}
//添加收藏
export let AddcollectActions = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await collect(id);
        dispatch({
            type: 'GET_DETLATE',
            payload: data
        })
    }
}
//删除收藏
export let RemoteActions = (id:number)=>{
    return async (dispatch:Function)=>{
        let data = await remcollect(id);
        console.log(data)        
        // dispatch({
        //     type: 'GET_DETLATE',
        //     payload: data
        // })
    }
}
//获取收藏列表
export let GetcollectActions = ()=>{
    return async (dispatch:Function)=>{
        let data = await getcollect();
        dispatch({
            type: 'GET_COLLECT',
            payload: data
        })
    }
}