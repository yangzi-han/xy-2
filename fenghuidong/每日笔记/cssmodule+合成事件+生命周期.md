# 2020/3/20
### 船长
#### 样式绑定
- className代替了class
- 局部样式，cssModule
    - 模块化的编译原理就是用：local的编译，：glodal是不会被编译的，同时也不能通过style获取，只能字符串书写
    - 通过composes继承样式


#### 创建组件的方式
- 函数式组件（视图组件），就是普通函数
- 类组件（容器组件），继承React.Component或React.PureComponent
- Hooks组件（容器组件），就是普通函数+hooks，方便复用带状态的组件
- JSX
#### 生命周期
##### 创建期
- constructor
- componentWillMount
- render
- componentDidMount

##### 更新期
- componentWillReceiveProps(如果props更新)
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

##### 销毁期
- componentWillUnmount

##### 19年新出的两个生命周期
- getSnapshotBeforeUpdate //替换componentWillUpdate
- getDerivedStateFromProps // 替换componentWillReceiveProps

####　事件绑定
- 合成事件
- 事件绑定的this
    - 优化的事件绑定方式
        - 在constructor里将时间绑定bind
        - 对象自变量函数
    - 下面两种方式会导致不必要的从新渲染
        - 在render里bind
        - 箭头函数