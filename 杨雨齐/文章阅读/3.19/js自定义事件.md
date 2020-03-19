# 地址
https://segmentfault.com/a/1190000021810527
# 总结
1.事件本身是一种通信方式，在多个模块开发的时候可以使用自定义事件
2.实现的两种方法 Event()和CustomEvent()
3.区别：Event()是一个简单的自定义函数，CustomEvent()支持传参detail参数，并且在EventListener获取
4.使用场景：用观察者模式的地方都可以用
5.适当使用自定义事件来提升代码质量