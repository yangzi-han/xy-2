## react-router-dom
#### react-router与react-router-dom的区别
1、react-router: 实现了路由的核心功能
2、react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能，例如： Link组件，会渲染一个a标签，Link组件源码a标签行; BrowserRouter和HashRouter组件，前者使用pushState和popState事件构建路由，后者使用window.location.hash和hashchange事件构建路由
3、react-router-dom依赖react-router，所以我们使用npm安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装react-router。基于浏览器环境的开发，只需要安装react-router-dom
#### 安装
```
npm i -S react-router-dom
```
#### API

所有路由组件的最底层接口

渲染或中第一个匹配location的组件，且子元素只能为或

React router中最重要的模块，主要职责是当location匹配路由时，会将UI render出来 1. component: 当传递component渲染UI时，router将会用React.createElement来将组件封装成一个新的React element, 当传递一个inline func, react每次render都会unmount, mount一个新的组件，会消耗性能，此时可以使用render/children prop
```
2. render: func, inline func不会有上述性能问题，参数同route props相同

    3. children: func, 有时，无论location是否匹配路由，你都想render某个UI，此时可以使用children prop ,等同于render。 函数参数同route props

    component, render优先级高于children，所以不要一次使用一种以上的渲染方式

    4. path: string | string[], 一个url字符串，或者一组url 字符串，会进行正则匹配 
    5. exact: bool, 为true, 要精准匹配，path同location.pathname完全一致
```
使用redirect将跳转到一个新的路由，新的location将会覆盖history stack中的当前location 1. to: string, url地址 2. to: object, location object, 属性有：pathname: 跳转路径，search: 查询参数， hash: url中的hash, eg. #a-hash, state:存储到location中的额外状态数据. location中的state可以在redirect跳转组件的this.props.location.state访问
```
3. push: 为true表示redirect path将往history stack中推一条新数据而不是替换他
4. from: redirect from url, 会进行正则匹配。只能用在<Switch>中
5. exact: bool, 精准匹配
```
进入页面路由的链接 1. to: string, 路由链接， 由location的path, search, hash属性拼接而成。 2. to : object { pathname: 跳转路径，search: 查询参数， hash: url中的hash, eg. #a-hash, state:存储到location中的额外状态数据
```
3. replace: 布尔值- 为true时，将会替换history stack中的当前路径
innerRef: function 允许访问Link的底层组件<a></a>，eg. <Link to='/' innerRef={(node)=>{this.refNode=node}} />
```
的特殊版本，当匹配当前URL时，会给当前link添加样式 activeClassName: string, 渲染样式 activeStyle:object, 渲染样式 exact: bool, 为true时，表示精准匹配路由。 strict: bool, 为true时，当进行路由匹配时，后置斜杠将会被考虑在内
#### 引用及配置
```
import {BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';

class App extends Component {
  static defaultProps = {
    params: '哈哈'
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 继承这个react的基类，才能有render()
  render() {
    return (
      <Fragment>

        <Router>  
            <Link to="/about/page1">page1</Link>
            <Link to="/about/page2">page1</Link>
            <NavLink className="menu-link" activeClassName="active" exact activeStyle={{color: '#fff'}} to='/home'>首页</NavLink>
            <NavLink activeClassName={'active'} activeClassName="active"  to="/about">跳转到about</NavLink>
            <Switch>
              {/* <Redirect from="/" to="/home" exact></Redirect> */}
              <Route path="/home" exact   component={() => <div>HOME</div>}/>
              <Route path="/about" component={() => <div>{this.props.children}</div>}>
                  <Switch>
                      <Redirect from="/about" to="/about/page1" exact></Redirect>

                      <Route path="/about/page1"   exact component={() => <div>about-page-1</div>}/>
                      <Route path="/about/page2" exact   component={() => <div>about-page-2</div>}/>
                  </Switch>
              </Route>
            </Switch>
        </Router>
      </Fragment>
    )
  }
}
```
#### 路由的传参
1、第一种方式通过动态路由
```
function My(props) {
  console.log(props.match.params); // 参数
  return (
    <div>

    </div>
  )
}
<Link to={"/my/1"}>我的</Link>
  <Switch>
    <Route path="/my/:id" component={My}></Route>
  </Switch>
```
js跳转
```
this.props.history.push('/my/'+'2');
```
1、第二种方式：通过query
前提：必须由其他页面跳过来，参数才会被传递过来
```
function My(props) {
  console.log(props.match.params); // 通过动态路由
  console.log(props.location.query); // 通过query
  console.log(props.location.state); // 通过state
  return (
    <div>

    </div>
  )
}
<Link to={{ path : '/my' , query : { id : 1 }}}>我的</Link>
  <Switch>
    <Route path="/my" component={My}></Route>
  </Switch>
this.props.history.push({ path : '/my' ,query : {id: 1} })
```
1、第三种方式： 通过state
```
<Link to={{pathname: '/my' , state:{ id : 1 }}}>我的</Link>
  <Switch>
    <Route path="/my" component={My}></Route>
  </Switch>
this.props.history.push({ pathname: '/my' ,state: {id: 1} })
```