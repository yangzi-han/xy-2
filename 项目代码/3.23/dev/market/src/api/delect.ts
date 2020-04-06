import axios from '../utils/request'

export let Detelt =(typeId:string,valueId:string)=>{
    return axios.post(`/collect/addordelete`,{
        typeId:typeId,
        valueId:valueId
    })
}