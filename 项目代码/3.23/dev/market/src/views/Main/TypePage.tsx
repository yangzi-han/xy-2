/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { TypeAction } from "../../store/actions/type"
import styles from '../../scss/type.module.scss'
interface DispatchTypes {
    getType: Function
}
interface StateType{
    categoryList:categoryList[],
   
}
interface categoryList{
    id:string,
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
       console.log(props.categoryList)
        props.getType()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let getindex=(index:any)=>{
        setnewindex(newindex=index)
    }
    return <>
        <div className={styles.typeinput} ><input type="text" placeholder="搜索商品，共239款好物" /></div>
        <div className={styles.typecenter}>
        <div className={styles.typeleft}>{
            
            props.categoryList.map((item,index)=>{
                [`${styles.typeleftitem}`,`${index==newindex?styles.active:""}`].join(' ')
            return <div key={item.id}  className={[`${styles.typeleftitem}`,`${index==newindex?styles.active:""}`].join(' ')} onClick={()=>getindex(index)} >
                {item.name}
                </div>
            })
            
        }</div>

        <div className={styles.typeright}>
            {
                 props.categoryList.map((item,index)=>{
                   if(index==newindex){
                    return <div key={item.id}>
                        <img className={styles.typerightimg} src={props.categoryList[newindex].wap_banner_url}/>
                        <div className={styles.rightimgcenter}>{props.categoryList[newindex].front_desc}</div>
                        <div className={styles.rightTitle}>--{item.name} 分类--</div>
                        {/* <div className={styles.typefooter}>
                            {
                                props.categoryList[newindex].subCategoryList.map((item)=>{
                                return <div className={styles.footer} key={item.id}>
                                    <img src={item.wap_banner_url} alt=""/>
                                <div className={styles.footertitle}>{item.name}</div>
                                </div>
                                })
                            }
                        </div> */}
                    </div>
                   }
                    })
            }
           
        </div>
        </div>
        
    </>;
}
let mapStateToProps = (state: any) => {
    console.log(state.type)
    return state.type
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        getType() {
            dispatch(TypeAction())
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(TypePage);