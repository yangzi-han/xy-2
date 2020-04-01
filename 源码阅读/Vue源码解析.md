##  Vue源码解析准备篇
#### 1、前置知识点
我个人认为要想深入理解Vue的源码，至少需要以下知识点：https://upload-images.jianshu.io/upload_images/14447586-b4092d45e1f254ac.png?imageMogr2/auto-orient/strip|imageView2/2/w/798/format/webp

##### 1.1 Flow基本语法
相信大家都知道，javascript是弱类型的语言，在写代码灰常爽的同时也十分容易犯错误，所以Facebook搞了这么一个类型检查工具，可以加入类型的限制，提高代码质量，举个例子:
```
function sum(a, b) {
  return a + b;
}
```
可是这样，我们如果这么调用这个函数sum('a', 1) 甚至sum(1, [1,2,3])这么调用，执行时会得到一些你想不到的结果，这样编程未免太不稳定了。那我们看看用了Flow之后的结果：
```
function sum(a: number, b:number) {
  return a + b;
}
```
我们可以看到多了一个number的限制，标明对a和b只能传递数字类型的，否则的话用Flow工具检测会报错。其实这里大家可能有疑问，这么写还是js吗？ 浏览器还能认识执行吗？当然不认识了，所以需要翻译或者说编译。其实现在前端技术发展太快了，各种插件层出不穷--Babel、Typescript等等，其实都是将一种更好的写法编译成浏览器认识的javascript代码（我们以前都是写浏览器认识的javascript代码的）。我们继续说Flow的事情，在Vue源码中其实出现的Flow语法都比较好懂，比如下面这个函数的定义：
```
export function renderList (
  val: any,
  render: (
    val: any,
    keyOrIndex: string | number,
    index?: number
  ) => VNode
): ?Array<VNode>{
...
}
```
val是any代表可以传入的类型是任何类型， keyOrIndex是string|number类型，代表要不是string类型，要不是number，不能是别的；index?:number这个我们想想正则表达式中？的含义---0个或者1个，这里其实意义也是一致的，但是要注意?的位置是在冒号之前还是冒号之后--因为这两种可能性都有，上面代码中问号是跟在冒号前面，代表index可以不传，但是传的话一定要传入数字类型；如果问号是在冒号后面的话，则代表这个参数必须要传递，但是可以是数字类型也可以是空。这样是不是顿时感觉严谨多了？同时，代码意义更明确了。为啥这么说呢？ 之前看打包后的vue源码，其中看到观察者模式实现时由于没有类型十分难看懂，但是看了这个Flow版本的源码，感觉容易懂。 当然，如果想学习Flow更多的细节， 可以看看下面这个学习文档：
https://zhuanlan.zhihu.com/p/26204569
##### 1.2 原型与原型继承
Vue中的组件相信大家都使用过，并且组件之中可以有子组件，那么这里就涉及到父子组件了。组件其实初始化过程都是一样的，显然有些方法是可以继承的。Vue代码中是使用原型继承的方式实现父子组件共享初始化代码的。所以，要看懂这里，需要了解js中原型的概念；这里不多谈，只是提供几个学习资料供大家参考：
js教程:https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072
js原型理解:https://www.jianshu.com/p/dee9f8b14771
##### 1.3 Object.defineProperty
这个方法在js中十分强大，Vue正是使用了它实现了响应式数据功能。我们先瞄一眼Vue中定义响应式数据的代码：
```
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  .....
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```
其中我们看到Object.defineProperty这个函数的运用，其中第一个参数代表要设置的对象，第二个参数代表要设置的对象的键值，第三个参数是一个配置对象，对象里面可以设置参数如下：
value: 对应key的值，无需多言
configurable：是否可以删除该key或者重新配置该key
enumerable：是否可以遍历该key
writable：是否可以修改该key
get: 获取该key值时调用的函数
set: 设置该key值时调用的函数
我们通过一个例子来了解一下这些属性：
```
 let x = {}
 x['name'] = 'vue'
 console.log(Object.getOwnPropertyDescriptor(x,'name'))
```
Object.getOwnPropertyDescriptor可以获取对象某个key的描述对象，打印结果如下：
```
{
    value: "vue",
    writable: true, 
    enumerable: true, 
    configurable: true
}
```
从上可知，该key对应的属性我们可以改写(writable:true),可以重新设置或者删除(configurable: true),同时可以遍历(enumerable:true)。那么让我们修改一下这些属性，比如configurable,代码如下:
```
Object.defineProperty(x, 'name', {
      configurable: false
})
```
执行成功之后，如果你再想删除该属性，比如delete x['name']，你会发现返回为false，即无法删除了。
那enumerable是什么意思呢？来个例子就明白了，代码如下：
```
let x = {}
x[1] = 2
x[2] = 4
Object.defineProperty(x, 2, {
     enumerable: false
})
for(let key in x){
    console.log("key:" + key + "|value:" +  x[key])
}
```
结果如下：
key:1|value:2
为什么呢？ 因为我们把2设置为不可遍历了，那么我们的for循环就取不到了，当然我们还是可以用x[2]去取到2对应的值得，只是for循环中取不到而已。这个有什么用呢？Vue源码中Observer类中有下面一行代码：
```
def(value, '__ob__', this);
```
这里def是个工具函数，目的是想给value添加一个key为__ob__，值为this，但是为什么不直接 value.__ob__ = this 反而要大费周章呢？
因为程序下面要遍历value对其子内容进行递归设置，如果直接用value.__ob__这种方式，在遍历时又会取到造成，这显然不是本意，所以def函数是利用Object.defineProperty给value添加的属性，同时enumerable设置为false。
至于get和set嘛？这个就更强大了，类似于在获取对象值和设置对象值时加了一个代理，在这个代理函数中可以做的东西你就可以想象了，比如设置值时再通知一下View视图做更新。也来个例子体会一下吧：
```
let x = {}
Object.defineProperty(x, 1, {
      get: function(){
           console.log("getter called!")
      },
      set: function(newVal){
            console.log("setter called! newVal is:" + newVal)
      }
})
```
当我们访问x[1]时便会打印getter called，当我们设置x[1] = 2时，打印setter called。Vue源码正是通过这种方式实现了访问属性时收集依赖，设置属性时源码有一句dep.notify，里面便是通知视图更新的相关操作。
##### 1.4 Vnode概念
Vnode，顾名思义，Virtual node，虚拟节点，首先声明，这不是Vue自己首创的概念，其实Github上早就有一个类似的项目:Snabbdom。我个人认为，Vue应该也参考过这个库的实现，因为这个库包含了完整的Vnode以及dom diff算法，甚至实现的具体代码上感觉Vue和这个库也是有点相像的。为啥要用Vnode呢？其实原因主要是原生的dom节点对象太大了，我们运行一下代码：
```
let dom = document.createElement('div');
for(let key in dom){
      console.log(key)
}
```
打印的结果灰常长！！！说明这个dom对象节点有点重量级，而我们的html网页经常数以百计个这种dom节点，如果采用之前的Jquery这种方式直接操作dom，性能上确实稍微low一点。所以snabbdom或者Vue中应用了Vnode，Vnode对象啥样呢？ 看看Vue源码对Vnode的定义：
```
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string;
....
}
```
相比之下, Vnode对象的属性确实少了很多；其实光属性少也不见得性能就能高到哪儿去，另一个方面便是针对新旧Vnode的diff算法了。这里其实有一个现象：其实大多数场景下即便有很多修改，但是如果从宏观角度观看，其实修改的点不多。举个例子：
比如有以下三个dom节点A B C
我们的操作中依次会改成 B C D
如果采用Jquery的改法，当碰到第一次A改为B时，修改了一次，再碰到B改为C，又修改了一次，再次碰到C改为D，又又修改了一次，显然其实从宏观上看，只需要删除A，然后末尾加上D即可，修改次数得到减少；但是这种优化是有前提的，也就是说能够从宏观角度看才行。以前Jquery的修改方法在碰到第一次修改的时候，需要把A改为B，这时代码还没有执行到后面，它是不可能知道后面的修改的，也就是无法以全局视角看问题。所以从全局看问题的方式就是异步，先把修改放到队列中，然后整成一批去修改，做diff，这个时候从统计学意义上来讲确实可以优化性能。这也是为啥Vue源码中出现下述代码的原因:
```
 queueWatcher(this);
```
##### 1.5 函数柯里化
函数柯里化是什么鬼呢？其实就是将多参数的函数化作多个部分函数去调用。举个例子：
```
function getSum(a,b){
      return a+b;
}
```
这是个两个参数的函数，可以直接getSum(1,2)调用拿到结果；然而，有时候并不会两个参数都能确定，只想先传一个值，另外一个在其他时间点再传入，那我们把函数改为：
```
function getSum(a){
      return function(b){
            return a+b;
      }
}
```
那我们如何调用这个柯里化之后的函数呢？
```
let f = getSum(2)
console.log(f(3))
console.log(getSum(2)(3)) //结果同上
```
可见，柯里化的效果便是之前必须同时传入两个参数才能调用成功而现在两个参数可以在不同时间点传入。那为毛要这么做嘛？Vue源码是这么应用这个特性的，Vue源码中有一个platform目录，专门存放和平台相关的源码（Vue可以在多平台上运行 比如Weex）。那这些源码中肯定有些操作是和平台相关的，比如会有些以下伪代码所表示的逻辑:
```
if(平台A){
....
}else if(平台B){
....
}
```
可是如果这么写会有个小不舒服的地方，那就是其实代码运行时第一次走到这里根据当前平台就已经知道走哪一个分支了，而现在这么写必当导致代码再次运行到这里的时候还会进行平台判断，这样总感觉会多一些无聊的多余判断，因此Vue解决此问题的方式就是应用了函数柯里化技巧，类似声明了以下一个函数:
```
function ...(平台相关参数){
    return function(平台不相关参数){
          处理逻辑
   }
}
```
在Vue的patch以及编译环节都应用了这种方式，讲到那部分代码时我们再细致的看，读者提前先了解一下可以帮助理解Vue的设计。
##### 1.6 Macrotask与Microtask
可能有的读者第一次听到这两个词，实际上这个和js的事件循环机制息息相关。在上面我们也提到，Vue更新不是数据一改马上同步更新视图的，这样肯定会有性能问题，比如在一个事件处理函数里先this.data = A 然后再this.data=B,如果要渲染两次，想想都感觉很low。Vue源码实际上是将更改都放入到队列中，同一个watcher不会重复（不理解这些概念不要紧，后面源码会重点介绍），然后异步处理更新逻辑。在实现异步的方式时，js实际提供了两种task--Macrotask与Microtask。两种task有什么区别呢？先从一个例子讲起：
```
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
    Promise.resolve().then(function() {
        console.log('promise3');
    }).then(function() {
        console.log('promise4');
    });
}, 0);
Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```
以上代码运行结果是什么呢？读者可以思考一下，答案应该是：
```
script start
script end
promise1
promise2
setTimeout
promise3
promise4
```
简单可以这么理解，js事件循环中有两个队列，一个叫MacroTask，一个MircroTask，看名字就知道Macro是大的，Micro是小的（想想宏观经济学和微观经济学的翻译）。那么大任务队列跑大任务--比如主流程程序了、事件处理函数了、setTimeout了等等，小任务队列跑小任务，目前读者记住一个就可以--Promise。js总是先从大任务队列拿一个执行，然后再把所有小任务队列全部执行再循环往复。以上面示例程序，首先整体上个这个程序是一个大任务先执行，执行完毕后要执行所有小任务，Promise就是小任务，所以又打印出promise1和promise2，而setTimeout是大任务，所以执行完所有小任务之后，再取一个大任务执行，就是setTimeout，这里面又往小任务队列扔了一个Promise，所以等setTimeout执行完毕之后，又去执行所有小任务队列，所以最后是promise3和promise4。说的有点绕，把上面示例程序拷贝到浏览器执行一下多思考一下就明白了，关键是要知道上面程序本身也是一个大任务。一定要理解了之后再去看Vue源码，否则不会理解Vue中的nextTick函数。
理解js中Macrotask和Microtask:https://juejin.im/entry/58d4df3b5c497d0057eb99ff
##### 1.7 递归编程算法
很多程序员比较害怕递归，但是递归真的是一种灰常灰常强大的算法。Vue源码中大量使用了递归算法--比如dom diff算法、ast的优化、目标代码的生成等等....很多很多。而且这些递归不仅仅是A->A这么简单，大多数源码中的递归是A->B->C...->A等等这种复杂递归调用。比如Vue中经典的dom diff算法：
```
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
```
上面代码是比较新旧Vnode节点更新孩子节点的部分源码，调用者是patchVnode函数，我们发现这部分函数中又会调用会patchVnode，调用链条为:patchVnode->updateChildren->patchVnode。同时，即便没有直接应用递归，在将模板编译成AST（抽象语法树）的过程中，其使用了栈去模拟了递归的思想，由此可见递归算法的重要性。这也难怪，毕竟不管是真实dom还是vnode，其实本质都是树状结构，本来就是递归定义的东西。我们也会单独拿出一篇文章讲讲递归，比如用递归实现一下JSON串的解析。希望读者注意查看。
##### 1.8 编译原理基础知识
这恐怕比递归更让某些程序员蛋疼，但是我相信只要读者认真把Vue这部分代码看懂，绝对比看N遍编译原理的课本更能管用。我们看看Vue源码这里的实现：
```
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
  ```
