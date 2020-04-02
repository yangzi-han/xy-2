文章出处: https://www.jianshu.com/p/d6244228a427 

## 为什么引入Hooks?

react官方给出的动机是用来解决长时间使用和维护react过程中遇到的一些难以避免的问题。比如：

1. **难以重用和共享组件中的与状态相关的逻辑**
2. **逻辑复杂的组件**难以开发与维护，当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面。
3. 类组件中的this增加学习成本，类组件在基于现有工具的优化上存在些许问题。
4. 由于业务变动，函数组件不得不改为类组件等等。

在进一步了解之前，我们需要先快速的了解一些基本的 Hooks 的用法。

## 快速了解 Hooks 的使用

Hooks让我们的函数组件拥有了类似类组件的特性，比如local state、lifecycle，而且还解决了上面提到的一系列问题，它是如何解决这些问题的，下面会在一一指出。首先来快速的看看Hoos的使用，这里讲最主要的两个 Hooks ：useState 和 useEffect。先看一个你可能看过很多遍的例子

```
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  useEffect(() =&gt; {
    document.title = `You clicked ${count} times`;
  });
  return (
      &lt;p&gt; {count} &lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
  );
}
```

### useState

useState 这个方法可以为我们的函数组件带来 local state，它接收一个用于初始 state 的值，返回一对变量

```
const [count, setCount] = useState(0);

// 等价于
var const = useState(0)[0]; // 该state
var setConst = useState(0)[1]; // 修改该state的方法
```

### useEffect

useEffect 可以利用我们组件中的 local state 进行一些带有副作用的操作

```
useEffect(() =&gt; {
  document.title = `You clicked ${count} times`;
});
```

useEffect 中还可以通过传入第二个参数来决定是否执行里面的操作来避免一些不必要的性能损失，只要第二个参数数组中的成员的值没有改变，就会跳过此次执行。如果传入一个空数组 [ ]，那么该 effect 只会在组件 mount 和 unmount 时期执行。

```
useEffect(() =&gt; {
  document.title = `You clicked ${count} times`;
}, [count]); // 如果count没有改变，就跳过此次执行
```

useEffect 中还可以通过让函数返回一个函数来进行一些清理操作（clean up），比如取消订阅等

```
useEffect(() =&gt; {
  api.subscribe(theId);
  return () =&gt; {
      api.unsubscribe(theId)    //clean up
  }
});
```

**useEffect 什么时候执行？** 它会在组件 mount 和 unmount 以及每次重新渲染的时候都会执行，也就是会在 componentDidMount、componentDidUpdate、componentWillUnmount 这三个时期执行。

**清理函数(clean up)什么时候执行？** 它会在前一次 effect执行后，下一次 effect 将要执行前，以及 Unmount 时期执行

#### 注意事项

我们只能在 *函数组件* 中使用 Hooks，我们也可以在一个组件中使用多组 Hooks。比如：

```
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() =&gt; {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() =&gt; {
    API.subscribe(props.friend.id);
    return () =&gt; {
      API.unsubscribe(props.friend.id);
    };
  });

  return isOnline
}
```

但是这里有一点需要我们注意的就是 **我们只能在顶层代码(Top Level)中调用 Hooks**，不能在循环或判断语句等里面调用，这样是为了让我们的 Hooks 在每次渲染的时候都会按照 **相同的顺序** 调用，因为这里有一个跟关键的问题，那就是 **useState 需要依赖参照第一次渲染的调用顺序来匹配对于的state**，否则 useState 会无法正确返回它对于的state。

## Hooks 解决的问题

好了，知道了 Hooks 基本使用后，我们就可以来了解 Hooks 是怎么解决 react 长期存在的问题的。

### 如何解决 状态有关的逻辑(stateful logic) 的重用和共享问题。

过去对于类似问题的解决方案主要有两个：

