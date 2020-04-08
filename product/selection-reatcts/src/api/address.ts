import axios from '../utils/request'
export let getAddRessList=()=>{
    return axios.get('/address/list?typeId=1')
}
export let getAddRessDelet=(id:string)=>{
    return axios.post('/address/delete',{
       id
    })
}
export let getAddRessAdd=(name:string,mobile:string,address:string,is_default:boolean,id:number)=>{
    if(id){
        return axios.post('/address/save',{
            name,
            mobile,
            province_id:2,
            city_id:37,
            district_id:410,
            address,
            is_default,
            id
        })
    }
    return axios.post('/address/save',{
        name,
        mobile,
        province_id:2,
        city_id:37,
        district_id:410,
        address,
        is_default,
        id
    })
}