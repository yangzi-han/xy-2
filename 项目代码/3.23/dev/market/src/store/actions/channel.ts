import {Channel} from '../../api'

export let ChannelAction=(id:string)=>{
    return async (dispatch:Function)=>{
        let data=await Channel(id)
        console.log(data)
        if(data){
            dispatch({
                type:'CHANNEL_DETAIL',
                payload:data
            })
        }
    }
}