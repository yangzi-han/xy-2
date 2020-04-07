import {Changeimg} from '../../api'

export let ChangeimgAction=(img:FormData)=>{
    return async (dispatch:Function)=>{
        console.log(img)
        let data= await Changeimg(img)
        if(data){
            dispatch({
                type:"Changeimg",
                payload:data
            })
        }
    }
}