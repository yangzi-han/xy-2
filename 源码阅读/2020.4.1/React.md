### React

UI框架

### Redux

状态管理工具，与React没有任何关系，其他UI框架也可以使用Redux

### react-redux

React插件，作用：方便在React项目中使用Redux

### react-thunk

中间件，作用：支持异步action

## 目录结构

------

Tips：与Redux无关的目录已省略



```ruby
|--src
    |-- store                 Redux目录
        |-- actions.js
        |-- index.js
        |-- reducers.js
        |-- state.js
    |-- components      组件目录
        |-- Test.jsx
    |-- App.js               项目入口
```

## 准备工作

------

第1步：提供默认值，既然用Redux来管理数据，那么数据就一定要有默认值，所以我们将state的默认值统一放置在state.js文件



```javascript
// state.js

// 声明默认值
// 这里我们列举两个示例
// 同步数据：pageTitle
// 异步数据：infoList（将来用异步接口获取）
export default {
    pageTitle: '首页',
    infoList: []
}
```

第2步：创建reducer，它就是将来真正要用到的数据，我们将其统一放置在reducers.js文件



```javascript
// reducers.js

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux'
// 默认值
import defaultState from './state.js'

// 一个reducer就是一个函数
function pageTitle (state = defaultState.pageTitle, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return action.data
    default:
      return state
  }
}

function infoList (state = defaultState.infoList, action) {
  switch (action.type) {
    case 'SET_INFO_LIST':
      return action.data
    default:
      return state
  }
}

// 导出所有reducer
export default combineReducers({
    pageTitle,
    infoList
})
```

第3步：创建action，现在我们已经创建了reducer，但是还没有对应的action来操作它们，所以接下来就来编写action



```javascript
// actions.js

// action也是函数
export function setPageTitle (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_PAGE_TITLE', data: data })
  }
}

export function setInfoList (data) {
  return (dispatch, getState) => {
    // 使用fetch实现异步请求
    window.fetch('/api/getInfoList', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        let { code, data } = data
        if (code === 0) {
            dispatch({ type: 'SET_INFO_LIST', data: data })
        }
    })
  }
}
```

最后一步：创建store实例



```javascript
// index.js

// applyMiddleware: redux通过该函数来使用中间件
// createStore: 用于创建store实例
import { applyMiddleware, createStore } from 'redux'

// 中间件，作用：如果不使用该中间件，当我们dispatch一个action时，需要给dispatch函数传入action对象；但如果我们使用了这个中间件，那么就可以传入一个函数，这个函数接收两个参数:dispatch和getState。这个dispatch可以在将来的异步请求完成后使用，对于异步action很有用
import thunk from 'redux-thunk'

// 引入reducer
import reducers from './reducers.js'

// 创建store实例
let store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store
```

至此，我们已经完成了所有使用Redux的准备工作，接下来就在React组件中使用Redux

## 开始使用

------

首先，我们来编写应用的入口文件APP.js



```javascript
import React from 'react'
import ReactDOM from 'react-dom'

// 引入组件
import TestComponent from './components/Test.jsx'

// Provider是react-redux两个核心工具之一，作用：将store传递到每个项目中的组件中
// 第二个工具是connect，稍后会作介绍
import { Provider } from 'react-redux'
// 引入创建好的store实例
import store from '@/store/index.js'

// 渲染DOM
ReactDOM.render (
  (
    <div>
        {/* 将store作为prop传入，即可使应用中的所有组件使用store */}
        <Provider store = {store}>
          <TestComponent />
        </Provider>
    </div>
  ),
  document.getElementById('root')
)
```

最后是我们的组件：Test.jsx



```javascript
// Test.jsx

import React, { Component } from 'react'

// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux'

// 引入action
import { setPageTitle, setInfoList } from '../store/actions.js'

class Test extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    let { setPageTitle, setInfoList } = this.props
    
    // 触发setPageTitle action
    setPageTitle('新的标题')
    
    // 触发setInfoList action
    setInfoList()
  }

  render () {
    // 从props中解构store
    let { pageTitle, infoList } = this.props
    
    // 使用store
    return (
      <div>
        <h1>{pageTitle}</h1>
        {
            infoList.length > 0 ? (
                <ul>
                    {
                        infoList.map((item, index) => {
                            <li>{item.data}</li>
                        })
                    }
                </ul>
            ):null
        }
      </div>
    )
  }
}

// mapStateToProps：将state映射到组件的props中
const mapStateToProps = (state) => {
  return {
    pageTitle: state.pageTitle,
    infoList: state.infoList
  }
}

// mapDispatchToProps：将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageTitle (data) {
        // 如果不懂这里的逻辑可查看前面对redux-thunk的介绍
        dispatch(setPageTitle(data))
        // 执行setPageTitle会返回一个函数
        // 这正是redux-thunk的所用之处:异步action
        // 上行代码相当于
        /*dispatch((dispatch, getState) => {
            dispatch({ type: 'SET_PAGE_TITLE', data: data })
        )*/
    },
    setInfoList (data) {
        dispatch(setInfoList(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
```

## Redux三大原则

------

- 单一数据源
   整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
- State 是只读的
   唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
- 使用纯函数来执行修改
   为了描述 action 如何改变 state tree ，你需要编写 reducers