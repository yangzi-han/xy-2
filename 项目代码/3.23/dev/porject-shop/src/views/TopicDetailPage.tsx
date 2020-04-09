import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from './scss/detail/topicDetail/detail.module.scss'
import { detailAction } from '../store/actions/topic'

interface DispatchType {
    getDetail: (id: string) => void,
    // getDetailRelated: Function,
}

interface StateType {
    detail: {
        // [title: string]: string | number,
        title: string,
        content: string,
        [key: string]: string
    }
}

let TopicDetailPage: React.FC<StateType & RouteComponentProps<{ id: string }> & DispatchType> = (props) => {
    useEffect(() => {
        let id = props.match.params.id;
        props.getDetail(id);
        // props.getDetailRelated(id)
    }, []);
    let back=()=>{
        window.history.go(-1)
    }
    return <div className={styles.detailPage}>
        <div className={styles.detailHeader}>
            {/* <p>返回</p> */}
            <span onClick={back}>&lt;</span>
            <p>{props.detail.title}</p>
            {/* <p></p> */}
        </div>
        <div className={styles.detailImg} dangerouslySetInnerHTML={{ __html: props.detail.content }}></div>
        {/* <div className={styles.detailTitle}>
                <div className={styles.detailText}>推荐专题</div>
                <div className={styles.detailItem}>
                    {
                        props.topicDetailRelated ? props.topicDetailRelated.map(item => {
                            return <div key={item.id}>{item.title}</div>
                        }) : ''
                    }
                </div>
            </div> */}
    </div>
}
const mapStateToProps = (state: any) => {
    console.log('专题详情', state.topic.topicDetail)
    return {
        detail: state.topic.topicDetail
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getDetail: (id: any) => {
            dispatch(detailAction(id))
        },
        // getDetailRelated: (id: any) => {
        //     dispatch(detailRelatedAction(id.id))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicDetailPage)