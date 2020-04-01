import axios from '../untils/request';

export let getClassifyList=()=>{
    return axios.get('/catalog/index')
}
export let getClassifyCurrent=(id:string)=>{
    return axios.get('/catalog/current',{
        params:{
            id
        }
    })
}