import axios from '../untils/request';

export let Addcart=(goodsId:number,number:number,productId:number)=>{
    return axios.post('/cart/add',{
        goodsId,
        number,
        productId
    })
}
export let getAddcart=()=>{
    return axios.get('/cart/index')
}