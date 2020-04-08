import axios from '../utils/request'
//添加购物车
export let getCartAdd=(goodsId:string,number:string,productId:string)=>{
    return axios.post('/cart/add',{
        goodsId,
        number,
        productId
    })
}
//获取购物车列表
export let getCartList=()=>{
    return axios.get('/cart/index?typeId=1')
}
//购物车数量
export let getCartNumber=()=>{
    return axios.get('/cart/goodscount')
}
//是否选中
export let getCartChecked=(productId:string,isChecked:number)=>{
    return axios.post('/cart/add',{
        productId,
        isChecked,
    })
}
//删除购物车
export let getCartDelet=(productId:string)=>{
    return axios.post('/cart/add',{
        productId,
    })
}