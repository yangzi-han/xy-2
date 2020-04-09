import React from 'react'
import styles from './index.module.scss'
interface PropsType {
    categoryList: Array<{
        [name: string]: string | number
    }>
}
export default class TypeList extends React.Component<PropsType>{
    state = {
        activeIndex: 1005000
    }
    tablist = (id: any) => {
        this.setState({
            activeIndex: id
        })
    }
    render() {
        return (
            <div className={styles.typePageWrapTab}>
                {
                    this.props.categoryList&&this.props.categoryList.map(item => {
                        return <div
                            key={item.id}
                            onClick={() => { this.tablist(item.id) }}
                            className={this.state.activeIndex == item.id ? styles.active : ''}
                        >{item.name}</div>
                    })
                }
            </div>
        )
    }
}