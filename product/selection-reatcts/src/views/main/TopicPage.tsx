import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {topicAction} from '../../store/actions/topic'
import styles from '../../style/index.module.scss'
import {RouteComponentProps} from 'react-router'
interface ItemType{
    id: number,
    title: string,
    price_info: number,
    subtitle: string,
    scene_pic_url: string
}
interface StateProps{
    list:ItemType[]
}
interface DispatchProps{
    getList:( page: number)=>void,
    scrollBottom:Function
}

const TopPage: React.FC<DispatchProps & StateProps & RouteComponentProps> = (props) =>{
    let [page,setPage] = useState(1)
    useEffect(()=>{
        if(page === 1){
            props.getList(page)
        }
            window.addEventListener('scroll',scrollBottom)
    },[])
    let scrollBottom = () => {
        const scrollY = window.scrollY//滚动条的位置
        const viewHeight = window.innerHeight//当前页面的高度
        const bodyHeight = document.body.clientHeight//body的高度
        // console.log((scrollY+viewHeight)-50 === bodyHeight,scrollY,viewHeight,bodyHeight)
        if((scrollY+viewHeight)-50 === bodyHeight){
            setPage(page += 1)
            props.getList(page)
        }
    }
    let addDetaile = (id:number) => {
        props.history.push('/topicDetaile/'+id)
    }
    return <>
    <div className={styles.tabPageContent}>
        {
            props.list.map((item)=>{
                return <li className={styles.topicItem} key={item.id} onClick={()=>addDetaile(item.id)}>
                    <img className={styles.imgLazyload} src={item.scene_pic_url} alt=""/>
                    <div className={styles.topicItemTitle}>{item.title}</div>
                    <div className={styles.topicItemSubtitle}>{item.subtitle}</div>
                    <div className={styles.topicItemPrice}>{item.price_info}元起</div>
                </li>
            })
        }
    </div>
    </>
}
const mapStateToProps = (state: any)=>{
    return {
        list:state.topic.list
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getList: (page:number) => {
            dispatch(topicAction(page));
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TopPage)