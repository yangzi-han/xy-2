import {GETLIST} from '../actiontype'
const initState={
    list:[]
}
const hotListReducers = (state=initState,action:any) => {
    switch(action.type){
        case GETLIST:
            state.list = action.list
            return {...state}
        default:
            return state
    }
}
export default hotListReducers