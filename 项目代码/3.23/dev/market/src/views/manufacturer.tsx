import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { ManufacturerAction } from '../store/actions/manufacturer'
import styles from '../scss/ck.module.scss'
interface DispatchType {
    getManufacturer: Function
}
interface ActionType {
    Manufacturer: {
        name: string,
        id: string,
        list_pic_url: string,
        simple_desc: string
    }
}
let Manufacturer: React.FC<RouteComponentProps<{ id: string }> & DispatchType & ActionType> = props => {
    useEffect(() => {
        props.getManufacturer(props.match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let back=()=>{
        props.history.go(-1)
    }
    return <>
        <div className={styles.top}>
            <span className={styles.left} onClick={()=>back()}>&lt;</span>
            {props.Manufacturer&&props.Manufacturer.name}
        </div>
        <div className={styles.center}>
            <img src={props.Manufacturer&&props.Manufacturer.list_pic_url} alt=""/>
        </div>
        <div className={styles.footer}>
        {props.Manufacturer&&props.Manufacturer.simple_desc}
        </div>
        </>
}
let mapStateToProps = (state: any) => {
    console.log(state.manufacturer)
    return {
        Manufacturer: state.manufacturer.brand
    }
}
let mapDispatchToProps = (dispatch: Function) => {
    return {
        getManufacturer: (id: string) => {
            dispatch(ManufacturerAction(id))
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Manufacturer)