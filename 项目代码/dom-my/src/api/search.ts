import axios from '../utils/request'

// 获取历史记录
export let Seach = () =>{
    return axios.get('search/index')
}
// 添加历史记录
export let getpaood = (keyword:string) =>{
    return axios.get(`/goods/list?keyword=${keyword}&page=1&size=10&sort=id&order=default&categoryId=0`)
}