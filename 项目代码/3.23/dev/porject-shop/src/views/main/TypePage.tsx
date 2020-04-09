import React, { useEffect, useState } from 'react'
import styles from '../scss/type/type.module.scss'
import { typeAction, typeListAction } from '../../store/actions/type';
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

interface DispatchType {
    getType: Function,
    getTypeNav: Function,
    getTypeList: Function
}

interface StateTypes {
    categoryList: Array<{
        [name: string]: string | number,
    }>,
    currentCategory: {
        id: number,
        wap_banner_url: string,
        front_name: string,
        name: string,
        subCategoryList: Array<ItemType>
    }
}
interface ItemType {
    id: number,
    name: string,
    wap_banner_url: string
}

let TypePage: React.FC<DispatchType & StateTypes & RouteComponentProps> = props => {
    useEffect(() => {
        props.getType();
        // props.getTypeNav('1005000');
        props.getTypeList('1005000');
    }, []);

    let [flag, setFlag] = useState(0)
    let tabId = (id: any, index: number) => {
        console.log('tabid', id)
        props.getTypeList(id);
        // props.getTypeNav(id);
        setFlag(flag = index)
    }

    let goClassify = (e: React.MouseEvent<HTMLDivElement>) => {
        let id = e.currentTarget.dataset.id;
        props.history.push('/classifypage/' + id)
    }

    let search = () =>{
        props.history.push('/search')
    }

    return <div className={styles.typePageWrap}>
        {/* Input搜索 */}
        <div className={styles.typePageSearchWrap}>
            <input className={styles.typePageSearchInput} type="text" placeholder='搜索商品，共239款好物' onClick={search} />
        </div>
        {/* tab切换 */}
        <div className={styles.typePageTabWrap}>
            {
                props.categoryList ? props.categoryList.map((item, index) => {
                    return <div
                        key={index}
                        onClick={() => { tabId(item.id, index) }}
                        className={[`${styles.TabWrapName}`, `${index === flag ? styles.active : ''}`].join(' ')}
                    >{item.name}</div>
                }) : ""
            }
        </div>
        {/* 商品展示 */}
        <div className={styles.typePageList}>
            <div className={styles.typePageNavWrap}>
                <div className={styles.typePageNavImg}>
                    <img src={props.currentCategory && props.currentCategory.wap_banner_url} alt="" />
                    <div className={styles.typePageNavTitle}>{props.currentCategory && props.currentCategory.front_name}</div>
                </div>
                <div className={styles.typePageNavItem}>--  {props.currentCategory && props.currentCategory.name}分类 --</div>
            </div>
            <div className={styles.typePageListWrap}>
                {
                    props.currentCategory && props.currentCategory.subCategoryList.map(item => {
                        return <div key={item.id} className={styles.typePageListItem} onClick={goClassify} data-id={item.id}>
                            <img src={item.wap_banner_url} alt="" />
                            <div className={styles.typePageListItemName} >{item.name}</div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}

let mapStateToProps = (state: any) => {
    console.log('分类数据', state.type)
    return {
        ...state.type.type,
        // ...state.type.typeNav,
        ...state.type.typeList
    }
}

let mapDisptachToProps = (dispatch: Function) => {
    return {
        getType: () => {
            dispatch(typeAction())
        },
        // getTypeNav: (id: any) => {
        //     dispatch(typeNavAction(id))
        // },
        getTypeList: (id: any) => {
            dispatch(typeListAction(id))
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(TypePage);