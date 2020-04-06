import axios from '../untils/request'
export let GetcollectList=()=>{
    return axios.get('/collect/list?typeId=0')
}
export let DeleteCollectList=(valueId:number)=>{
    return axios.post('/collect/addordelete',{
        valueId,
        typeId:0
    })
}
export let AddressList=()=>{
    return axios.get('/address/list')
}
export let Address=(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
    if(id){
        return axios.post('/address/save',{
            name,
            mobile,
            province_id: 2,
            city_id: 37,
            district_id: 410,
            address,
            is_default,
            id
        })
    }
    return axios.post('/address/save',{
        name,
        mobile,
        province_id: 2,
        city_id: 37,
        district_id: 410,
        address,
        is_default,
    })
}
export let DeleteRessList=(id:string)=>{
    return axios.post('/address/delete',{
        id
    })
}