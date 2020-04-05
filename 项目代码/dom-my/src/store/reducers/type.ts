import {ActionType} from '../../utils/interface'

const initVal = {
   type:{},
   curren:[],
   list:[],
   nav:[],
}

function typeReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_TYPE':
            // console.log(action.payload.categoryList)
            state.type=action.payload
            return {...state}
        case 'GET_CURRENT':
            state.curren=action.payload
            return {...state}
        case 'GET_LIST':
            state.list=action.payload
            return {...state}
        case 'GET_NAV':
            state.nav=action.payload
            return {...state}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>typeReducer(state, action)