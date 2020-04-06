import {Detelt} from '../../api'
export let DeteltAction=(id:string,valueid:string)=>{
    return async (dispatch:Function)=>{
        let data=await Detelt(id,valueid)
        console.log(id,valueid)
        console.log(data)
        if(data){
            dispatch({
                type:'DETELT',
                payload:data
            })
        }
    }
}