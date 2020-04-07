import { PickerView, WhiteSpace } from 'antd-mobile';
import React from 'react'

const province = [
  {
    label: '北京',
    value: '2',
    children: [
      {
        label: '北京市',
        value: '37',
        children: [
            {
              label: '海淀区',
              value: '410',
            },
            {
              label: '朝阳区',
              value: '411',
            },
            {
              label: '崇文区',
              value: '412',
            },
            {
              label: '宣武区',
              value: '413',
            },
        ]
      }
    ],
  },
  {
    label: '浙江',
    value: '02',
    children: [
      {
        label: '杭州',
        value: '02-1',
        children: [
          {
            label: '西湖区',
            value: '02-1-1',
          },
          {
            label: '上城区',
            value: '02-1-2',
          },
          {
            label: '江干区',
            value: '02-1-3',
          },
          {
            label: '下城区',
            value: '02-1-4',
          },
        ],
      },
      {
        label: '宁波',
        value: '02-2',
        children: [
          {
            label: 'xx区',
            value: '02-2-1',
          },
          {
            label: 'yy区',
            value: '02-2-2',
          },
        ],
      },
      {
        label: '温州',
        value: '02-3',
      },
      {
        label: '嘉兴',
        value: '02-4',
      },
      {
        label: '湖州',
        value: '02-5',
      },
      {
        label: '绍兴',
        value: '02-6',
      },
    ],
  },
];

class PickerViewExample extends React.Component {
  state = {
    value: ["2", "37", "410"],
  };
  onChange = (value:[]) => {
    console.log(value);
    this.setState({
      value,
    });
  }
  onScrollChange = (value:[]) => {
    console.log(value);
  }
  render() {
    return (
      <div>
        <PickerView
            onChange={this.onChange}
            onScrollChange={this.onScrollChange}
            // value={this.state.value}
            cascade={true}
            data={province}
            value={this.state.value}
        />
        <WhiteSpace /><WhiteSpace />
      </div>
    );
  }
}
export default PickerViewExample
