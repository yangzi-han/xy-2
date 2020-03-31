import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
// interface PropsType{
//     banner: Array<{
//         image_url: string,
//         [name:string]: string|number,
//     }>,
// }

class TabBar extends React.Component {
  state = {
    tabs:[
        { title: '1 Tab', key: 't1' },
        { title: '2 Tab', key: 't2' },
        { title: '3 Tab', key: 't3' },
      ]
  }
  render() {
      const {tabs} = this.state
    return (
        <div style={{ height: 200 }}>
        <WhiteSpace />
        <Tabs tabs={tabs}
          initialPage={'t1'}
          tabBarPosition="left"
          tabDirection="vertical"
          tabBarUnderlineStyle
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of second tab
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default TabBar