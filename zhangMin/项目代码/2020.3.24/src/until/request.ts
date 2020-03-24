import axios from 'axios'
let request=axios.create({
    baseURL:''
})
request.interceptors.request.use((config:any)=>{
    config.headers.Authorization=localStorage.getItem("token")
    return config
},(error)=>{
    //@ts-ignore
    return Promise.error(error)
})
request.interceptors.response.use((response:any)=>{
    if(response===200){
       return Promise.resolve(response)
    }else{
       return Promise.resolve(response)
    }
},error=>{
    if(error.response.status){
        switch(error.response.status){
            case 401:
              console.log("授权出错")
        }
    }
})
let get=request.get
let post=request.post
let deletes=request.delete
let put=request.put

export default{
    get,post,deletes,put
}