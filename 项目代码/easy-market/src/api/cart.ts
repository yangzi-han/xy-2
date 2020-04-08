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
export let updata=(goodsId:number,id:number,number:number,productId:number)=>{
    return axios.post('/cart/update',{
        goodsId,
        id,
        number,
        productId
    })
}
export let checked=(isChecked:number,productIds:number)=>{
    return axios.post('/cart/checked',{
        isChecked,
        productIds
    })
}
export let deleteCart=(productIds:string)=>{
    return axios.post('/cart/delete',{
        productIds
    })
}