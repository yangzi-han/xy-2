文章出处: https://juejin.im/post/5be3ea136fb9a049f9121014 

总结:

# useReducer

## 1. 组件初始化



```cpp
const [state, dispatch] = useReducer(reducer, initState)
```

![img](https:////upload-images.jianshu.io/upload_images/13562167-f1b7dfa1bdc34787.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

组件初始化

在组件初始化的时候，调用useReducer会创建一个reducer hook，其内部会创建两个状态：state、oldState，两个方法：dispatch、reducer（就是我们传入的reducer），并且返回state和dispatch给组件。

- 初始化时候，state和oldState全是initState
- dispatch一旦创建完毕，就永远不会改变
- reducer就是我们自定义传入的reducer，可以随意发挥，传入state和action，返回一个状态
   并且组件会订阅这个reducer hook，当状态改变时候，会自动触发组件更新
- 请务必用分离的眼光看待函数组件和reducer hook，下面会讲

> react源码中不止这几个状态，并且写法不一样，我这是是为了简化

## 2. 调用dispatch

通过任意事件调用dispatch，例如点击一个按钮、一个ajax请求回调，一个注销，等等。



![img](https:////upload-images.jianshu.io/upload_images/13562167-ee5371b0f9e6e4b9.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

调用dispatch

- 第一步 外部调用dispatch(action)
- 第二步 reducer hook内部处理，调用 reducer(state, action), 和旧state做对比
- 第三步 如果新旧state一致，不会有任何动作。如果不一致，则会触发函数组件更新
- 第四步 函数组件更新，其实就是执行一遍函数组件
- 第五步 函数组件执行时候，执行到useReducer时候，会去reducer hook中取当前状态，就是第三步产生的新状态

用程序来表达的话:



```jsx
// 模拟已经初始化过的状态
let state = {num: 1};
let oldState = state;

function reducer(state, action) {
  switch(action.type) {
    case 'CHANGE':
      return {
        ...state,
        num: action.num
      }
    case 'NO_CHANGE':
      return state;
    default:
      throw new Error('no such action type');
  }
}

function dispatch(action) {
  oldState = state;
  // 第二步 调用reducer产生新状态
  state = reducer(state, action);
  // 第三步 新旧状态比较，不一致则更新函数组件
  if (state !== oldState) {
    updateComponent();
  }
}

function updateComponent() {
  // 第四步 更新函数组件其实就是调用函数组件（源码中会复杂些，处理Fiber和Work的状态）
  App();
}

function useReducer() {
  // 如果是初始化
  // 初始化代码
  // 这里做了简化 只处理了更新 初始化的代码不写了
  return [state, dispatch];
}

function App() {
  // 第五步 函数组件执行时候，调用useReducer取得新状态
  const [state, dispatch] = useReducer();
  return (
    <div>{state.num}</div>
  )
}
// 第一步，调用dispatch
dispatch({type: 'CHANGE', num: 8}); 
```

# useState

这么理解就行了：useState其实就是一个useReducer简化版
 `useState版本`



```jsx
function App() {
  const [state, dispatch] = useState(1);
  return <div>{state}</div>
}
```

和`useReducer版本`



```jsx
function reducer(state, action) {
  // 在源码中叫basicStateReducer
  return action;
}
function App() {
  const [state, dispatch] = useReducer(reducer, 1);
  return <div>{state}</div>
}
```

是一模一样的

# react是如何处理多个hook读取的

react会生成一个Fiber树，每个组件在Fiber树上都有对应的节点FiberNode。组件的所有hook状态都存在FiberNode的memoizedState属性上。
 当执行这个函数组件的时候，第一次useSomeHook语句，就会去取第一个hook状态。
 第二次遇到useSomeHook语句，就取第二个hook状态。以此类推。
 所以，可以把这些hook状态理解成一个数组（但其实是个链表）。



![img](https:////upload-images.jianshu.io/upload_images/13562167-f3f0aec1caba9d7b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1148/format/webp)

image.png

- hooks状态是有序的，会被react机械地依次读取
- 所以hooks不能放在条件中使用，否则不能保证对应上

## 调试查看Fiber树



```jsx
function App() {
  const [a, setA] = useState('A');
  const [b, setB] = useState('B');
  const [c, setC] = useState('C');
  return (
    <>
      <p>{a}</p>
      <p>{b}</p>
      <p>{c}</p>
    </>
  )
}
```

如何看Fiber树
 `index.js`



```dart
ReactDOM.render(<App />, document.getElementById('root'));
const fiberRoot = document.querySelector('#root')._reactRootContainer._internalRoot;
const hostRootFiberNode = fiberRoot.current;
console.log(hostRootFiberNode); // 这就是Fiber树
```

![img](https:////upload-images.jianshu.io/upload_images/13562167-bf662b717ca39261.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

Fiber树

首先，顶层FiberNode是HostRoot，对应的是#root。
 然后其child对应的App的FiberNode。
 可以看App的FiberNode的属性memoizedState中储存了App使用的三个hook状态'A'、'B'、'C'。
 但不是数组，是链表形式，通过next属性读取下一个状态。不影响理解。

### 下面，稍微改复杂些，加上useReducer和useEffect



```jsx
function App() {
  const [a, setA] = useState('State：A');
  const [myData, dispatch] = useReducer(reducer, {num: 1});
  const xx = 'XX';
  useEffect(() => {
    console.log(xx);
  }, [xx])
  return (
    <>
      <p>{a}</p>
      <p>{myData.num}</p>
    </>
  )
}
```

![img](https:////upload-images.jianshu.io/upload_images/13562167-d8012e1beeba8a5a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

稍微复杂一些的状态

可以看到，原理都是一样的，都是按序保存。
 只不过useState和useReducer保存的是一个数据。
 useEffect保存的东西更多些：

- tag: 192 其实是二进制0b11000000，表示了这个effect会在MountPassive和UnmountPassive过程被使用（请别和生命周期混淆）。react会在组件初始化或者更新完毕后或者卸载前相应阶段去使用此effect（通过这个tag判断）。
- create：表示调用函数
- destroy：表示销毁函数（会在组件卸载（unmount）或者更新前去调用（即再次create之前））
- deps：表示参数依赖，参数不变的话，这个effect不会执行
   `tag对照表` 



```cpp
export const NoEffect = /*             */ 0b00000000;
export const UnmountSnapshot = /*      */ 0b00000010;
export const UnmountMutation = /*      */ 0b00000100;
export const MountMutation = /*        */ 0b00001000;
export const UnmountLayout = /*        */ 0b00010000;
export const MountLayout = /*          */ 0b00100000;
export const MountPassive = /*         */ 0b01000000;
export const UnmountPassive = /*       */ 0b10000000;
```

# 结语

- 其他hooks都是类似的。
- 基础hook useState和useReducer提供了可以刷新（更新）函数组件的途径。同样，也是自定义hook刷新的途径。如果想让自定义hook去刷新函数组件，那只能在自定义组件中使用useState或者useReducer来强制刷新，达到类似以前forUpdate的效果。



```jsx
function flagReducer(state) {
  return state + 1;
}

function useRedux() {
  const [flag, flagDispatch] = useReducer(flagReducer, 0);
  useEffect(() => {
    const unSubscribeFn = store.subscribe(() => {
      flagDispatch();
    })
    return unSubscribeFn;
  }, [store])
  return store;
}

function App() {
  const store = useRedux();
  ...
}
```

这样，每当redux数据发生改变时候，会调用flagDispatch，改变flag，从而导致这个reducer变化，触发自定义hook useRedux变化，连锁触发App刷新，达到以前forceUpdate的效果。



