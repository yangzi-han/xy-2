//删除购物车商品

import axios from '../utils/request'
export let Deletecart =(productIds:string)=>{
    console.log("11111",productIds)
    return axios.post("/cart/delete",{productIds})
}