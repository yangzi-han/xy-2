import axios from '../utils/request'

// 获取分类数据
export let getType = () =>{
    return axios.get('/catalog/index')
}
//
export let getTypeContent = (id:number) =>{
    console.log(id)    
    return axios.get('/catalog/current',{
        params:{
            id
        }
    })
}