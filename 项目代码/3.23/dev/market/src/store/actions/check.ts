//单选
import {Check} from '../../api'

export let ChecktAction=(check:number,productid:number)=>{
    return async (dispatch:Function)=>{
        console.log(check,productid)
        let data= await Check(check,productid)
        console.log(data)
        if(data){
            dispatch({
                type:"Check",
                payload:data
            })
        }
    }
}