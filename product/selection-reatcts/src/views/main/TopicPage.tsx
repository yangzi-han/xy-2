import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {topicAction} from '../../store/actions/topic'
import styles from '../../style/index.module.scss'
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
    getList:()=>void,
}

const TopPage: React.FC<DispatchProps & StateProps> = (props) =>{
    console.log(props)
    useEffect(()=>{
        props.getList()
        // window.addEventListener('scroll',this.scrollBottom)
        const scrollY = window.scrollY//滚动条的位置
        const viewHeight = window.innerHeight//当前页面的高度
        const bodyHeight = document.body.clientHeight//body的高度
        console.log(scrollY,viewHeight,bodyHeight) 
    },[])
         
    return <>
    <div className={styles.tabPageContent}>
        {
            props.list.map((item)=>{
                return <a href="" className={styles.topicItem} key={item.id}>
                    <img className={styles.imgLazyload} src={item.scene_pic_url} alt=""/>
                    <div className={styles.topicItemTitle}>{item.title}</div>
                    <div className={styles.topicItemSubtitle}>{item.subtitle}</div>
                    <div className={styles.topicItemPrice}>{item.price_info}元起</div>
                </a>
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
        getList: () => {
            dispatch(topicAction());
        }
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(TopPage)