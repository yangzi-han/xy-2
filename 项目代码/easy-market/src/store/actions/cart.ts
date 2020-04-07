import {Addcart,getAddcart} from '../../api'

export let AddcartAction = (goodsId:number,number:number,productId:number)=>{
    return async (dispatch:Function)=>{
        let data = await Addcart(goodsId,number,productId);
        // console.log('AddcartAction...', data);
    }
}
export let getAddcartAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getAddcart();
        // console.log('getAddcartAction...', data);
        dispatch({
            type: 'GET_ADDCART_LIST',
            payload: data
        })
    }
}
