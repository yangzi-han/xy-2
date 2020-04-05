import {GoodsDetail} from '../../api'

export let GoodsDetailAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await GoodsDetail(id)
        if(data){
            dispatch({
                type:"GOODS_DETAIL",
                payload:data
            })
        }
    }
}