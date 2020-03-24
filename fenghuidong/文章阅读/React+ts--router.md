## 利用 typescript 写 react-router 
#### react-router-dom
在 web 端使用，只需要导入这个包就可以了，因为它从 react-router 中拿过来了很多东西。
####　HashRouter / BrowerRouter
理解为路由容器，被包裹在里面的子组件就可以使用自己定义的路由组件了。
```
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root')
);
```
#### Route
路由组件，路由匹配时这个位置被渲染成相应的内容。

- path 需要匹配的路径
- component 匹配成功渲染的组件
- exact 是否严格匹配
```
<Route path="/home" exact component={ Home } />
```
这个例子中，只有当路径为 /home 时才会匹配。若没有 exact 属性，那么当路径为 /home 时，/、/home这两个路由组件都会被渲染。

#### 嵌套路由
v4 以上版本不再支持 { props.children } 的方式进行嵌套路由，而是直接把子路由组件放在父组件中需要渲染的位置。
```
// App.tsx
<div>
    <Route path="/" component={ Dashboard } />
</div>

// Dashboard.tsx
<div>
    <Header />
    <Route path="/home" component={ Home } />
    <Route path="/other" component={ Other } />
</div>
```
这样的嵌套路由写法，需要保证父组件与子组件有相同的路由前缀（/），且父组件没有 exact 属性。（目的是先渲染父组件，再匹配父组件内部定义的子路由组件）
#### 动态路由
和其他路由插件一样，使用冒号配置动态路由。
```
// Dashboard.tsx
<div>
    <Header />
    <Route path="/home" component={ Home } />
    <Route path="/other" exact component={ Other } />
    <Route path="/other/:id" component={ OtherDetail } />
</div>
```
/other/1 会匹配 /other 和 /other/:id 这两个路由组件，根据实际情况对 /other 路由组件设置 exact 属性。
#### useParams 获取路由参数
```
// @types/react-router/index.d.ts
export function useParams<Params extends { [K in keyof Params]?: string } = {}>(): { [p in keyof Params]: string };
```

useParams() 方法返回的是一个对象，直接取属性 TS 会提示空对象中不存在这个属性。按照 TS 的规范，可以在动态路由组件中，定义一个接口约定路由传递的参数。
```
// OtherDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
interface RouteParams {
    id: string
}
export default () => {
    const params = useParams<RouteParams>();
    return (
        <div>
            动态路由：{ params.id }
        </div>
    )
}
```
#### props 获取路由参数
路由组件的 props 数据类型为 RouteComponentProps
```
// @types/react-router/index.d.ts
export interface RouteComponentProps<Params extends { [K in keyof Params]?: string } = {}, C extends StaticContext = StaticContext, S = H.LocationState> {
    history: H.History;
    location: H.Location<S>;
    match: match<Params>;
    staticContext?: C;
}
```
其中 match 属性会用的比较多
```
// @types/react-router/index.d.ts
export interface match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
}
```
在动态路由 /other/1 中，props.match.url 的值为 /other/1，props.match.path 的值为 /other/:id。获取 props.match.params 中的属性仍然需要告诉 TS 有哪些属性。
~~~
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface RouteParams {
    id: string
}
export default (props: RouteComponentProps<RouteParams>) => {
    return (
        <div>
            动态路由：{ props.match.params.id }
        </div>
    )
}
~~~
#### useRouteMatch 获取路由匹配信息
上面说到可以使用 props 获取到与路由相关的信息，其中包括了 match、params 等，可以使用 props.match 获取路由的匹配信息。也可以使用 useRouteMatch 方法。
~~~

// @types/react-router/index.d.ts
export function useRouteMatch<Params extends { [K in keyof Params]?: string } = {}>(
    path?: string | string[] | RouteProps,
): match<Params> | null;
~~~
注意 useRouteMatch() 的返回值可能是 null，不能简单的通过 match.* 的形式访问。
```
// Other.tsx
import React from 'react';
import { useRouteMatch } from 'react-router';
export default () => {
    const match = useRouteMatch();
    return (
        <div>路由路径：{ match && match.url }</div>
    )
}
```
useLocation 和 useHistory 的用法类似。

#### Switch
Switch 只会匹配子组件中的第一个路由组件。对于前面提到的，在不设置 exact 属性的前提下，/home 会同时匹配 / 和 /home 两个路由组件，使用 Switch 可以进行单一匹配，但与放置顺序也有关。
```
<Switch>
    <Route path="/home" component={ Home } />
    <Route path="/" component={ Dashboard } />
</Switch>
```
#### Link
封装了 <a> 标签的组件进行路由跳转。
```
<Link to="/home">to home</Link>
```

#### NavLink
与 Link 的用法类似，会默认给当前路由路径与 to 属性匹配的组件添加 active 类名。
~~~
<NavLink to="/home">to home</NavLink>
<NavLink exact to="/other">to other</NavLink>
<NavLink to="/other/1">to other/1</NavLink>
~~~
当点击 to other/1 链接时，to other 链接也会被添加上 active 类名，这与 Router 组件是类似的，所以对于这样的导航，通常需要添加 exact 属性。

#### Redirect
to 属性进行重定向，通常会用在 Switch 中，作为匹配失败的处理。
