import React from 'react'
import styles from '../style/index.module.scss'
import {connect} from 'react-redux'

let SeachPage: React.FC = props=>{
    return <div className={styles.noTabPageContent}>
        <div className={styles.searchPage}>
            <div className={styles.searchFix}>
                <div className={styles.Input}>
                    <div className={styles.searchInputWrap}>
                        <div className='iconfont icon-fanhui'></div>
                        <input type="text" placeholder="520元礼包抢先领"/>
                        <div>取消</div>
                    </div>
                </div>
            </div>
            <div className={styles.searchMsg}>
                <div className={styles.searchItemWrap}>
                    <div className={styles.title}>
                        历史记录
                        <i>清空历史记录</i>
                    </div>
                    <div className={styles.listWraps}>
                        {

                        }
                    </div>
                </div>
                <div className={styles.searchItemWrap}>
                    <div className={styles.title}>热门搜索</div>
                    <div className={styles.listWrap}></div>
                </div>
            </div>
        </div>
    </div>;
}

const mapStateToProps = (state: any)=>{
    console.log(state,'1111111111111111')    
    return{
        
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        
    }
}
export default connect(mapStateToProps,mapDisptachToProps)(SeachPage);