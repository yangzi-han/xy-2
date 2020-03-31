import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {TopiceAction} from '../../store/actions/topice';
import styles from '../../scss/topice.module.scss'
import { RouteComponentProps } from 'react-router'
interface StateType{
    data:Array<{
        id:string,
        [name: string]: string | number,
        price_info:number,
        scene_pic_url:string
    }>
}
interface SCROLL{
    scrollButton:Function,
}
interface DispatchTypes{
    topice:Function
}
let TopicDetailPage: React.FC<DispatchTypes&StateType&SCROLL&RouteComponentProps>= props=>{
    let [page,setPage]=useState(1)
    useEffect(() => {
        props.topice(page);
        console.log(props.data)
        window.addEventListener('scroll',scrollButton)//添加滚动事件
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const scrollButton =()=>{
        const scrollY= window.scrollY//滚动的距离
        const viewHeight=window.innerHeight//内容的高度
        const FatherHeight=document.body.children[1].children[0].clientHeight//父元素的高度
        if(Math.round(scrollY+viewHeight)>=FatherHeight-50){
            if(page<2){
                setPage(page++)

                props.topice(page)
            }
        }
    }
    const getDetail=(id:any)=>{
        props.history.push(`/topicDetail/${id}`)
    }
    
    return <>
    {
       props.data.map(item=>{
            return <div key={item.id} className={styles.topice} onClick={()=>getDetail(item.id)}>
                <div className={styles.topiceimg}>
                    <img src={item.scene_pic_url} alt=""/>
                </div>
                <div className={styles.topicetop}>
                    {item.title}
                </div>
                <div className={styles.topicecenter}>
                    {item.subtitle}
                </div>
                <div className={styles.topicefooter}>
                    {item.price_info}元起
                </div>
            </div>
        })
    }
    </>;
}
 const mapStateToProps=(state:any)=>{
     
    return  state.topice
}
const mapDispatchToProps=(dispatch:Function)=>{
return {
    topice: (page:number)=>{
        console.log(page)
        dispatch(TopiceAction(page))
    }
}
}

export default connect(mapStateToProps,mapDispatchToProps)(TopicDetailPage);