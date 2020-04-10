import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import styles from './index.module.scss'
import Lazyload from 'react-lazyload'
interface PropsType{
    topicList: Array<{
        item_pic_url:string,
        [name:string]: string|number
    }>,
}

class SwiperCarousel extends React.Component<PropsType> {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
  }
//   componentDidMount() {
//     // simulate img loading
//     setTimeout(() => {
//       this.setState({
//         data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
//       });
//     }, 100);
//   }
  render() {
    return (
      <WingBlank  style={{margin:0}}>
        <Carousel className={styles.spacecarousel}
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          dots={false}
          autoplay
          autoplayInterval={2000}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.props.topicList.map((val, index) => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{
                display: 'block',
                position: 'relative',
                height: this.state.imgHeight,
                // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Lazyload>
              <img
                src={val.item_pic_url.replace('http:','')}
                alt=""
                style={{ width: '100%',height:'176px'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              /></Lazyload>
              <p className={styles.topGoodSubTitle}>{val.title} <span className={styles.topGoodPrice}>￥{val.price_info}元起</span> </p>
              <p className={styles.topGoodTitle}>{val.subtitle}</p>
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default SwiperCarousel