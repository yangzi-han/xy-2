import { getAddCollect, getCollectList, getDeleteCollect } from '../../api'

export let addCollectAction = (valueId: string) => {
    return async (dispatch: Function) => {
        // 添加收藏
        console.log('添加收藏valueId', valueId)
        let data = await getAddCollect(valueId);
        if (data) {
            console.log('查看添加收藏', data)
            dispatch({
                type: 'GET_ADD_COLLECT',
                payload: data.data
            })
        }
    }
}

export let collectAction = () => {
    return async (dispatch: Function) => {
        // 收藏
        let data = await getCollectList();
        if (data) {
            console.log('查看收藏', data)
            dispatch({
                type: 'GET_COLLECT',
                payload: data.data
            })
        }
    }
}

export let deleteCollectAction = (valueId: number) => {
    return async (dispatch: Function) => {
        // 删除收藏
        let data = await getDeleteCollect(valueId);
        if (data) {
            console.log('查看删除收藏', data)
            dispatch({
                type: 'GET_DELETE_COLLECT',
                payload: data.data
            })
        }
    }
}
