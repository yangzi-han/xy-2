import { getType, getTypeList, getTypeNav,getClassifyList,getGoodsDetail } from '../../api'

export let typeAction = () => {
    return async (dispatch: Function) => {
        // 获取分类数据
        let data = await getType();
        if (data) {
            console.log('查看type', data)
            dispatch({
                type: 'GET_TYPE',
                payload: data.data
            })
        }
    }
}

export let typeListAction = (id: number) => {
    return async (dispatch: Function) => {
        // 获取分类数据list
        let data = await getTypeList(id);
        if (data) {
            console.log('查看typeList', data)
            dispatch({
                type: 'GET_TYPE_LIST',
                payload: data.data
            })
        }
    }
}


export let typeNavAction = (id: string) => {
    return async (dispatch: Function) => {
        // 获取分类classify数据nav
        let data = await getTypeNav(id);
        if (data) {
            console.log('查看typeNav', data)
            dispatch({
                type: 'GET_TYPE_NAV',
                payload: data.data
            })
        }
    }
}

export let classifyListAction = (id: string) => {
    return async (dispatch: Function) => {
        // 获取分类classify数据nav
        console.log('传Id', id)
        let data = await getClassifyList(id);
        if (data) {
            console.log('查看classifyList', data)
            dispatch({
                type: 'GET_TYPE_CLASSIFY',
                payload: data.data.data
            })
        }
    }
}

export let goodsDetailAction = (id: string) => {
    return async (dispatch: Function) => {
        // 获取分类classify数据详情
        let data = await getGoodsDetail(id);
        if (data) {
            console.log('查看classify详情', data)
            dispatch({
                type: 'GET_TYPE_CLASSIFY_DETAIL',
                payload: data.data
            })
        }
    }
}