- [Render Props](https://reactjs.org/docs/render-props.html) 通过props接受一个返回react element的函数，来动态决定自己要渲染的结果；

```
&lt;DataProvider render={data =&gt; (
  &lt;h1&gt;Hello {data.target}&lt;/h1&gt;
)}/&gt;
```

- 还有就是[Higher-Order Components](https://reactjs.org/docs/higher-order-components.html) 以一种类似 **工厂模式** 的方式去生产出具有相同或类似逻辑的组件。

```
function getComponent(WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      // doSomething
    }
    componentWillUnmount() {
      // doSomething
    }
    render() {
      return &lt;WrappedComponent {...this.props} /&gt;;
    }
  };
}
```

但是无论是哪一种方法都会造成组件数量增多，组件树结构的修改，而且有可能出现组件嵌套地狱(wrapper hell)的情况。现在 **React 通过 custom Hooks 来解决这个问题**。

### custom Hooks

custom Hooks 并不是一个api，而是一个规则。具体实现就是通过一个函数来封装跟状态有关的逻辑(stateful logic)，将这些逻辑从组件中抽取出来。在这个函数中我们可以使用其他的 Hooks，也可以单独进行测试，甚至将它贡献给社区。

```
import { useState, useEffect } from 'react';

function useCount() {
  const [count, setCount] = useState(0);
  useEffect(() =&gt; {
    document.title = `You clicked ${count} times`;
  });
  
  return count
}
```

比如上面的一个例子，他就是一个 custom Hooks，提取了对 count 的操作。这里需要遵循一个约定，命名要用 `use*`，这是为了方便我们区分，利于我们维护。可以看到他其实就是一个函数，**我们可以在现有的所有其他组件中引用它**

```
function CountStatus() {
  const count = useCount();
  return count;
}
```

这里的核心概念就是将逻辑提取出来封装在 custom Hooks，然后可以在任何的其他组件中共享这部分逻辑，也可以贡献给社区。所以我也预测在不久的将来，会出现很多的充满想象力的各种用途的 custom Hooks 在社区中出现，极大的提高我们的开发效率。

### 具有复杂逻辑的组件的开发和维护

前面我们也提到，我们的组件可能会随着开发的进行变得越来越复杂，要处理越来越多的 local State，那么在组件的生命周期函数中就会充斥着各种互不相关的逻辑，这里需要引入官方的比较复杂的例子，先看基于以前类组件的情况：

```
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

经过 Hook 改造后：

```
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() =&gt; {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() =&gt; {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () =&gt; {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
}
```

状态和相关的处理逻辑可以按照功能进行划分，不必散落在各个生命周期中，大大降低了开发和维护的难度。除了这几个hooks还有其他额外的hooks，在此继续了解 [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

## 伴随 Hooks 的一些思考

hooks让我们的函数组件的功能得到了扩充，拥有了和类组件相似的功能，甚至避免了类组件存在的各种问题，那么就会出现各种的疑问，比如

- Hooks 引进后， 函数组件 和 类组件 该如何选择？官方关于类似的问题的答复是：

> Our goal is for Hooks to cover all use cases for classes as soon as possible. There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate and componentDidCatch lifecycles yet, but we plan to add them soon.
>
> It is a very early time for Hooks, so some integrations like DevTools support or Flow/TypeScript typings may not be ready yet. Some third-party libraries might also not be compatible with Hooks at the moment.

官方的目标是尽可能快的让 Hooks 去覆盖所有的类组件案例，但是现在 Hooks 还处于一个非常早的阶段，各种调试工具、第三方库等都还没有做好对 Hooks 的支持，而且目前也没有可以取代类组件中 getSnapshotBeforeUpdate 和 componentDidCatch 生命做起的 Hooks，不过很快会加上他们。总的来时就是鼓励大家在以后使用 Hooks，对于已存在的类组件不必大规模的去重写，Hooks及Hooks的生态会继续完善，请期待。

- Hooks 是否可以代替 render-props 和 higher-order components ？前面我们也提到，hooks可以解决后者带来的各种问题，那么 hooks 是否可以代替后者呢？官方的回答：

> Often, render props and higher-order components render only a single child. We think Hooks are a simpler way to serve this use case. There is still a place for both patterns (for example, a virtual scroller component might have a renderItem prop, or a visual container component might have its own DOM structure). But in most cases, Hooks will be sufficient and can help reduce nesting in your tree.