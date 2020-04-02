# 文章概述
如果你使用过 Redux 开发 React，你一定听过 容器组件（Smart/Container Components） 或 展示组件（Dumb/Presentational Components），这样划分有什么样的好处，我们能否能借鉴这种划分方式来编写 Vue 代码呢？这篇文章会演示为什么我们应该采取这种模式，以及如何在 Vue 中编写这两种组件。
## 什么是容器组件?
容器组件专门负责和 store 通信，把数据通过 props 传递给普通的展示组件，展示组件如果想发起数据的更新，也是通过容器组件通过 props 传递的回调函数来告诉 store。

