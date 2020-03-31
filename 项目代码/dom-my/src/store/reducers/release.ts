import {ActionType} from '../../utils/interface'

const initVal = {
    release:[],
    detail:{},
    related:[]
}

function ReleaseReducer(state: any, action: ActionType){
    switch (action.type) {
        case 'GET_RELEASE':
            if(action.page===1){
                state.release=(action.payload)
            }else{
                state.release=state.release.connect(action.payload)
            }
            return {...state}
        case 'GET_DETAIL':
            return {...state,detail:action.payload}
        case 'GET_DETAIL_RELATED':
            return {...state,related:action.payload}
        default:
            return state;
    }
}

export default (state=initVal, action:ActionType)=>ReleaseReducer(state, action)