上述代码首先通过parse函数将template编译为抽象语法树ast，然后对ast进行代码优化，最后生成render函数。其实这个过程就是翻译，比如gcc把c语言翻译为汇编、又比如Babel把ES6翻译为ES5等等，这里面的流程十分都是十分地相似。Vue也玩了这么一把，把模板html编译为render函数，什么意思呢？
```
   <li v-for="record in commits">
       <span class="date">{{record.commit.author.date}}</span>
   </li>
```
比如上面的html，你觉得浏览器会认识嘛？显然v-for不是html原生的属性，上述代码如果直接在浏览器运行，你会发现{{record.commit.author.date}}就直接展示出来了，v-for也没有起作用，当然还是会出现html里面（毕竟html容错性很高的）；但是经过Vue的编译系统一编译生成一些函数，这些函数一执行就是浏览器认识的html元素了，神奇吧? 其实仅仅是应用了编译原理课本的部分知识罢了，这部分我们后面会灰常灰常详细的介绍源码，只要跟着看下来，必定会对编译过程有所理解。现在可以这么简单理解一下AST（抽象语法树），比如java可以写一个if判断，C语言也可以写，js、python等等也可以（如下所示）:
```
java:
if(x > 5){
  ....
}

python:
if x>5:
....
```
虽然从语法形式上写法不太一致，但是抽象出共同点其实都是一个if语句跟着一个x>5 的条件，那么ast就是一种表现大家共同点的一种结构。得到ast是翻译的基础。

综上，Vue源码其实代码行数并不是很多，但是其简约凝练的风格深深吸引了我。我会重点分析Vue源码中观察者模式的实现、Vnode以及dom diff算法的实现以及模板编译为render函数的实现。这三者我感觉就是Vue源码中最精彩的地方，希望你我都可以从中汲取养分，不断提高！

最后送上一个视频连接，希望大家可以先设置VSCode调试Vue源码的环境，只要可以调试的代码没有啥读不懂的，视频介绍很详细，给其点赞。
VSCode搭建Vue源码调试环境:https://www.bilibili.com/video/av20149603/