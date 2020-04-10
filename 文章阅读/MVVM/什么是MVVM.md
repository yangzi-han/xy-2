### MVVM
1. MVVM 是 Model-View-ViewModel 的缩写。mvvm 是一种设计思想
2. Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
3.	在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
4.	ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
5.	mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。和当 Model 频繁发生变化，开发者需要主动更新到 View 。
6. Mvvm:
    - Model：数据模型
    - View：带特殊属性的 html 模板
    - ViewModel：依靠 Directive，修改数据 & 自动渲染
7. MVVM的实现主要是三个核心点：
    - 响应式：vue如何监听data的属性变化
    - 模板解析：vue的模板是如何被解析的
    - 渲染：vue模板是如何被渲染成HTML的
