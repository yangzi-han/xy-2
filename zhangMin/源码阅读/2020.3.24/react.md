源码解析:react

一、API背景

###  api的具体转化关系

可以通过到https://babeljs.io/repl/网站去将我们创建的Jsx进行实时的转译

![img](https://img2018.cnblogs.com/blog/988076/201908/988076-20190825122159409-1729536442.png)

![img](https://img2018.cnblogs.com/blog/988076/201908/988076-20190825123000749-1507555063.png)

![img](https://img2018.cnblogs.com/blog/988076/201908/988076-20190825133534348-1945314039.png)

 　![image-20200324190406268](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200324190406268.png)

**__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED**这个属性引用得是`ReactSharedInternals`，其中包括了`ReactCurrentOwner`和`ReactDebugCurrentFrame`（仅dev），ReactCurrentOwner是fiber算法用到的，这样是把`renderer`完全独立，所以以后即使换个render算法也没有问题，ReactDebugCurrentFrame则是用来调试render过程的，

### Children

这个对象提供了一堆帮你处理`props.children`的方法，因为`children`是一个类似数组但是不是数组的数据结构，如果你要对其进行处理可以用`React.Children`外挂的方法。

### createRef

新的`ref`用法，React即将抛弃``这种`string ref`的用法，将来你只能使用两种方式来使用`ref`

![image-20200324190457486](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200324190457486.png)

```
`class` `App ``extends` `React.Component{` ` ``constructor() {``  ``this``.ref = React.createRef()`` ``}` ` ``render() {``  ``return` ``this``.ref} />``  ``// or``  ``return` ` ``this``.funRef = node} />`` ``}` `}`
```

### Component & PureComponent

这两个类基本相同，唯一的区别是`PureComponent`的原型上多了一个标识

```
`if` `(ctor.prototype && ctor.prototype.isPureReactComponent) {`` ``return` `(``  ``!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)`` ``);``}`
```

　![image-20200324190519902](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200324190519902.png)　

这是检查组件是否需要更新的一个判断，`ctor`就是你声明的继承自`Component or PureComponent`的类，他会判断你是否继承自`PureComponent`，如果是的话就`shallowEqual`比较`state`和`props`。

顺便说一下：React中对比一个ClassComponent是否需要更新，只有两个地方。一是看有没有`shouldComponentUpdate`方法，二就是这里的`PureComponent`判断

### createContext

`createContext`是官方定稿的`context`方案，在这之前我们一直在用的老的`context API`都是React不推荐的API，现在新的API释出，官方也已经确定在17大版本会把老`API`去除。

新API的使用方法：

```
`const { Provider, Consumer } = React.createContext(``'defaultValue'``)` `const ProviderComp = (props) => (`` ```'realValue'``}>``  ``{props.children}`` ````)` `const ConsumerComp = () => (`` ````  ``{(value) => {value}}`` ````)`
```

　　

后面讲`context`会专门比较新老的API的差异，提前说一句，老API的性能不是一般的差

### forwardRef

`forwardRef`是用来解决HOC组件传递`ref`的问题的，所谓HOC就是`Higher Order Component`，比如使用`redux`的时候，我们用`connect`来给组件绑定需要的state，这其中其实就是给我们的组件在外部包了一层组件，然后通过`...props`的方式把外部的`props`传入到实际组件。`forwardRef`的使用方法如下：

```
`const TargetComponent = React.forwardRef((props, ref) => (`` ````))`
```

　　

这也是为什么要提供`createRef`作为新的`ref`使用方法的原因，如果用`string ref`就没法当作参数传递了。

这里只是简单说一下使用方法，后面讲`ref`的时候会详细分析。

### 类型

```
`Fragment: REACT_FRAGMENT_TYPE,``StrictMode: REACT_STRICT_MODE_TYPE,``unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,``unstable_Profiler: REACT_PROFILER_TYPE,`
```

　　

这四个都是React提供的*组件*，但他们呢其实都只是占位符，都是一个`Symbol`，在React实际检测到他们的时候会做一些特殊的处理，比如`StrictMode`和`AsyncMode`会让他们的子节点对应的Fiber的`mode`都变成和他们一样的`mode`

### createElement & cloneElement & createFactory & isValidElement

`createElement`可谓是React中最重要的API了，他是用来创建`ReactElement`的，但是很多同学却从没见过也没用过，这是为啥呢？因为你用了JSX，JSX并不是标准的js，所以要经过编译才能变成可运行的js，而编译之后，`createElement`就出现了：

```
`// jsx```"app"``>content` `// js``React.createElement(``'div'``, { id: ``'app'` `}, ``'content'``)`
```

　　

`cloneElement`就很明显了，是用来克隆一个`ReactElement`的

`createFactory`是用来创建专门用来创建某一类`ReactElement`的工厂的，

```
`export` `function` `createFactory(type) {`` ``const factory = createElement.bind(``null``, type);`` ``factory.type = type;`` ``return` `factory;``}`
```

　　

他其实就是绑定了第一个参数的`createElement`，一般我们用JSX进行编程的时候不会用到这个API

 

# 二、ReactElement

`ReactElement`通过`createElement`创建，调用该方法需要传入三个参数：

- type
- config
- children

`type`指代这个`ReactElement`的类型

- 字符串比如`div`，`p`代表原生DOM，称为`HostComponent`
- Class类型是我们继承自`Component`或者`PureComponent`的组件，称为`ClassComponent`
- 方法就是`functional Component`
- 原生提供的`Fragment`、`AsyncMode`等是Symbol，会被特殊处理
- TODO: 是否有其他的

从源码可以看出虽然创建的时候都是通过`config`传入的，但是`key`和`ref`不会跟其他`config`中的变量一起被处理，而是单独作为变量出现在`ReactElement`上。

在最后创建`ReactElement`我们看到了这么一个变量`$$typeof`，这是个啥呢，在这里可以看出来他是一个常量：`REACT_ELEMENT_TYPE`，但有一个特例：`ReactDOM.createPortal`的时候是`REACT_PORTAL_TYPE`，不过他不是通过`createElement`创建的，所以他应该也不属于`ReactElement`

```
`export` `function` `createElement(type, config, children) {`` ``// 处理参数` ` ``return` `ReactElement(``  ``type,``  ``key,``  ``ref,``  ``self,``  ``source,``  ``ReactCurrentOwner.current,``  ``props,`` ``);``}` `const ReactElement = ``function``(type, key, ref, self, source, owner, props) {`` ``const element = {``  ``// This tag allows us to uniquely identify this as a React Element``  ``$$``typeof``: REACT_ELEMENT_TYPE,` `  ``// Built-in properties that belong on the element``  ``type: type,``  ``key: key,``  ``ref: ref,``  ``props: props,` `  ``// Record the component responsible for creating this element.``  ``_owner: owner,`` ``};` ` ``return` `element``}`
```

　　

`ReactElement`只是一个用来承载信息的容器，他会告诉后续的操作这个节点的以下信息：

1. `type`类型，用于判断如何创建节点
2. `key`和`ref`这些特殊信息
3. `props`新的属性内容
4. `$$typeof`用于确定是否属于`ReactElement`

这些信息对于后期构建应用的树结构是非常重要的，而React通过提供这种类型的数据，来脱离平台的限制

 

# 二、React Children

> 最开始`React.Children`这个 API 是不想讲的，一方面平时不怎么用，另一方面跟数组处理功能差不多，不深究实现是比较容易理解的。但是后来实际去看了一下源码之后发现，他的实现方式还是非常有趣的，尤其是`map`和`forEach`，我们就按照`map`的流程来看一下，`forEach`其实差不多，只是没有返回新的节点。

先来看一下流程图：

![img](https://img2018.cnblogs.com/blog/988076/201908/988076-20190826102851481-665373990.png)

### 开始源码

```
`function` `mapChildren(children, func, context) {`` ``if` `(children == ``null``) {``  ``return` `children`` ``}`` ``const result = []`` ``mapIntoWithKeyPrefixInternal(children, result, ``null``, func, context)`` ``return` `result``}` `function` `mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {`` ``let` `escapedPrefix = ``''`` ``if` `(prefix != ``null``) {``  ``escapedPrefix = escapeUserProvidedKey(prefix) + ``'/'`` ``}`` ``const traverseContext = getPooledTraverseContext(``  ``array,``  ``escapedPrefix,``  ``func,``  ``context,`` ``)`` ``traverseAllChildren(children, mapSingleChildIntoContext, traverseContext)`` ``releaseTraverseContext(traverseContext)``}`
```

　　

`map`和`forEach`的最大区别就是有没有`return result`。

`getPooledTraverseContext`就是从`pool`里面找一个对象，`releaseTraverseContext`会把当前的`context`对象清空然后放回到`pool`中。

 

```
`const POOL_SIZE = 10``const traverseContextPool = []``function` `getPooledTraverseContext() {`` ``// args`` ``if` `(traverseContextPool.length) {``  ``const traverseContext = traverseContextPool.pop()``  ``// set attrs``  ``return` `traverseContext`` ``} ``else` `{``  ``return` `{``   ``/* attrs */``  ``}`` ``}``}` `function` `releaseTraverseContext(traverseContext) {`` ``// clear attrs`` ``if` `(traverseContextPool.length < POOL_SIZE) {``  ``traverseContextPool.push(traverseContext)`` ``}``}`
```

　　那么按照这个流程来看，是不是`pool`永远都只有一个值呢，毕竟推出之后操作完了就推入了，这么循环着。答案肯定是否的，这就要讲到`React.Children.map`的一个特性了，那就是对每个节点的`map`返回的如果是数组，那么还会继续展开，这是一个递归的过程。接下去我们就来看看。

```
`function` `traverseAllChildren(children, callback, traverseContext) {`` ``if` `(children == ``null``) {``  ``return` `0`` ``}` ` ``return` `traverseAllChildrenImpl(children, ``''``, callback, traverseContext)``}` `function` `traverseAllChildrenImpl(`` ``children,`` ``nameSoFar,`` ``callback,`` ``traverseContext,``) {`` ``const type = ``typeof` `children` ` ``if` `(type === ``'undefined'` `|| type === ``'boolean'``) {``  ``children = ``null`` ``}` ` ``let` `invokeCallback = ``false` ` ``if` `(children === ``null``) {``  ``invokeCallback = ``true`` ``} ``else` `{``  ``switch` `(type) {``   ``case` `'string'``:``   ``case` `'number'``:``    ``invokeCallback = ``true``    ``break``   ``case` `'object'``:``    ``switch` `(children.$$``typeof``) {``     ``case` `REACT_ELEMENT_TYPE:``     ``case` `REACT_PORTAL_TYPE:``      ``invokeCallback = ``true``    ``}``  ``}`` ``}` ` ``if` `(invokeCallback) {``  ``callback(``   ``traverseContext,``   ``children,``   ``nameSoFar === ``''` `? SEPARATOR + getComponentKey(children, 0) : nameSoFar,``  ``)``  ``return` `1`` ``}` ` ``let` `child`` ``let` `nextName`` ``let` `subtreeCount = 0 ``// Count of children found in the current subtree.`` ``const nextNamePrefix = nameSoFar === ``''` `? SEPARATOR : nameSoFar + SUBSEPARATOR` ` ``if` `(Array.isArray(children)) {``  ``for` `(``let` `i = 0; i < children.length; i++) {``   ``child = children[i]``   ``nextName = nextNamePrefix + getComponentKey(child, i)``   ``subtreeCount += traverseAllChildrenImpl(``    ``child,``    ``nextName,``    ``callback,``    ``traverseContext,``   ``)``  ``}`` ``} ``else` `{``  ``const iteratorFn = getIteratorFn(children)``  ``if` `(``typeof` `iteratorFn === ``'function'``) {``   ``// iterator，和array差不多``  ``} ``else` `if` `(type === ``'object'``) {``   ``// 提醒不正确的children类型``  ``}`` ``}` ` ``return` `subtreeCount``}`
```

　　这里就是一层递归了，对于可循环的`children`，都会重复调用`traverseAllChildrenImpl`，直到是一个节点的情况，然后调用`callback`，也就是`mapSingleChildIntoContext`

```
`function` `mapSingleChildIntoContext(bookKeeping, child, childKey) {`` ``const { result, keyPrefix, func, context } = bookKeeping` ` ``let` `mappedChild = func.call(context, child, bookKeeping.count++)`` ``if` `(Array.isArray(mappedChild)) {``  ``mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c)`` ``} ``else` `if` `(mappedChild != ``null``) {``  ``if` `(isValidElement(mappedChild)) {``   ``mappedChild = cloneAndReplaceKey(``    ``mappedChild,``    ``keyPrefix +``     ``(mappedChild.key && (!child || child.key !== mappedChild.key)``      ``? escapeUserProvidedKey(mappedChild.key) + ``'/'``      ``: ``''``) +``     ``childKey,``   ``)``  ``}``  ``result.push(mappedChild)`` ``}``}`
```

　　

`mapSingleChildIntoContext`这个方法其实就是调用`React.Children.map(children, callback)`这里的`callback`，就是我们传入的第二个参数，并得到`map`之后的结果。注意重点来了，如果`map`之后的节点还是一个数组，那么再次进入`mapIntoWithKeyPrefixInternal`，那么这个时候我们就会再次从`pool`里面去`context`了，而`pool`的意义大概也就是在这里了，如果循环嵌套多了，可以减少很多对象创建和`gc`的损耗。

而如果不是数组并且是一个合规的`ReactElement`，就触达顶点了，替换一下`key`就推入`result`了。

React 这么实现主要是两个目的：

1. 拆分`map`出来的数组
2. 因为对`Children`的处理一般在`render`里面，所以会比较频繁，所以设置一个`pool`减少声明和`gc`的开销