import {ActionType} from '../../utils/interface'
import { act } from '@testing-library/react'
let initval={

}
function CollectReducer(state:any,action:ActionType){
    switch (action.type){
        case "COLLECT":
        return {...state,...action.payload}
        default :
        return state
    }

}
export default (state=initval,action:ActionType)=>CollectReducer(state,action)