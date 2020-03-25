import {getBanner} from '../../api'

export let bannerAction= () =>{
    return async (dispatch:Function)=>{
        let data= await getBanner()
        if(data){
            dispatch({
                type:'GET_BANNER',
                payload:data
            })
        }
        
    }
}