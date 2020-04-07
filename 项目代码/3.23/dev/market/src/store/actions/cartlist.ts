import {Cartlist} from '../../api'

export let CartlistAction=()=>{
    return async (dispatch:Function)=>{
        let data= await Cartlist()
        console.log(data)
        if(data){
            dispatch({
                type:"Cartlist",
                payload:data
            })
        }
    }
}