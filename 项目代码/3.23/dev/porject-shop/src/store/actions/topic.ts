import { getTopic, getDetail } from '../../api'

export let topicAction = () => {
    return async (dispatch: Function) => {
        // 获取专题数据
        let data = await getTopic();
        if (data) {
            console.log('查看topic', data)
            dispatch({
                type: 'GET_TOPIC',
                payload: data.data.data
            })
        }
    }
}

export let detailAction = (id: string) => {
    return async (dispatch: Function) => {
        // 获取专题详情数据
        let data = await getDetail(id);
        if (data) {
            console.log('查看topic详情', data)
            dispatch({
                type: 'GET_TOPIC_DETAIL',
                payload: data.data
            })
        }
    }
}

// export let detailRelatedAction = (id: string) => {
//     return async (dispatch: Function) => {
//         // 获取相关专题数据
//         let data = await getDetailRelated(id);
//         if (data) {
//             console.log('查看topic相关专题', data)
//             dispatch({
//                 type: 'GET_TOPIC_DETAIL_RELATED',
//                 payload: data.data
//             })
//         }
//     }
// }
