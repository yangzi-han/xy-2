import React from 'react';
import styles from "./footer.module.scss";
interface PropTypes{
    totalPrice:number,
    totalNum:number
}

class Footer extends React.Component<PropTypes>{
    render () {
        return <>
            <p className={styles.footer}>
                <span>
               总量 {this.props.totalNum}
                </span>
                <span>
                总价{this.props.totalPrice}
                </span>
            </p>
        </>
    }
}
export default Footer