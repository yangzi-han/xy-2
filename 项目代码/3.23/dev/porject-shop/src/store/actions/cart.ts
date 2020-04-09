import { getCart, getAddCart, getDeleteCart } from '../../api'

export let cartAction = () => {
    return async (dispatch: Function) => {
        // 获取用户地址
        let data = await getCart();
        if (data) {
            console.log('查看购物车数据', data)
            dispatch({
                type: 'GET_CART',
                payload: data.data
            })
        }
    }
}

export let addCartAction = (goodsId: string, number: string, productId: string) => {
    return async (dispatch: Function) => {
        // 新增用户地址
        let data = await getAddCart(goodsId, number, productId);
        console.log('新增购物车', data)
    }
}

export let deleteCartAction = (id: string) => {
    return async (dispatch: Function) => {
        // 删除用户地址
        let data = await getDeleteCart(id);
        console.log(id)
        console.log('删除购物车', data)
    }
}


