## React合成事件
#### 什么是合成事件系统？
合成事件这个名词是从“Synthetic Event”翻译过来的，在react的官方文档和源码中，这个术语狭义上是指合成事件对象,一个普通的javascript对象。而在这里，我们谈论的是由众多不同类型事件的合成事件对象组成的合成事件系统(React’s Event System)。在我的理解里面，合成事件是相对浏览器原生的事件系统而言的。合成事件系统本质上是遵循W3C的相关规范，把浏览器实现过的事件系统再实现一遍，并抹平各个浏览器的实现差异，使得开发者使用起来体验是一致的。
在开始理解什么是合成事件系统之前，我们不妨看看我翻译的react的合成事件对象。从这篇文档，我们可以得到以下关于合成事件系统与原生事件系统异同方面的结论：

##### 相同点
- 在event target,current event target, event object，event phase 和 propagation path等核心概念上的定义是一致的。
- dispatch机制是一致的：一个事件的触发，都会导致某个event object沿着propagation path上传播。换句话说，就是同一个propagation path上的每一个event listener拿到的event object都是同一个。

也就是说，这两者采用的架构，实现的接口都是一致的。因为两者都遵循W3C的标准规范
##### 不同点

- 注册方式不一致。

    - 拿同样是通过行内attribute来注册事件监听器的DOM Level 1来说，原生事件系统中，属性名都是小写，比如：“onclick”,“onmousedown”等，但是在react的合成事件系统中，是采用小驼峰的写法，比如：“onClick”,"onMouseDown"(注意，"onMouseDown"不要写成“onMousedown”了)。
    - 如果把jsx也勉强看作markup language的话（因为jsx最终是会被转换为普通的js代码,所以说如果），原生事件系统目前有从DOM Level 1（其实还有个DOM Level 0，不过它不算实际上的标准，它指的是IE4和Netscape Navigator 4.0最初支持的DHTML）到DOM Level 3的三种事件注册的方式，但是在react的合成事件系统中，只有上述的行内属性的注册方式。
    - 对于捕获事件的注册方式不同。在原生事件系统中，我们是通过DOM Level 3的addEventListener()方法的第二个boolean类型的参数来指示是否要把event listener绑定在捕获阶段来实现的。但是在react合成事件系统中，你要想绑定在捕获阶段，则是使用形如“onClickCapture”的属性名。


- 事件监听器（event listener）中，this的指向不同。在原生的事件系统中，事件监听器中this是指向current event target的。而在react的合成事件系统中，this指向的是当前的组件实例。
- 事件监听器（event listener）中，event object不同。在react的合成事件系统中，我们拿到的event object是原生的event object的wrapper。更加具体点说，原生的event object是作为一个key（key名为nativeEvent）挂载在合成事件对象上的。或者换句话说，合成事件对象是原生事件对象的父集。
- 相比于原生事件对象，react的合成事件系统对合成事件对象引入了pooling技术。这么干的原因，用官方的原话说，就是：“These systems should generally use pooling to reduce the frequency of garbage collection.”。

在这里之所以要提到react合成事件系统与原生系统上的异同点，这是因为我觉得带着“造成两者之间的差别的原因是什么呢？”这个疑问去探索react的合成事件系统会更有针对性。因为源码往往是繁复的，如同茫然而无边际的原始森林一般，一旦我们没有目标，就容易迷失在这原始森林里，最终一无所获。