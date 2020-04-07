import {ADDcart} from '../../api'

export let ADDcartAction=(goodsii:string,number:string,pro:string)=>{
    return async (dispatch:Function)=>{
        console.log(goodsii,number,pro)
        let data= await ADDcart(goodsii,number,pro)
        console.log(data)
        if(data){
            dispatch({
                type:"ADDCART",
                payload:data
            })
        }
    }
}