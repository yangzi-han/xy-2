/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { TypeAction } from "../../store/actions/type"
import styles from '../../scss/type.module.scss'
import {TypeRightAction} from '../../store/actions/typeright'
interface DispatchTypes {
    getType: Function,
    getTypeRight:Function
}
interface StateType{
    type:{
        categoryList:categoryList[] 
    }
    typeright:{
        id:number,
        name:string,
        front_desc:string,
        wap_banner_url:string,
        subCategoryList:subCategoryList[]
    }
   
}
interface subCategoryList{
    id:number,
    name:string,
    wap_banner_url:string
}
interface categoryList{
    id:number,
    name:string,
    banner_url:string,
    img_url:string,
    front_desc:string,
    icon_url:string,
    wap_banner_url:string,
    subCategoryList:subCategoryLists[]
}
interface subCategoryLists{
    name:string,
    id:number,
    banner_url:string,
    wap_banner_url:string
}

let TypePage: React.FC<DispatchTypes&StateType> = props => {
     let [newindex,setnewindex]=useState(0)
    useEffect(() => {
        props.getType()
        props.getTypeRight(1005000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let getindex=(index:any,id:number)=>{
        setnewindex(newindex=index)
        props.getTypeRight(id)
    }
    return <>
        <div className={styles.typeinput} ><input type="text" placeholder="搜索商品，共239款好物" /></div>
        <div className={styles.typecenter}>
        <div className={styles.typeleft}>{
            
            props.type.categoryList.map((item,index)=>{
                [`${styles.typeleftitem}`,`${index===newindex?styles.active:""}`].join(' ')
            return <div key={item.id}  className={[`${styles.typeleftitem}`,`${index===newindex?styles.active:""}`].join(' ')} onClick={()=>getindex(index,item.id)} >
                {item.name}
                </div>
            })
            
        }</div>

        <div className={styles.typeright}>
            {
                        <div key={props.typeright&&props.typeright.id}>
                        <img className={styles.typerightimg} src={props.typeright&&props.typeright.wap_banner_url}/>
                        <div className={styles.rightimgcenter}>{props.typeright&&props.typeright.front_desc}</div>
                        <div className={styles.rightTitle}>--{props.typeright&&props.typeright.name} 分类--</div>
                        <div className={styles.typefooter}>
                            {
                                props.typeright&&props.typeright.subCategoryList.map((item)=>{
                                return <div className={styles.footer} key={item.id}>
                                    <img src={item.wap_banner_url} alt=""/>
                                <div className={styles.footertitle}>{item.name}</div>
                                </div>
                                })
                            }
                        </div>
                    </div>
                   }
            
           
        </div>
        </div>
        
    </>;
}
let mapStateToProps = (state: any) => {
    console.log(state.type,state.typeright)
    return {
        type:state.type,
        typeright:state.typeright.currentCategory
    }
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        getType() {
            dispatch(TypeAction())
        },
        getTypeRight(id:number){
            dispatch(TypeRightAction(id))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(TypePage);