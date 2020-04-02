import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps} from 'react-router'
import {TypeDetailAction} from '../store/actions/typedetail'
import styles from '../scss/typedetail.module.scss'
import {TypeDetailFooterAction} from '../store/actions/typedetailfooter'
interface DispatchType{
    typedetail:Function,
    typedetailfooters:Function
}
interface stateType{
    typedetailtop:{
        brotherCategory:brotherCategory[],
        currentCategory:{
            name:string,
            front_name:string
        }
    },
    typedetailfooter:{
        data:data[],
        goodsList:data[]
    }
    
}
interface data{
    id:string,
    name:string,
    list_pic_url:string
}
interface brotherCategory{
    id:string,
    name:string,
    front_name:string
}

let TypeDetail: React.FC<RouteComponentProps<{id:string}>&DispatchType&stateType>=props=>{
    let [count,setCount]=useState(0)
    useEffect(()=>{
        let id=props.match.params.id
        props.typedetail(id)
        props.typedetailfooters(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let getindex=(index:number,id:string)=>{
        setCount(count=index)
        props.typedetailfooters(id)
    }
    return <>
    <div className={styles.top}><span className={styles.topleft}>&lt;</span>奇趣分类</div>
        <div className={styles.header}>
            {
                props.typedetailtop.brotherCategory.map((item,index)=>{
                return <div>
                <li key={item.id} className={count===index?styles.active:""} onClick={()=>getindex(index,item.id)} >
                    {item.name}
                </li></div>
                })
            }
        </div>
        <div className={styles.center}>
        <div className={styles.centertop}>{props.typedetailtop.brotherCategory[count]?.name}</div>
        <div className={styles.centerfooter}>{props.typedetailtop.brotherCategory[count]?.front_name}</div>
        </div>
        <div className={styles.footer}>
            {
             props.typedetailfooter.goodsList&&props.typedetailfooter.goodsList.map(item=>{
                    return <div className={styles.footeritem} key={item.id}>
                        <div><img src={item.list_pic_url} alt=""/></div>
                        <div>{item.name}</div>
                    </div>
                })
            }
        </div>
    </>;
}
let mapStateToProps=(state:any)=>{
    return {
        typedetailtop:state.typedetail,
        typedetailfooter:state.typedetailfooter
    }
}
let mapDispatchToProps=(dispatch:Function)=>{
    return {
        typedetail:(id:string)=>{
            dispatch(TypeDetailAction(id))
        },
        typedetailfooters:(id:string)=>{
            dispatch(TypeDetailFooterAction(id))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(TypeDetail);