import React, { useEffect, useState } from 'react'
import styles from '../scss/topic/topic.module.scss'
import { topicAction } from '../../store/actions/topic';
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { throttle,debounce } from '../../utils/index'

interface DispatchType {
    getTopic: () => void
}

interface StateType {
    topiclist: Array<{
        id: number,
        [title: string]: string | number,
        price_info: number,
        scene_pic_url: string,
        subtitle: string
    }>
}

let TopicPage: React.FC<StateType & DispatchType & RouteComponentProps> = props => {
    useEffect(() => {
        props.getTopic();
    }, []);
    // console.log('数据', props)

    let detail = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        props.history.push('/topicDetail/' + id)
    }

    // 设置数值
    let [page, setPage] = useState<number>(0)
    useEffect(() => {
        let flag = false;
        let scrollHandle = (e: Event) => {
            if (flag) {
                return;
            }
            let scrollY = (e.currentTarget as Window).scrollY;
            if (document.documentElement.getBoundingClientRect().height - (window.innerHeight + scrollY) < 20) {
                console.log('到底不')
                // 判断数据
                if (props.topiclist.length <= (page + 1) * 10) {
                    return;
                }
                flag = true;
                setPage(page => page + 1)
                flag = false
                // util --> index  事件优化---防抖  节流
            }
        }
        let wrapHandle = throttle(scrollHandle)
        window.addEventListener('scroll', wrapHandle)
        return () => {
            window.removeEventListener('scroll', wrapHandle)
        }
    }, [props.topiclist])

    return <div className={styles.topicPage}>
        {
            props.topiclist ? props.topiclist.slice(0, (page + 1) * 10).map((item, index) => {
                return <div key={index} className={styles.topicPageItem} onClick={detail} data-id={item.id}>
                    <img src={item.scene_pic_url} alt="" />
                    <div className={styles.topicItemTitle}>{item.title}</div>
                    <div className={styles.topicItemSubtitle}>{item.subtitle}</div>
                    <div className={styles.topicItemPrice}>{item.price_info}元起</div>
                </div>
            }) : ''
        }
    </div>
}

let mapStateToProps = (state: any) => {
    console.log('专题数据', state)
    return {
        topiclist: state.topic.topiclist
    }
}

let mapDisptachToProps = (dispatch: Function) => {
    return {
        getTopic: () => {
            dispatch(topicAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TopicPage);