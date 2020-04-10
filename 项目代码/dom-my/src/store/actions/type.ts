import {getType,getCurrent,getList,getNav} from '../../api'
export let typeAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getType();
           
            dispatch({
                type: 'GET_TYPE',
                payload: data
            })
    }
}
export let currentAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getCurrent(id);
          
            dispatch({
                type: 'GET_CURRENT',
                payload: data
            })
    }
}
export let navAction = (id:string)=>{
    return async (dispatch:Function)=>{
        let data = await getNav(id);
        
            dispatch({
                type: 'GET_NAV',
                payload: data
            })
    }
}
export let listAction = (categoryId:string)=>{
    return async (dispatch:Function)=>{
        let data = await getList(categoryId);
          
            dispatch({
                type: 'GET_LIST',
                payload: data
            })
    }
}

