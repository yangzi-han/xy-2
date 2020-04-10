import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import Lazyload from 'react-lazyload'
interface PropsType{
    banner: Array<{
        image_url: string,
        img_url:string,
        [name:string]: string|number
    }>,
}

class Swiper extends React.Component<PropsType> {
  state = {
    data: [],
    imgHeight:'100%',
  }
//   componentDidMount() {
//     // simulate img loading
//     setTimeout(() => {
//       this.setState({
//         data:banner,
//       });
//     }, 100);
//   }
  render() {
    return (
      <WingBlank style={{margin:0}}>
        <Carousel
          autoplay
          autoplayInterval={2000}
          infinite
          beforeChange={(from, to) =>{ console.log(`slide from ${from} to ${to}`)}}
          afterChange={index => {console.log('slide to', index)}}
        >
          {this.props.banner.map(item => (
            <a
              key={item.id}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <Lazyload>
              <img
                src={item.image_url?item.image_url.replace('http:',''):item.img_url.replace('http:','')}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              /></Lazyload>
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Swiper