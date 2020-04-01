# 地址
https://juejin.im/post/5e80c1f0e51d4546d961e575

# 总结
vue2.0实现原理
实现MVVM双向数据绑定的原理是通过object.defineproperty来劫持各个属性的getter和setter，在数据变动时发布消息给订阅者，触发相应的监听回调

vue3.0实现响应基于ES6的proxy

Vue2.0和Vue3.0的差异如下:
Vue2.0

基于Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
Object.defineProperty 无法检测到对象属性的添加和删除 。
由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
深度监听需要一次性递归，对性能影响比较大。

Vue3.0

基于Proxy和Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
不需要一次性遍历data的属性，可以显著提高性能。
因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11 
