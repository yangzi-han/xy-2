# 地址
https://juejin.im/post/5d977f47e51d4578453274b3

# 总结

1.兼容性
目前打包后的代码是 ES2015+，不支持 IE 11
2.对 TypeScript 的使用
Vue 3 的源代码完全没有使用 class 关键字！
3.代码结构
reactivity 目录：数据响应式系统，这是一个单独的系统，可以与任何框架配合使用。
runtime-core 目录：与平台无关的运行时。其实现的功能有虚拟 DOM 渲染器、Vue 组件和 Vue 的各种API，我们可以利用这个 runtime 实现针对某个具体平台的高阶 runtime，比如自定义渲染器。
runtime-dom 目录: 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。
runtime-test 目录: 一个专门为了测试而写的轻量级 runtime。由于这个 rumtime 「渲染」出的 DOM 树其实是一个 JS 对象，所以这个 runtime 可以用在所有 JS 环境里。你可以用它来测试渲染是否正确。它还可以用于序列化 DOM、触发 DOM 事件，以及记录某次更新中的 DOM 操作。
server-renderer 目录: 用于 SSR。尚未实现。
compiler-core 目录: 平台无关的编译器. 它既包含可扩展的基础功能，也包含所有平台无关的插件。
compiler-dom 目录: 针对浏览器而写的编译器。
shared 目录: 没有暴露任何 API，主要包含了一些平台无关的内部帮助方法。
vue 目录: 用于构建「完整构建」版本，引用了上面提到的 runtime 和 compiler。

4.@vue/runtime-core 模块
import { createRenderer, createAppAPI } from '@vue/runtime-core'

const { render, createApp } = createRenderer({
  pathcProp,
  insert,
  remove,
  createElement,
  // ...
})

// `render` 是底层 API
// `createApp` 会产生一个 app 实例，该实例拥有全局的可配置上下文
export { render, createApp }

export * from '@vue/runtime-core'

5.@vue/runtime-dom 模块
export { render, createApp }

// re-export everything from core
// h, Component, reactivity API, nextTick, flags & types
export * from '@vue/runtime-core'

export interface ComponentPublicInstance {
  $el: Element
}
6.@vue/runtime-test 模块
export { render, createApp }

// convenience for one-off render validations
export function renderToString(vnode: VNode) {
  const root = nodeOps.createElement('div')
  render(vnode, root)
  return serializeInner(root)
}

export * from './triggerEvent'
export * from './serialize'
export * from './nodeOps'
export * from './jestUtils'
export * from '@vue/runtime-core'

7.@vue/reactivity 模块
export { ref, isRef, toRefs, Ref, UnwrapRef } from './ref'
export {
  reactive,
  isReactive,
  readonly,
  isReadonly,
  toRaw,
  markReadonly,
  markNonReactive
} from './reactive'
export {
  computed,
  ComputedRef,
  WritableComputedRef,
  WritableComputedOptions
} from './computed'
export {
  effect,
  stop,
  pauseTracking,
  resumeTracking,
  ITERATE_KEY,
  ReactiveEffect,
  ReactiveEffectOptions,
  DebuggerEvent
} from './effect'
export { lock, unlock } from './lock'
export { OperationTypes } from './operations'

8.@vue/compiler-core 模块
export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions = {}
): CodegenResult {
  // 详情略 ...
  return generate(ast, options)
}

export { parse, ParserOptions, TextModes } from './parse'
export { transform /* ... */ } from './transform'
export { generate, CodegenOptions, CodegenContext, CodegenResult} from './codegen'
export { ErrorCodes, CompilerError, createCompilerError } from './errors'
export * from './ast'

8.@vue/compiler-dom 模块
针对浏览器做了适配，如对 textarea 和 style 标签做了特殊处理。

9.@vue/server-renderer 模块
目前这个模块没有实现任何功能。

10.vue 模块
这个模块就是简单的引入了 runtime 和 compiler：
import { compile, CompilerOptions } from '@vue/compiler-dom'
import { registerRuntimeCompiler, RenderFunction } from '@vue/runtime-dom'

function compileToFunction(
  template: string,
  options?: CompilerOptions
): RenderFunction {
  const { code } = compile(template, {
    hoistStatic: true,
    ...options
  })
  return new Function(code)() as RenderFunction
}

registerRuntimeCompiler(compileToFunction)

export { compileToFunction as compile }
export * from '@vue/runtime-dom'
