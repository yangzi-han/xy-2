import {getAddress, getaddAddress, getdeleteAddress } from '../../api'

export let addressAction = () => {
    return async (dispatch: Function) => {
        // 获取用户地址
        let data = await getAddress();
        console.log("地址",data)
        if (data) {
            console.log('查看地址数据', data)
            dispatch({
                type: 'GET_ADDRESS',
                payload: data.data
            })
        }
    }
}

export let addAddressAction = (name:string,mobile:string,address:string,id:number) => {
    return async (dispatch: Function) => {
        // 新增用户地址
        let data = await getaddAddress(name,mobile,address,id);
        console.log('查看新增地址', data)
    }
}

export let deleteAddressAction = (id: string) => {
    return async (dispatch: Function) => {
        // 删除用户地址
        let data = await getdeleteAddress(id);
        console.log('删除地址', data)
        // dispatch({
        //     type: 'GET_DELETE_ADDRESS',
        //     payload: data
        // })
    }
}


