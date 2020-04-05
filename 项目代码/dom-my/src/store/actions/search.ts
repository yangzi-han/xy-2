import {getSearchDelet,getSearchList,getSearchHelper} from '../../api'
export let searchDeletAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getSearchDelet();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_SEARCHDELET',
                payload: data
            })
        }
    }
}
export let searchListAction = ()=>{
    return async (dispatch:Function)=>{
        let data = await getSearchList();
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_SEARCHLIST',
                payload: data
            })
        }
    }
}
export let searchHelperAction = (keyword:string)=>{
    return async (dispatch:Function)=>{
        let data = await getSearchHelper(keyword);
        if (data){
            console.log('data...', data);
            dispatch({
                type: 'GET_SEARCHHELPER',
                payload: data
            })
        }
    }
}

