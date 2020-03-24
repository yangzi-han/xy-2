import React from 'react'
import data from '../../../api/data.json'
import {Card} from 'antd'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
class Th extends React.Component{
  state={
    list:data
  }
  getOption = ()=>{
    let option = {
        tooltip : {
            trigger: 'item',
            //提示框浮层内容格式器，支持字符串模板和回调函数形式。
            formatter: "{a} <br/>{b} : {c} ({d}%)" 
        },
        series : [
            {
                name:'投票',
                type:'pie',
                data:[
                    {value:1000},
                    {value:1500},
                    {value:2000},
                    {value:2500},
                ],
            }
        ]
    }
    return option;
}
  render(){
      let {list}=this.state
      return (
          <div className="list">
            <ul>
              {
                 list.map((item,index)=>{
                    return <li key={index}>
                      <div className="top">
                        <p>{item.name}</p>
                        <p>{item.text}</p>
                      </div>
                      <div className="middle">
                        <p>{item.chooseA}</p>
                        <p>{item.chooseB}</p>
                        <p>{item.chooseC}</p>
                        <p>{item.chooseD}</p>
                      </div>
                      <div className="bottom">
                         <div id="main">
                           <Card.Grid className="pie_a">
                             <ReactEcharts option={this.getOption()}/>
                           </Card.Grid>
                         </div>
                      </div>
                    </li>
                 })
              }
            </ul>   
          </div>
      )
  }
}
export default Th