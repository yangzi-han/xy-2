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
        goodsList:data[],
        datas:data[]
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
    let id=props.match.params.id
    let [count,setCount]=useState(0)
    let [page,setPage]=useState(1)
    let [idname,setid]=useState(id)
    useEffect(()=>{
        window.addEventListener('scroll',scrollButton)
        props.typedetail(idname)
        props.typedetailfooters(idname,page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    let scrollButton=()=>{
        let Scrollheight=window.scrollY
        let InnerHeight=window.innerHeight
        let clientHeight=document.body.children[1].children[0].clientHeight
        if(Scrollheight+InnerHeight>=clientHeight-50){
                setPage(page++)
                props.typedetailfooters(idname,page)
        }
    }
    let getindex=(index:number,id:string)=>{
        setCount(count=index) 
        setPage(page=1)
        setid(idname=id)
        console.log(page,idname)
        props.typedetailfooters(idname,page)
        window.scrollTo(0,0)
        window.addEventListener('scroll',scrollButton)
        props.typedetailfooter.datas=[]
    }
    let back=()=>{
        props.history.go(-1)
    }
    let gooddetail=(id:string)=>{
        setPage(page=1)
        window.scrollTo(0,0)
        window.addEventListener('scroll',scrollButton)
        props.history.push(`/goodsdetail/${id}`)
    }
    return <div>
        <div className={styles.toptop}>
    <div className={styles.top}><span className={styles.topleft} onClick={()=>back()}>&lt;</span>奇趣分类</div>
        <div className={styles.header}>
            {
                props.typedetailtop.brotherCategory.map((item,index)=>{
                return <div key={item.id}>
                <li  className={count===index?styles.active:""} onClick={()=>getindex(index,item.id)} >
                    {item.name}
                </li></div>
                })
            }
        </div>
        </div>
        <div className={styles.shuaxin}>
        <div className={styles.shangla}>下拉刷新</div>
        <div className={styles.center}>
            
        <div className={styles.centertop}>{props.typedetailtop.brotherCategory[count]?.name}</div>
        <div className={styles.centerfooter}>{props.typedetailtop.brotherCategory[count]?.front_name}</div>
        </div>
        
        <div className={styles.footer}>
            {
             props.typedetailfooter.datas&&props.typedetailfooter.datas.map(item=>{
                    return <div className={styles.footeritem} key={item.id} onClick={()=>gooddetail(`${item.id}`)}>
                        <div><img src={item.list_pic_url} alt=""/></div>
                        <div>{item.name}</div>
                    </div>
                })
            }
        </div>
    </div>
    </div>
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
        typedetailfooters:(id:string,page:number)=>{
            dispatch(TypeDetailFooterAction(id,page))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(TypeDetail);