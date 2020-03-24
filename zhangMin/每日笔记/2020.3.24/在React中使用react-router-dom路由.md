**知识点总结:**

## 在React中使用react-router-dom路由

使用React构建的单页面应用，要想实现页面间的跳转，首先想到的就是使用路由。在React中，常用的有两个包可以实现这个需求，那就是react-router和react-router-dom。本文主要针对react-router-dom进行说明。

### 安装

首先进入项目目录，使用npm安装react-router-dom：



```cpp
npm install react-router-dom --save-dev //这里可以使用cnpm代替npm命令
```

### 基本操作

然后我们新建两个页面，分别命名为“home”和“detail”。在页面中编写如下代码：



```jsx
import React from 'react';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <a>去detail</a>
            </div>
        )
    }
}
```

home.js



```jsx
import React from 'react';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <a>回到home</a>
            </div>
        )
    }
}
```

detail.js

然后再新建一个路由组件，命名为“Router.js”，并编写如下代码：



```jsx
import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../home';
import Detail from '../detail';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/detail" component={Detail}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;
```

如上代码定义了一个纯路由组件，将两个页面组件Home和Detail使用Route组件包裹，外面套用Switch作路由匹配，当路由组件检测到地址栏与Route的path匹配时，就会自动加载响应的页面。
 然后在入口文件中——我这里指定的是index.js——编写如下代码：



```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router';

ReactDOM.render(
  <Router/>,
  document.getElementById('root')
);
```

这里相当于向页面返回了一个路由组件。我们先运行项目看一下效果，在地址栏输入“[http://localhost:3000/#/](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A3000%2F%23%2F)”：

![img](https:////upload-images.jianshu.io/upload_images/6334988-218f06c2483c59ab.png?imageMogr2/auto-orient/strip|imageView2/2/w/954/format/webp)

home.js

输入“[http://localhost:3000/#/detail](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A3000%2F%23%2Fdetail)”：

![img](https:////upload-images.jianshu.io/upload_images/6334988-1acaaedd68e07674.png?imageMogr2/auto-orient/strip|imageView2/2/w/954/format/webp)

detail.js

### 通过a标签跳转

可以看到其实路由已经开始工作了，接下来我们再来做页面间的跳转。在home.js和detail.js中，我们修改如下代码：



```jsx
import React from 'react';


    export default class Home extends React.Component {
        render() {
            return (
                <div>
                <a href='#/detail'>去detail</a>
            </div>
        )
    }
}
```

home.js



```jsx
import React from 'react';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                <a href='#/'>回到home</a>
            </div>
        )
    }
}
```

detail.js
 重新打包运行，在浏览器地址栏输入“[http://localhost:3000/](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A3000%2F)”，试试看页面能否正常跳转。如果不能，请按步骤一步一步检查代码是否有误。以上是使用a标签的href进行页面间跳转，此外react-router-dom还提供了通过函数的方式跳转页面。

### 通过函数跳转

首先我们需要修改router.js中的两处代码：



```python
...
import {HashRouter, Route, Switch, hashHistory} from 'react-router-dom';
...
<HashRouter history={hashHistory}>
...
```

然后在home.js中：
 import React from 'react';



```jsx
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        return (
            <div>
                <a href='#/detail'>去detail</a>
                <button onClick={() => this.props.history.push('detail')}>通过函数跳转</button>
            </div>
        )
    }
}
```

在a标签下面添加一个按钮并加上onClick事件，通过this.props.history.push这个函数跳转到detail页面。在路由组件中加入的代码就是将history这个对象注册到组件的props中去，然后就可以在子组件中通过props调用history的push方法跳转页面。

很多场景下，我们还需要在页面跳转的同时传递参数，在react-router-dom中，同样提供了两种方式进行传参。

### url传参

在router.js中，修改如下代码：



```xml
...
<Route exact path="/detail/:id" component={Detail}/>
...
```

然后修改detail.js，使用this.props.match.params获取url传过来的参数：



```cpp
...
componentDidMount() {
    console.log(this.props.match.params);
}
...
```

在地址栏输入“[http://localhost:3000/#/detail/3](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A3000%2F%23%2Fdetail%2F3)”，打开控制台：

![img](https:////upload-images.jianshu.io/upload_images/6334988-28182a2ede7ea1f3.png?imageMogr2/auto-orient/strip|imageView2/2/w/421/format/webp)

可以看到传过去的id=3已经被获取到了。react-router-dom就是通过“/:”去匹配url传递的参数。

### 隐式传参

此外还可以通过push函数隐式传参。

修改home.js代码如下：



```jsx
import React from 'react';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    
    
    render() {
        return (
            <div>
                <a href='#/detail/3'>去detail</a>
                    <button onClick={() => this.props.history.push({
                        pathname: '/detail',
                        state: {
                            id: 3
                        }
                })}>通过函数跳转</button>
            </div>
        )
    }
}
```

在detail.js中，就可以使用this.props.history.location.state获取home传过来的参数：



```cpp
componentDidMount() {
    //console.log(this.props.match.params);
    console.log(this.props.history.location.state);
}
```

跳转后打开控制台可以看到参数被打印：

![img](https:////upload-images.jianshu.io/upload_images/6334988-e7b04222dd82d74f.png?imageMogr2/auto-orient/strip|imageView2/2/w/365/format/webp)

### 其他函数

#### replace

有些场景下，重复使用push或a标签跳转会产生死循环，为了避免这种情况出现，react-router-dom提供了replace。在可能会出现死循环的地方使用replace来跳转：



```kotlin
this.props.history.replace('/detail');
```

#### goBack

场景中需要返回上级页面的时候使用：



```css
this.props.history.goBack();
```

### 嵌套路由

嵌套路由的适用场景还是比较多的，接下来就来介绍一下实现方法。
 首先在Vue中实现嵌套路由，只需要将配置文件写成children嵌套，然后在需要展示子路由的位置加上<router-view></router-view>即可。React中应该如何实现呢？其实原理和Vue类似，只需要在父级路由中包含子路由即可。这样说可能很多同学会一头雾水，直接上代码（不使用上面的例子）：
 首先定义父级组件MainLayout



```jsx
import React from 'react';
import './MainLayout.scss';

const { Header, Sider, Content } = Layout;


export default class MainLayout extends React.Component {

    render() {
        return (
            <div className='main-layout'>
                父组件
            </div>
        );
    }
}
```

然后定义子组件Home：



```jsx
import React, {useState} from 'react';
import {Modal, Select} from "antd";
import {connect} from 'react-redux';
import {addCount} from '../../servers/home';


function Home(props) {
    const [visible, setVisible] = useState(false);
    const {countNum: {count}, dispatch} = props;

    return (
        <div>
            子组件
        </div>
    )
}

export default Home;
```

然后将它们添加进路由router.js，并且关联父子关系：



```dart
import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from '../pages/Home/Home';
import MainLayout from '../layout/MainLayout';

const BasicRouter = () => (
    <HashRouter>
        <Switch>
            <Route path="/index" component={
                <MainLayout>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/index" component={Home}/>
                  <Route path="/index/home" component={Home}/>
                </MainLayout>
             }/>
        </Switch>
    </HashRouter>
);


export default BasicRouter;
```

在MainLayout中，修改如下代码：



```jsx
import React from 'react';
import './MainLayout.scss';

const { Header, Sider, Content } = Layout;


export default class MainLayout extends React.Component {

    render() {
        return (
            <div className='main-layout'>
                {this.props.children}
            </div>
        );
    }
}
```