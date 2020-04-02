### 通过 Mixin 注入 Store

从入口文件 index.js 开始，代码不多，可以直接贴出来



```dart
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions
}
```

如果你一眼就看出这里的关键是 install，那么你应该领略到读源码先了解设计思想的独特魅力了，没错，作为 Vue 的 Plugin，install 方法就是入口

循着 install 方法进入 store.js，还是符合预期，这个方法主要干得是事情就是 mixin



```jsx
export function install (_Vue) {
  ...
  Vue = _Vue
  applyMixin(Vue)
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
```

并且还有一个小细节，浏览器环境下并且 Vue 不为空的时候，引入 Vuex 之后是会自动注册的

具体来看看 mixin.js 这个文件，划重点（注意看注释）：



```php
// 通过钩子 init / beforeCreate 执行 vuexInit
const usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })

// 组件初始化的时候注入 $store
function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
}
```

### Store 对象

Vuex 的最佳实践中，一般这样使用（带着目标去阅读，效果更佳）：



```jsx
// create store
const store = new Vuex.Store({
  actions: {
    ...
  },
  modules: {
    ...
  }
})
import App from './comps/app.vue'
new Vue(Vue.util.extend({ el: '#root', store }, App))
```

我们需要新建一个 Store，在创建 Vue 实例的时候，作为参数传入，在上一节的 vuexInit 函数中，是从 this.$options 中取出 store 赋值给组件的 $store 的，如此，便能无缝联系上了

接下来的重点，就是 Store 这个类了，还是 store.js 这个文件，怀着入参为 ations 和 modules 的预期，来读 constructor 方法，倒是有一个语句是用来处理 modules 的



```cpp
this._modules = new ModuleCollection(options)
```

但真的是寻寻觅觅寻不到从 options 中取出 actions 进行处理的方法，当然后面仔细阅读了 ModuleCollection 中的代码之后，才找到了答案，actions 参数也是在这里面提取的。毕竟让我纠结迷茫了良久，如果是我来写的话，我可能不会这么写，方法的命名需要有语义性，而且一个方法也应当只做一件事情

原则上为了尽快理清主流程，有些细节需要暂时略过（所以语义化的命名、合理的函数拆分，对阅读者来说是多么的重要），假设已经知道前面的步骤已经从 options 中读到了 actions 和 modules，那么下一个核心节点就是：



```kotlin
installModule(this, state, [], this._modules.root)
```

这一步再进行分解（注意看注释）



```tsx
  // 注册 mutation
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })
  
  // 注册 action
  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })

  // 注册 getter (computed)
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  // 遍历子模块
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
```

出于篇幅以及希望阅读的同学亲自实践的目的，具体的注册方式这里不再展开

进入下一个重要环节 resetStoreVM，创建 VM，实现数据监听(注意看注释)



```tsx
function resetStoreVM (store, state, hot) {
  
  // bind store public getters
  // getters 其实就是 computed
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // 创建一个 Vue 实例，作为 Store 的 VM
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  ...
}
```