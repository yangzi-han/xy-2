**知识点总结**

1.什么是React Hooks

-  hooks 是react 16.8 引入的特性，他允许你在不写class的情况下操作state 和react的其他特性。
  hooks 只是多了一种写组件的方法，使编写一个组件更简单更方便，同时可以自定义hook把公共的逻辑提取出来，让逻辑在多个组件之间共享。 
-  Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。稍后我们将学习其他 Hook。

2.什么时候用Hook

-  如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook.

### State hook

```
state hook`的主要作用就是获取需要的 `state` 和 `更新state的方法
```

使用方法

```
const [state, setState] = useState(initialState);
```

**参数：** `initialState` 可以直接是当前state的初始值，也可以是一个函数，函数的返回值将作为state的值，参数只会在组件的初始渲染中起作用

**返回值：**返回的是一个数组，一个是当前state的值，另一个是更新state的方法，这里面`setState`方法与`class中的setState`不同在于，此`setState 不会合并state` 中的值

如果需要定义多个state 只需要多次调用`useState` 方法就行。

### Effect hook

`useEffect`方法是在每次渲染之后执行，可以理解为class写法中的 `componentDidMount / componentDidUpdate`（为了方便理解可以这么理解，但不完全一样）

```
useEffect(didUpdate);
```

**参数：**function，在每次渲染之后执行，在函数里可以编写更新dom ，添加订阅 等。

**参数返回值：** function(可以不返回) 如果 didUpdate函数中返回了一个函数，这个函数会在`组件卸载前执行(每次渲染都会执行)`需要清除上次订阅的内容可以再这里面写。

**执行条件：** useEffect 的第二个参数是一个数组，只有当数组中的的值发生改变的时候才会调用effect，如果执行在第一次挂载和卸载的时候调用，只需要传一个`[]`空数组

### useContext

```
const value = useContext(MyContext);
```

获取context 的值，类似于clss 写法中的`static contextType = MyContext` ,当使用了useContext会在context 的值发生改变的时候重新render。

**参数** 接收对象是`React.createContext 的返回值`
**返回值** context 里的内容

如果对context 不了解可以看 [context 学习](https://segmentfault.com/a/1190000019398308)

### 自定义 hook

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

**自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook**



