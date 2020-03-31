import axios from '../untils/request';

export let getClassifyList=()=>{
    return axios.get('/catalog/index')
}