import {Addcart,getAddcart,updata,checked,deleteCart} from '../../api'

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
export let updatacartAction=(goodsId:number,id:number,number:number,productId:number)=>{
    return async (dispatch:Function)=>{
        let data=await updata(goodsId,id,number,productId)
        // console.log('updatacartAction....',data)
        dispatch({
            type: 'GET_UPDATA_LIST',
            payload: data
        })
    }
}
export let checkedCartAction=(isChecked:number,productIds:number)=>{
    return async (dispatch:Function)=>{
        let data=await checked(isChecked,productIds)
        dispatch({
            type: 'GET_CHECKED_LIST',
            payload: data
        })
    }
}
export let deleteCartAction=(productIds:string)=>{
    return async (dispatch:Function)=>{
        let data=await deleteCart(productIds)
        dispatch({
            type: 'GET_DELETE_LIST',
            payload: data
        })
    }
}