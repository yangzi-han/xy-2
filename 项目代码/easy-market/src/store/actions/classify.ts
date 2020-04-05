import {getClassifyList,getClassifyCurrent,
    getClassifyCategory,getClassifyGoodList,
    GoodsDetailList,getGoodsRelated,addCollectList} from '../../api'

export let GetClassifyAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getClassifyList();
        // console.log('GetClassifyAction...', data);
        if (data){
            dispatch({
                type: 'GET_CLASSIFY_LIST',
                payload: data
            })
        }
    }
}
export let getClassifyCurrentAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getClassifyCurrent(id);
        // console.log('getClassifyCurrentAction...', data);
        if (data){
            dispatch({
                type: 'GET_CLASSIFY_CURRENT',
                payload: data
            })
        }
    }
}
export let getClassifyCategoryAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await getClassifyCategory(id)
        // console.log('getClassifyCategoryAction...',data)
        dispatch({
            type: 'GET_CLASSIFY_CATEGORY',
            payload: data
        })
    }
}
export let getClassifyGoodListAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await getClassifyGoodList(id)
        // console.log('getClassifyGoodListAction...',data.data)
        dispatch({
            type: 'GET_CLASSIFY_GOODSLIST',
            payload: data.data
        })
    }
}
export let GoodsDetailListAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await GoodsDetailList(id)
        // console.log('GoodsDetailListAction...',data)
        dispatch({
            type:'GET_GOODSDETAIL_LIST',
            payload:data
        })
    }
}
export let GoodsRelatedAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getGoodsRelated(id);
        console.log('GoodsRelatedAction...', data);
        dispatch({
            type: 'GET_GOODS_RELATED',
            payload: data
        })
    }
}
export let AddCollectListAction=(valueId:string)=>{
    return async (dispatch:Function)=>{
        let data=await addCollectList(valueId)
        console.log('DeleteCollectListAction...', data);
    }
}