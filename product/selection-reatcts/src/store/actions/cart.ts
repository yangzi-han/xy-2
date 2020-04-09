import {getCartData, addCart,check} from '../../api'

// 获取购物车数据
export let CartAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getCartData();
        dispatch({
            type: 'GET_CARTDATA',
            payload: data
        })
    }
}
// 添加购物车
export let AddCartAction = (goodsId:string,number:string,productId:string)=>{
    return async (dispatch:Function)=>{
        let data = await addCart(goodsId,number,productId);
        dispatch({
            type: 'POST_ADDCART',
            payload: data
        })
    }
}
// 全选反选
export let CheckedAction = (isChecked:number,productId:string)=>{
    return async (dispatch:Function)=>{
        let data = await check(isChecked,productId);
        dispatch({
            type: 'POST_CHECKOUT',
            payload: data
        })
    }
}