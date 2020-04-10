import React from 'react'
import {RouteComponentProps,withRouter} from 'react-router'
import styles from './index.module.scss'
import Lazyload  from 'react-lazyload'
interface PropsType{  
        goodsList:Array<{
            list_pic_url:string,
            [name:string]: string|number
        }>,
        [name:string]: string|number|Array<{}>,
}

class CateGroyBox extends React.Component<PropsType&RouteComponentProps> {
    detail=(id:any)=>{
        this.props.history.push('/goodsDetail/'+id)
    }
    render() {
    return <div className={styles.cateGoryGoodsWrap}>
                {
                    this.props.goodsList.map(item=>{
                        return <div className={styles.goodsItem} onClick={()=>{this.detail(item.id)}} key={item.id}>
                           <Lazyload><img src={item.list_pic_url.replace('http:','')} alt=""/></Lazyload>
                            <div className={styles.goodsItemName}>{item.name}</div>
                            <div className={styles.goodsItemPrice}>￥{item.retail_price}</div>
                        </div>
                    })
                   
                }
                {
                    this.props.goodsList.length!=0?<div className={styles.categoryMoreGoods}>
                        <div>更多{this.props.name}好物</div>
                        <Lazyload>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUh
                            EUgAAAEMAAABDCAMAAADwFEhBAAAABGdBTUEAALGPC/xhBQAAAA
                            FzUkdCAK7OHOkAAABLUExURf///4uLi7KysszMzHJycvb29qurq
                            2ZmZv7+/m1tbZSUlN3d3Xd3d35+fsbGxtnZ2e/v7/z8/J2dneH
                            h4evr676+voaGhri4uNPT04zm/X4AAAIzSURBVFjDvVjRlqsgDK
                            wojgEsYq36/196pbZdRVyjh728eCxlIGEySbzd/nI0uWh7QwCZv
                            hV5cxrgUdYIRl0+TgDIwQOQErlu5PTa6Fwo8jCDZCKIAjCldeuf
                            nS0NUAgGSnWfELLRxebcmE0o9+oAopv+ldn9eevnu18hcjrax5+
                            T8l/mS0Ad2isVUO7t41rQs2K47EloXRxCgUbe1Y0EFQOpWhSay
                            yBdoI2cuARpPg01odzeCMieCQZLCG+nIzzPRdQTtOZJlUFV5zAq
                            hWy15I5Cng1taXBfvharV+bIVxuL4FjMkUEsj6GvKJ1eHGRAdk0
                            uMwwfD9cYr2GMqKvPkUx1DcOZjxPKCG3D0ddRXf8urWEZlpuYel
                            nUcx4BuWNCTSCR1OAIzUwVxWFlhiICoubIEwx3vCVqa7OYaaaYPP
                            dSOW75/jKi55J0UrqNomv0/mHATcde94MzNzD+QeCHvUAgVRKFfw
                            Cn1GsRq6/VtMXA8VgmKDdjrG3hYGxt4ft0tmVYafns0/6EAG18+r
                            5bxdbSyN2+Ocbk+kzUPM51XsztcP0dc6zY34m5KfY7tgbtxP5Hg1h
                            aKPuoBn2XTmni0Jg+qoXum5g4uSGuyT+5IUWO8rnSXoGwy6SdIGcnq
                            R1S1DBXaqlbWEulqOmS1JZJatxXrc1u2B7xWnsnoe4Zotx+78Fy52
                            7vkaQHStKLpekJk/SmPz2yDntkze6Rg169k87J7nSvnuabQfDtorj4
                            7eK/j3/n9xya7EBtgAAAAABJRU5ErkJggg==" alt=""/>
                        </Lazyload>
                    </div>:''
                }  
        </div>
    }
}


export default withRouter(CateGroyBox)