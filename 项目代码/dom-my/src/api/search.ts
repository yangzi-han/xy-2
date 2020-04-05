import axios from '../utils/request'
export let getSearchDelet=()=>{
    return axios.get('/search/clearhistory')
}
export let getSearchList=()=>{
    return axios.get('/search/index')
}
export let getSearchHelper=(keyword:string)=>{
    return axios.get('/search/helper',{
        params:{
            keyword
        }
    })
}