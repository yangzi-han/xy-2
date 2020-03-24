

import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {bannerAction} from '../../store/actions/home'
import {RouteComponentProps} from 'react-router'

interface StateType{
    banner: Array<{
        image_url: string,
        [name:string]: string|number
    }>,
    channel: Array<{
        [name:string]: string|number
    }>,
    newGoodsList: Array<{
        [name:string]: string|number
    }>,
    hotGoodsList: Array<{
        [name:string]: string|number
    }>,
    brandList: Array<{
        [name:string]: string|number
    }>,
    topicList: Array<{
        [name:string]: string|number
    }>,
    categoryList: Array<{
        [name:string]: string|number
    }>
}

interface DispatchType{
    getBanner: Function
}

let IndexPage: React.FC<StateType & DispatchType & RouteComponentProps> = props=>{
    useEffect(()=>{
        props.getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{
        props.banner.map(item=>{
            return <img key={item.id} src={item.image_url} alt="" />
        })
    }</>;
}

const mapStateToProps = (state: any)=>{
    return state.home
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getBanner: ()=>{
            dispatch(bannerAction())
        }
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(IndexPage);