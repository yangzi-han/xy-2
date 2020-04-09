import axios from '../untils/request';

export let getSearch=()=>{
    return axios.get('/search/index')
}
export let getSearchList=(keyword:string,order:string,sort:string)=>{
    return axios.get(`/goods/list?keyword=${keyword}&page=1&size=10&sort=${sort}&order=${order}&categoryId=0`)
}