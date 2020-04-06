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
// 三级分类对应数据
export let getTGoodList = (categoryId:number) =>{
    return axios.get('/goods/list',{
        params:{
            categoryId
        }
    })
}
// 三级分类详情数据
export let getDetaile = (id:string) =>{
    return axios.get('/goods/detail',{
        params:{
            id
        }
    })
}
// 三级分类详情相关信息
export let getrelated = (id:string) =>{
    return axios.get('/goods/related',{
        params:{
            id
        }
    })
}
// 收藏
export let collect = (valueId:string) =>{
    return axios.post('/collect/addordelete',{
        valueId,
        typeId:0
    })
}
//删除
export let remcollect = (valueId:number) =>{
    return axios.post('/collect/addordelete',{
        params:{
            valueId,
            typeId:0
        }
    })
}
//获取收藏列表 
export let getcollect = () =>{
    return axios.get('/collect/list?typeId=0')
}