**虚拟DOM(Virtual DOM)**

了解React的都知道，其高效的原因，是因为React按照页面的DOM结构，利用Javascript在内存中构建了一套相同结构的虚拟内存树模型，这个内存模型就称为Virtual DOM。每当页面产生了变化，React的diff算法会先在内存模型中进行比对，提取出差异点，在将Virtual DOM转化为原生DOM输出时，按照差异点，只patch出有变动的部分。

下面是VirtualDOM节点的定义：

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=354683186,1987712363&fm=173&app=49&f=JPEG?w=640&h=78)

**入口**

一切都是从 React.render(<App/>, document.body) 开始的，所以先来看看 React是怎么定义的？

React中主要包括：

render(virtualDom, container) 命令式调用，一般用于应用入口，将虚拟DOM渲染在container容器中；

createElement(name, props, children) 创建组件时使用，JSX是其语法糖；

Component 以ES6中的类式语法声明时使用。

createElement(type, props, children)

createElement()的主要作用是根据给定type创建Virtual DOM节点，JSX是它的语法糖形式；其type参数可以是原生的html标签名（如：div、tag等），也可以是React组件类或函数。

**组件的实现**

React的所有组件，按照类型可以分为三种：

文本展示类型 (TextComponent)

原生DOM类型 (DomComponent)

自定义类型 (CompositeComponent)

每种类型的组件，都需要处理**初始化**和**更新**两种逻辑，具体会在下面两个函数中实现：

mountComponent(rootNodeId) 用于处理初始化逻辑

updateComponent() 用于处理更新逻辑

初始化mountComponent()的实现

mountComponent() 的实现思路是，**根据virtual Dom对象生成HTML代码并返回。**

首先定义类型组件的基类 Component ，它只是简单地记录了传入的virtualDom对象，并初始化了组件节点ID。

![img](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1020197179,242079782&fm=173&app=49&f=JPEG?w=640&h=94)

下面是不同类型组件初始化渲染逻辑的各自实现。

TextComponent

作为纯展示类型组件，TextComponent 只是简单地将需要展示的内容，使用标签包装并返回就可以了。

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3587664029,927192555&fm=173&app=49&f=JPEG?w=640&h=98)

DomComponent

DomComponent类型在处理原生DOM时，需要额外注意一下原生事件部分的处理。

![img](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3323092852,2066862613&fm=173&app=49&f=JPEG?w=640&h=556&s=0270C730094F504D54FCA5DA0000C0B2)

CompositeComponent

在实现CompositeComponent类型的初始化渲染逻辑之前，先看一下React组件的定义语法。

![img](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4036558443,1589063326&fm=173&app=49&f=JPEG?w=640&h=126&s=80714F304B63672408D411DA0000C0B2)

声明语法中，App继承自React.Component，所以我们先来实现Component这个类。

这里的 React.Component 不要与上面的 Component 混淆， Component 是不同组件类型的基类，抽象了组件渲染与更新；而React.Component则是Composite这种类型组件声明时的基类。

在 React.Component 中，简单地声明了控制数据流向的props属性，以及组件实例内部用于触发更新的setState()函数。

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2589332048,2040567400&fm=173&app=49&f=JPEG?w=640&h=130&s=8271CF304D6665221AFDA1DB0000C0B2)

在了解了 React.Component 的定义之后，我们回到 CompositeComponent ，开始实现mountComponent()的逻辑。

首先要了解的是，在composite类型组件中，vDom对象中的type，指向的是组件类的定义， 因此 mountComponent() 函数要做的工作，就是使用vDom的props属性来创建一个type的实例。

![img](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3192332889,199167624&fm=173&app=49&f=JPEG?w=640&h=416&s=8250C730131B406E48F5A4DA0000C0B3)

思考一下，在JSX语法中，解析器碰到 <MyInput/> 标签后，就会去查找到 MyInput 的定义，上面说过JSX只是createElement的语法糖，因此背后调用的是 React.createElement(MyInput) 。在React规范中，可以使用类或函数来声明组件，因此在 mountComponent() 中使用 new type() ，就可以构造出MyInput的实例了。

**更新流程updateComponent()的实现**

实现完组件的初始化之后，接下来要实现组件的更新逻辑。

React开放了 setState() 用于组件更新，回顾上面 React.Component 中 setState() 的定义， 实际调用的是 this._reactInternalInstance.updateComponent(null, newState) 这个函数。而 this._reactInternalInstance指向CompositeComponent，困此更新逻辑交回CompositeComponent.updateComponent()来完成。

CompositeComponent

Composite类型组件的更新函数，需要处理两种流程：

