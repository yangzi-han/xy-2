import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import {releaseAction} from '../../store/actions/release'
import {RouteComponentProps} from 'react-router-dom'
import styles from '../../static/release.module.scss'
// import { getReleaseList } from '../../api/release';
interface ItemType{
    id:number,
    title:string,
    price_info:number,
    subtitle:string,
    scene_pic_url:string
}
interface StateProps{
   release:Array<ItemType>
}
interface DispatchProps{
  getReleaseList:()=>void
}
let Release:React.FC<DispatchProps&StateProps&RouteComponentProps>=(props)=>{
    console.log('props',props)
    useEffect(()=>{
       props.getReleaseList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    let goDetail=(e:React.MouseEvent<HTMLLIElement>)=>{
        //监听事件的元素
       let id = e.currentTarget.dataset.id;
       props.history.push('/detail/id='+id)
    }
    return <>
    <div className={styles.releaseWrap}>
    {
       props.release.map(item=>{
          return <li key={item.id} onClick={goDetail} data-id={item.id} className={styles.releaseItem}>
              <img src={item.scene_pic_url} alt="" className={styles.releaseImg}/>
              <p className={styles.releaseTitle}>{item.title}</p>
              <p className={styles.releaseSubtitle}>{item.subtitle}</p>
              <p className={styles.releasePrice}>{item.price_info}元起</p>
          </li>
       })
    }
    </div>
    </>
}
const mapStateToProps=(state:any)=>{
    return {release:state.release.release}
}
const mapDispatchToProps=(dispatch:Function)=>{
    return {
        getReleaseList:()=>{
            dispatch(releaseAction());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Release)