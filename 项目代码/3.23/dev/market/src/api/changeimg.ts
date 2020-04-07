import axios from '../utils/request'

export let Changeimg=(img:FormData)=>{
    return axios.post("http://123.206.55.50:11000/upload",img)
}