当被定义在其它组件的render函数中时，其包裹组件会构建出新的vDom对象，根据传入新的vDom来处理更新；当组件内部使用setState()触发时，根据新的state来更新；了解这两种方式的区别，可以帮助我们理解下面updateComponent函数的实现。

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=199728185,3760406654&fm=173&app=49&f=JPEG?w=640&h=754&s=0071C730095F404D4A4520DA0000C0B2)

我们梳理一下更新流程：

组件在初始化时，记录下了render组件的实例，即this._renderedComponent；在更新环节，重新render()得到新的VDomnextRenderVDom；通过比对前后两个VDom的type和key，来判断是执行原来_renderedComponent的updateComponent函数，还是重新生成新的组件；上面使用到了shouldUpdateReactComponent这个比对函数，来对vDom的type和key进行比对，其实现如下：

![img](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2951348988,3681692257&fm=173&app=49&f=JPEG?w=640&h=198&s=8250C7300D22452000ECA5DA000080B3)

上面这个处理逻辑，就是diff算法的第一个规则： 当两个VDom节点的类型不一致时，重新构建该组件的Virtual DOM树结构。

TextComponent Text类型组件作为颗粒度最小的组件，更新逻辑非常简单，展示新的文本内容即可。

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3041108198,2764566772&fm=173&app=49&f=JPEG?w=640&h=128&s=0270C7304B62452016F5B8DA0000C0B1)

DomComponent

因为diff算法的介入，Dom类型的处理逻辑相对复杂。 可以分两步来处理，第一步更新组件输出的容器DOM上面的属性；第二步处理子级DOM。

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1468157369,3984680661&fm=173&app=49&f=JPEG?w=640&h=144&s=0250C7304B2347241AF504DA0000C0B2)

_updateProperties()函数对比新旧props，完成属性及事件的处理。 特别注意一下事件处理部分，需要注销掉原来DOM上注册的事件。

![img](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4201422528,1669957736&fm=173&app=49&f=JPEG?w=640&h=513&s=8271CF30491F604D52FD81DA0000C0B2)

_updateDOMChildren() 用于处理children部分的更新， 这部分的逻辑相对复杂，也是diff算法的优化点所在。

注：下面的说明中，以名称中含'children'来标识 集合，'child'指代 集合项。

i. 使用 nextChildrenVDoms 数据生成新的nextChildrenComponent；

DomComponent在初始化流程中，_mountComponent()函数会将组件集合保存下来，存入实例的_renderedChildrenComponent属性中， 通过遍历该属性，可以取得childComponent实例上的_vDom；

使用vDom来生成标识索引key，并以childComponent作为索引值，生成childrenComponent的Map结构； （对于Compotite类型，使用vDom.key作为标识索引key； 对于Text和Dom类型，使用childComponent在childrenComponent中所处的索引位置作为标识索引key)；

使用nextChildrenVDoms生成新nextChildrenComponent的Map结构； 在遍历vDom集合的过程中，会使用上面的标识索引key生成规则，来进行判定，看是复用之前的组件实例触发更新，还是创建一个新的组件；

ii. 经过上面一步得到Map结构的prevChildren和nextChildren之后， 会使用深度遍历算法，递归地比对树结构中，相同层级和位置的两个组件，将差异点保存为特定的diff标识结构，存入diffQueue队列中；

iii. 遍历diffQueue，按照差异的类型，完成最终HTML DOM的变动；

首先是_updateDOMChildren()里的的定义。由于在递归组件树的节点时，存在多次触发_updateDOMChildren()的情况； 因此使用_updateDepth变量，在比对操作前+1，完成后-1，来判定整个树的更新是否全部完成，继而调用_patch()完成HTML DOM的更新；

![img](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1799419322,2763570265&fm=173&app=49&f=JPEG?w=640&h=196&s=807047304B6245200CDCA1DA0000C0B2)

下面的_diff()中，实现了更新步骤中的1 和2。

![img](https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4008595702,1580410784&fm=173&app=49&f=JPEG?w=387&h=786&s=0251C730179B50695EF584DA0000C0B3)

值得注意的是_diff过程中lastIndex变量的作用，其记录在遍历过程中，每次访问到的prevChildrenComponent中位置最靠后的组件，这是组件更新的一种排序上面的优化策略，可以参见这一篇文章当中的详细介绍：不可思议的react diff。

在计算出diffQueue的差异队列后，在_patch()函数中完成最终HTML DOM的更新：

![img](https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3226131909,95283902&fm=173&app=49&f=JPEG?w=640&h=377&s=0250C7300F1B444B08DDA1DA000050B2)