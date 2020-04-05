import axios from '../utils/request'

export let SearchHot=(keyword:string,price:string)=>{
    return axios.get(`/goods/list?keyword=${keyword}&page=1&size=100&sort=id&order=${price}&categoryId=0`)
}