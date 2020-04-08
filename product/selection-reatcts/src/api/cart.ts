import axios from '../utils/request'

// 获取购物车数据
export let getCartData = () =>{
    return axios.get('/cart/index')
}