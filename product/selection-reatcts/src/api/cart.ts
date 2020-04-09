import axios from '../utils/request'

// 获取购物车数据
export let getCartData = () =>{
    return axios.get('/cart/index')
}
// 添加购物车
export let addCart = (goodsId:string,number:string,productId:string) =>{
    console.log(goodsId,number,productId)    
    return axios.post('/cart/add',{
        goodsId,
        number,
        productId
    })
}
// 购物车全选反选
export let check = (isChecked:number,productIds:string) =>{
    return axios.post('/cart/checked',{
        isChecked,
        productIds
    })
}