import {SearchHot} from '../../api'

 export let SearchHotAction=(keyword:string,price:string)=>{
 return async (dispatch:Function)=>{
     let data=await SearchHot(keyword?keyword:"0",price?"id":"")
     if(data){
         dispatch({
             type:"SEARCH_HOT",
             payload:data
         })
     }
 }
}