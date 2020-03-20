# 地址
https://juejin.im/post/5e742a1d518825493c7b7938
# 总结

1. 动态导入本地图片

<img :src="'@/assets/images' + imgUrl" alt="">
引入一个require
<img :src="require('@/assets/images' + imgUrl)" alt="">

2. 开发和产生路由的配置
配置路由的时候，开发环境不需要使用lazy-loading加载，仅在生产环境 使用即可，因为在开发环境中使用lazy-loading会导致webpack热更新比较慢

3. 带参数的自定义指令
Vue.directive('background', {
  inserted: function (el,binding) {
    // 修改背景色
    el.style.backgroundColor = binding.value
  }
})
其中第二个参数 binding 是一个对象，包含下面这些属性：

name：指令名，不包括 v- 前缀。
value：指令的绑定值，例如：v-background="'red'" 中，绑定值为 red。
oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。
expression ：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
arg ：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }

4. 带参数过滤器
过滤器一般在双花括号插值和v-bind表达式使用，经常是为了来格式化一些文本之类的
它跟自定义指令一样，也是可以带参数的，不过过滤器比起指令要简单的多。

5. $attrs解决数据多级传递
$attrs 官方解释是包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

6. 跨组件通信的另一种方式
想到跨组件通信，可能会想到 eventBus ， vuex 之类的方法，实际上我们可以借助 vue 本身的依赖注入这种方案优雅实现

7. 函数式组件
Vue 里的函数式组件和 React 中的无状态组件有些类似，如果说一个组件没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法，那么这时候我们可以考虑使用函数式组件。
函数式组件跟普通组件相比，因为没有状态管理，声明周期，只是函数，所以渲染开销低很多，
通常函数式组件的声明方式有2种
一种是模版渲染方式加上 functional 关键字创建
另一种是通过 render 渲染函数，并加上 functional 属性来标识创建，这种方式比模版更接近编译器，更加底层，渲染会更加迅速。


由于函数式组件没有实例，为了弥补这个问题，组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：

props：提供所有 prop 的对象
children: VNode 子节点的数组
slots: 一个函数，返回了包含所有插槽的对象
scopedSlots:  一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
parent：对父组件的引用
listeners:  一个包含了所有父组件为当前组件注册的事件监听器的对象
injections: 如果使用了 inject 选项，则该对象包含了应当被注入的属性。

8.自动化导入component
需要借助 webpack 里面的 require.context 方法，简单了解一下，通过它获取一个特定的上下文，然后从中读取指定目录下的文件和文件内容。
该方法有三个参数 directory，useSubdirectories和useSubdirectories

directory {String} -读取文件的路径
useSubdirectories {Boolean} -是否遍历文件的子目录
regExp {RegExp} -匹配文件的正则