import {getList} from '../../api/home'
import {GETLIST} from '../../store/actiontype'
export const show = () => (dispatch:any) => {
    getList()
        .then(resp => {
            dispatch({
                type:GETLIST,
                list:resp.data.lists
            })
        })
}