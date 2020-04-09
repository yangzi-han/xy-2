import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import styles from './scss/classify/classify.module.scss'
import { typeNavAction, classifyListAction } from '../store/actions/type'

interface DispatchType {
    getClassify: Function,
    getClassifyList: Function
}

interface StateType {
    brotherCategory: Array<{
        [name: string]: string | number
    }>,
    currentCategoryTitle: {
        name: string,
        front_name: string
    },
    classifyList: Array<{
        [name: string]: string | number,
        list_pic_url: string,
        retail_price: number
    }>
}

let ClassifyPage: React.FC<RouteComponentProps<{ id: string }> & DispatchType & StateType> = (props) => {
    let [id] = useState(props.match.params.id);
    // console.log('传Id', id)
    let [newIndex, setFlag] = useState(props.match.params.id)
    useEffect(() => {
        setFlag(newIndex = id)
        props.getClassify(id)
        props.getClassifyList(id)
    }, []);

    
    let tabId = (id: any) => {
        // console.log('newIndex = id', newIndex, id)
        setFlag(newIndex = id)
        props.getClassify(id)
        props.getClassifyList(id)
    }

    let goodsDetail = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        // console.log('classify详情id',id)
        props.history.push('/goodsDetail/' + id)
    }
    let back=()=>{
        window.history.go(-1)
    }
    return <div className={styles.classifyPage}>
        <div className={styles.classifyPageHeader}>
            <span className={styles.left} onClick={back}>&lt;</span>
            <p>奇趣分类</p>
        </div>
        <div className={styles.classifyPageBox}>
            {
                props.brotherCategory.map(item => {
                    return <div key={item.id} onClick={() => { tabId(item.id) }}
                        className={newIndex == item.id ? styles.active : ''}
                    >{item.name}</div>
                })
            }
        </div>

        <div className={styles.classifyPageBoxList}>
            <div className={styles.ListPageTitle}>
                <div>{props.currentCategoryTitle.name}</div>
                <div>{props.currentCategoryTitle.front_name}</div>
            </div>
            <div className={styles.ListPageData}>
                {
                    props.classifyList ? props.classifyList.map((item, index) => {
                        return <div key={index} className={styles.ListPageDataItem} onClick={goodsDetail} data-id={item.id}>
                            <img src={item.list_pic_url} alt="" />
                            <div className={styles.listPageName}>{item.name}</div>
                            <div className={styles.listPagePrice}>￥{item.retail_price}元</div>
                        </div>
                    }) : ''
                }
            </div>
        </div>
    </div>
}

const mapStateToProps = (state: any) => {
    console.log('分类Classify', state.type)
    return { ...state.type }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getClassify: (id: string) => {
            dispatch(typeNavAction(id))
        },
        getClassifyList: (id: string) => {
            dispatch(classifyListAction(id))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassifyPage);