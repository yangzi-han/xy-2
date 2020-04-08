import {Updata} from '../../api'

export let UpdataAction=(img:string)=>{
    return async (dispatch:Function)=>{
        console.log(img)
        let data=await Updata(img)
        console.log(data)
        if(data){
            dispatch({
                type:"UP_DATA",
                payload:data
            })
        }
    }
}