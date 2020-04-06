import {ADDaddress} from '../../api'

export let ADDaddressAction=(name:string,mobile:string,district_id:string,address:string)=>{
    return async (dispatch:Function)=>{
        let data= await ADDaddress(name,mobile,district_id,address)
        console.log(data)
        if(data){
            dispatch({
                type:"ADDADDRESS",
                payload:[data]
            })
        }
    }
}