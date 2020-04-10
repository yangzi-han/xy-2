import {getHomeDetail,getGoodsDetail,getGoodsRelated} from '../../api'

export let homeDetailAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getHomeDetail(id);
        if (data){
          
            dispatch({
                type: 'GET_HOMEDETAIL',
                payload: data
            })
        }
    }
}
export let goodsDetailAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getGoodsDetail(id);
        if (data){
           
            dispatch({
                type: 'GET_GOODSDETAIL',
                payload: data
            })
        }
    }
}
export let goodsRelatedAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getGoodsRelated(id);
        if (data){
         
            dispatch({
                type: 'GET_GOODSRELATED',
                payload: data
            })
        }
    }
}
