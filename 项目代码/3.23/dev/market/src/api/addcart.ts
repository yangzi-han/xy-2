import axios from '../utils/request'
export let ADDcart=(goodsId:string,number:string,productId:string)=>{
    return axios.post("/cart/add",{
        goodsId,
        number,
        productId
    })
}