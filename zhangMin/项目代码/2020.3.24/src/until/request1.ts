import mock from '../mock/mock'

function RequestPort(url: string,obj: { username: string; password: string }){
    return new Promise(res=>{
        setTimeout(()=>{
            //@ts-ignore
            res(mock[url](obj))
        },Math.random()*1000)
        
    })
}
export default RequestPort