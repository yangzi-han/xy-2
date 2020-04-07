import React, {useEffect,useState} from 'react'
import {connect} from 'react-redux'
import { goodsDetailAction, goodsRelatedAction} from '../../store/actions/detail';
import {collectAddAction} from '../../store/actions/collect';
import {RouteComponentProps} from 'react-router'
import styles from '../../static/detail.module.scss'
import '../../static/foot/font_mahgalwz6ys/iconfont.css'
// import { Carousel, WingBlank,Toast} from 'antd-mobile';
import {Toast} from 'antd-mobile'
// import { getCollectAdd } from '../../api/collect';
interface DispathProps{
   getGoodsDetail:Function,
   getGoodsRelated:Function,
   getCollectAdd:Function
   info:{
      name:string,
      goods_brief:string,
      id:number,
      retail_price:string,
      goods_desc:string
   },
   issue:Array<{
       name:string,
       id:number,
       question:string,
       answer:string
   }>,
   goodsList:Array<{
       id:number,
       name:string,
       list_pic_url:string,
       retail_price:number
   }>
   gallery:Array<{
       id:number,
       img_url:string,
       length:number
   }>
   attribute:Array<{
       value:string,
       name:string,
       id:number
   }>
}
let DetailGoods:React.FC<DispathProps&RouteComponentProps<{id:string}>>=props=>{
  let [id]=useState(props.match.params)
  
   useEffect(()=>{
     props.getGoodsDetail(id)
     props.getGoodsRelated(id)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   let goBack=()=>{
    props.history.push('/index/home')
   }
   let goCollect=()=>{
     console.log(props.match.params)
     props.getCollectAdd(props.match.params.id)
     Toast.success('收藏成功',1)
   }
   return <>
     <div className={styles.goods_detail_header}>
         <span>
           <p className="iconfont icon-fanhui" onClick={goBack}></p> 
         </span>
         <span>{props.info&&props.info.name}</span>
         <span></span>
     </div>
     <div className={styles.goods_detail_banner}>
        <div>
        {/* <WingBlank style={{margin:0}}>
        <Carousel
          autoplay={true}
          dots={false}
          infinite
        >
           {
            props.gallery&&props.gallery.map(item=>{
                return <div key={item.id} style={{ display: 'inline-block'}}>
                   <img src={item.img_url} alt="" onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    }}/>
                </div> 
            })
           }
          </Carousel>
        </WingBlank>   */}
        </div>
        <div>
          <span>
            <i>☆</i>
            30天无忧退换
          </span>
          <span>
            <i>☆</i>
            48小时快速退换
          </span>
          <span>
            <i>☆</i>
            满88天免邮费
          </span>
        </div>
     </div>
     <div className={styles.goods_detail_text}>
       <div>
         <p>{props.info&&props.info.name}</p>
         <p>{props.info&&props.info.goods_brief}</p>
         <p>
           ￥
           {props.info&&props.info.retail_price}
         </p>
       </div>
       <div>
         <span>
          ×0
         </span>
         &nbsp;
         &nbsp;
         <span>
          选择规格
         </span>
       </div>
     </div>
     <div className={styles.goods_detail_num}>
       <div className={styles.num_text1}>
          商品参数
       </div>
       <div className={styles.num_text2}>
          {
              props.attribute&&props.attribute.map((item,index)=>{
                  return <div key={index} className={styles.num_Item}>
                    <span className={styles.numName}>{item.name}</span>
                    <span className={styles.numValue}>{item.value}</span>
                  </div>
              })
          }
       </div>
       <div dangerouslySetInnerHTML = {{ __html:props.info&&props.info.goods_desc }} className={styles.num_Img}></div>
     </div>
     <div className={styles.goods_detail_prom}>
        <div className={styles.text1}>
          常见问题
        </div>
        <div className={styles.text2}>
          {
             props.issue&&props.issue.map((item)=>{
                return <div key={item.id} className={styles.textItem}>
                   <div className={styles.textQuestion}>
                        <i>√</i>
                       {item.question}
                    </div>
                   <div className={styles.textAnswer}>{item.answer}</div>
                </div>
             })
          }
        </div>
     </div>
     <div className={styles.goods_list_wrap}>
        <div className={styles.text1}>
           大家都在看
        </div>
        <div className={styles.text2}>
          {
             props.goodsList&&props.goodsList.map((item)=>{
                return <div key={item.id} className={styles.goods_list_item}>
                    <div className={styles.goods_list_img}>
                      <img src={item.list_pic_url} alt=""/>
                    </div>
                    <div className={styles.goods_list_name}>{item.name}</div>
                    <div className={styles.goods_list_price}>
                      ￥
                      {item.retail_price}
                      元
                    </div>
                </div>
             })
          }
        </div> 
     </div>
     <div className={styles.goods_detail_footer}>
        <div className={styles.goods_detail_footer_box1}>
          <span className="iconfont icon-star" onClick={goCollect}></span>
          <span className="iconfont icon-ziyuan"></span>
        </div>
        <div className={styles.goods_detail_footer_box2}>
            <div className={styles.addShop}>加入购物车</div>
            <div className={styles.addMai}>立即购买</div>
        </div>
     </div>
   </>
}
const mapStateToProps = (state: any)=>{
    // console.log(state.detail.goodsDetail.attribute,'2222')
    return {
        info:state.detail.goodsDetail.info,
        issue:state.detail.goodsDetail.issue,
        goodsList:state.detail.goodsRelated.goodsList,
        gallery:state.detail.goodsDetail.gallery,
        attribute:state.detail.goodsDetail.attribute
    }
}
const mapDisptachToProps = (dispatch: Function)=>{
    return {
        getGoodsDetail:(id:any)=>{
            dispatch(goodsDetailAction(id.id))
        },
        getGoodsRelated:(id:any)=>{
            dispatch(goodsRelatedAction(id.id))
        },
        getCollectAdd:(valueId:any)=>{
          // console.log(valueid.id.valueid)
            dispatch(collectAddAction(valueId))
        }
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(DetailGoods)