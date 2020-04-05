import axios from '../utils/request'
export let getCollectAdd=(typeid:string,valueid:string)=>{
    return axios.post(`/collect/addordelete?typeid=${typeid}&valueid=${valueid}`)
}
export let getCollectList=(typeid:string)=>{
    return axios.get(`/collect/list?typeid=${typeid}`)
}