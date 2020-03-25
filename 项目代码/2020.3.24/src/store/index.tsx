import {createStore} from 'redux'

let reducer=(state: any,action: any)=>{
    state = JSON.parse(JSON.stringify(state))
    if(action.type==="ADD_LIST"){
        state.list=action.list.data.result.data
    }else if(action.type==="BDD_LIST"){
        state.navlist=action.navlist.data.result.data
    }else if(action.type==="CDD_LIST"){
        // console.log(action.payload,'222')
        let index=state.list.findIndex((item: { symbol: any })=>item.symbol===action.payload.symbol)
        console.log(index,'333')
        if(index===-1){
            state.list.push(action.payload)
        }
    }else if(action.type==="DDD_LIST"){
        state.navlist=action.navlist.data.result.data.splice(0,3)
    }else if(action.type==="EDD_LIST"){
        state.newlistl=action.newlistl.data.data
    }
    return state 
}

let initState={
    list:[],
    navlist:[],
    newlist:[],
    newlistl:[]
    
}

export default createStore(reducer,initState)