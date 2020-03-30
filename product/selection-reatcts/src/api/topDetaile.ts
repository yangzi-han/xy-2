import axios from '../utils/request'

// 专题接口
export let getdetaile = (id:string) =>{
    return axios.get('/topic/detail',{
        params:{
            id
        }
    })
}