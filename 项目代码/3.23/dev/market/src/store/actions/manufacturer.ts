import {Manufacturer} from '../../api'
export let ManufacturerAction =(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await Manufacturer(id)
        if(data){
            dispatch({
                type:"Manufacturer",
                payload:data
            })
        }
    }
}