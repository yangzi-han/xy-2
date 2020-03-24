import axios from '../utils/request'

//获取首页的banner
export let getbanner = ()=>{
    return axios.get("/")
}
