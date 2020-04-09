import {ActionType} from '../../untils/interface'
const initVal={
    myList:[
        {name:'我的收藏',icon:'icon-shoucang',flage:true},
        {name:'地址管理',icon:'icon-iconfontdizhi',flage:true},
        {name:'我的订单',icon:'icon-dingdan',flage:false},
        {name:'周末拼单',icon:'icon-rili',flage:false},
        {name:'优惠券',icon:'icon-youhuiquan',flage:false},
        {name:'优选购',icon:'icon-youxuan',flage:false},
        {name:'我的红包',icon:'icon-hongbao',flage:false},
        {name:'会员plus',icon:'icon-huiyuan',flage:false},
        {name:'邀请返利',icon:'icon-yao',flage:false},
        {name:'意见反馈',icon:'icon-yijian',flage:false},
        {name:'客服咨询',icon:'icon-kefu',flage:false},
        {name:'账户安全',icon:'icon-decryption',flage:false}
    ],
    CollectList:[],
    AddressList:[]
}
function SearchReducer(state:any,action:ActionType){
    switch (action.type){
        case 'GET_MY_LISt':
            return {...state}
        case 'GET_COLLECT_LIST':
            return {...state,CollectList:action.payload}
        case 'GET_ADDRESS_LIST':
            return {...state,AddressList:action.payload}
        default:
            return state
    }
}
export default (state=initVal,action:ActionType)=>SearchReducer(state,action)