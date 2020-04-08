//单选
import axios from '../utils/request'
export let Check=(isChecked:number,productId:number)=>{
    console.log(isChecked,productId)
    return axios.post("/cart/checked",{
        isChecked,
        productId
    })
}