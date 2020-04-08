//删除购物车商品
import {Deletecart} from '../../api'
export let DeletecartAction=(productIds:string)=>{
    return async (dispatch:Function)=>{
        let data=await Deletecart(productIds)
        console.log(data)
        if(data){
            dispatch({
                type:'Deletecart',
                payload:data
            })
        }
    }
}