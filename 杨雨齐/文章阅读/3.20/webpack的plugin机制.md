# 地址
https://juejin.im/post/5e72def0f265da573c0c987f
# 总结
在webpack执行生命周期的时候会广播出事件，plugins监听这些事件，在合适的世界通过webpack提供的api改变输出结果，plugin是一个扩展器，在webpack打包的过程中，基于事件的驱动机制，在webpack打包过程中的某些节点，从而执行广泛的任务

基本插件架构

1.一个具名JavaScript函数
2.在它的原型上定义apply方法
3.指定一个触及webpack本身的事件钩子
4.操作webpack内部的实例特定数据
5.在实现功能后调用webpack提供的callback
