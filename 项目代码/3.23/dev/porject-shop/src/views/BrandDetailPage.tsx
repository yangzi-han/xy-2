import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styles from './scss/detail/brandDetail/brand.module.scss'
import { brandAction } from '../store/actions/homes'

interface DispatchProps {
    getBrand: (id: string) => void
}

interface StateProps {
    brand: {
        name: string,
        list_pic_url: string,
        simple_desc: string
    }
}

let BrandDetailPage: React.FC<StateProps & RouteComponentProps<{ id: string }> & DispatchProps> = props => {
    let [id] = useState(props.match.params.id)
    // console.log('制造商Id', id)
    useEffect(() => {
        props.getBrand(id);
    }, []);
    let back=()=>{
        props.history.go(-1)
    }
    // console.log(props.brand)
    return <div className={styles.brandDetail}>
        <div className={styles.header}>
            <div className={styles.title}> <span className={styles.left} onClick={back} >&lt;</span>{props.brand && props.brand.name}</div>
        </div>
        <div className={styles.detailImg}>
            <img src={props.brand && props.brand.list_pic_url} alt="" />
            <div className={styles.breadDesc}>{props.brand && props.brand.simple_desc}</div>
        </div>
    </div>
}

let mapStateToProps = (state: any) => {
    console.log('详情数据', state.home)
    return { brand: state.home.brand }
}
let mapDisptachToProps = (dispatch: Function) => {
    return {
        getBrand: (id: any) => {
            dispatch(brandAction(id))
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(BrandDetailPage);