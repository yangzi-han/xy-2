import {getCartAdd,getCartChecked,getCartDelet,getCartNumber,getCartList} from '../../api'
// import { getCartDelet } from '../../api/shopCar';
//购物车列表
export let cartListAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getCartList();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_CARTLIST',
                payload: data
            })
        }
    }
}
//添加购物车
export let cartAddAction = (goodsId:string,number:string,productId:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCartAdd(goodsId,number,productId);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_CARTADD',
                payload: data
            })
        } 
    }
}
//购物车数量
export let cartNumAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getCartNumber();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_CARTNUM',
                payload: data
            })
        }
    }
}
//是否选中
export let cartCheckedAction = (isChecked:number,productIds:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCartChecked(isChecked,productIds);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_CARTCHECKED',
                payload: data
            })
        }
    }
}
//删除购物车
export let cartDeletAction = (productId:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCartDelet(productId);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_CARTDELET',
                payload: data
            })
        }
    }
}
