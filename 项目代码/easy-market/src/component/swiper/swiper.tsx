import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
interface PropsType{
    banner: Array<{
        image_url: string,
        [name:string]: string|number
    }>,
}

class Swiper extends React.Component<PropsType> {
  state = {
    data: [],
    imgHeight: 176,
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
          infinite
          beforeChange={(from, to) =>{ console.log(`slide from ${from} to ${to}`)}}
          afterChange={index => {console.log('slide to', index)}}
        >
          {this.props.banner.map(item => (
            <a
              key={item.id}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={item.image_url}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Swiper