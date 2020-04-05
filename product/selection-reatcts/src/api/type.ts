import axios from '../utils/request'

// 获取分类数据
export let getType = () =>{
    return axios.get('/catalog/index')
}
// tab相对应的数据
export let getTypeContent = (id:number) =>{
    console.log(id)    
    return axios.get('/catalog/current',{
        params:{
            id
        }
    })
}
// 获取三级分类的Tab数据
export let getTabList = (id:number) =>{
    return axios.get('/goods/category',{
        params:{
            id
        }
    })
}