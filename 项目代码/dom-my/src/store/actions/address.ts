import {getAddRessAdd,getAddRessDelet,getAddRessList} from '../../api'
export let addRessListAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getAddRessList();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_ADDRESSLIST',
                payload: data
            })
        }
    }
}
export let addRessDeletAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getAddRessDelet(id);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_ADDRESSDELET',
                payload: data
            })
        }
    }
}
export let addRessAddAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getAddRessAdd(id);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_ADDRESSADD',
                payload: data
            })
        }
    }
}