import { getBanner,getBrandDetail } from '../../api'

export let bannerAction = ()=>{
    return async (dispatch:Function)=>{
        // 获取首页数据
        let data = await getBanner();
        if (data){
            console.log('查看home',data)
            dispatch({
                type: 'GET_BANNER',
                payload: data.data
            })
        }
    }
}
export let brandAction = (id:string)=>{
    return async (dispatch:Function)=>{
        // 获取brand数据
        let data = await getBrandDetail(id);
        if (data){
            console.log('查看brand',data)
            dispatch({
                type: 'GET_BRAND_DETAIL',
                payload: data.data
            })
        }
    }
}
// export let commonAction = ()=>{
//     return {
//         type: 'COMMON_ACTION',
//         payload: {}
//     }
// }