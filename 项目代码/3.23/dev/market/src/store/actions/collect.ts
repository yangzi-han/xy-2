import {Collect} from '../../api'

export let CollectAction=()=>{
    return async (dispatch:Function)=>{
        let data= await Collect()
        if(data){
            dispatch({
                type:"COLLECT",
                payload:[data]
            })
        }
    }
}