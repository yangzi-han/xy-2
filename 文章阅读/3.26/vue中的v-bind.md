# 地址
https://juejin.im/post/5e798e76f265da574a1ed997

# 总结
1.v-bind化的属性统一存储在哪里：attrsMap与attrsList
解析HTML，解析出属性集合attrs，在start回调中返回
在start回调中创建ASTElement，createASTElement(... ,attrs, ...)
创建后ASTElement会生成attrsList和attrsMap
attrs的数据类型定义
绑定属性获取函数 getBindingAttr 和 属性操作函数 getAndRemoveAttr

2.如何获取v-bind的值
常见的key属性
绑定一个普通html attribute：title
绑定class和style
绑定一个html DOM property：textContent

3.v-bind:key源码分析
function processKey (el) {
  const exp = getBindingAttr(el, 'key')
   if(exp){
      ...
      el.key = exp;
   }
}
processKey函数中用到了getBindingAttr函数，由于我们用的是v-bind，没有用:，所以const dynamicValue = getAndRemoveAttr(el, 'v-bind:'+'key');

4.v-bind:title源码分析
title是一种“非vue特殊的”也就是普通的HTML attribute。
function processAttrs(el){
     const list = el.attrsList;
     ...
     if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '')
        value = parseFilters(value)
        ...
        addAttr(el, name, value, list[i], ...)
      }
}
export const bindRE = /^:|^\.|^v-bind:/
export function addAttr (el: ASTElement, name: string, value: any, range?: Range, dynamic?: boolean) {
  const attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []))
  attrs.push(rangeSetItem({ name, value, dynamic }, range))
  el.plain = false
}

对于原生的属性，比如title这样的属性，vue会首先解析出name和value，然后再进行一系列的是否有modifiers的判断（modifier的部分在下文中会详细讲解），最终向更新ASTElement的attrs，从而attrsList和attrsMap也同步更新。


5.v-bind:class源码分析

function transformNode (el: ASTElement, options: CompilerOptions) {
  const warn = options.warn || baseWarn
  const staticClass = getAndRemoveAttr(el, 'class')
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass)
  }
  const classBinding = getBindingAttr(el, 'class', false /* getStatic */)
  if (classBinding) {
    el.classBinding = classBinding
  }
}

在transfromNode函数中，会通过getAndRemoveAttr得到静态class，也就是class="foo"；在getBindingAttr得到绑定的class，也就是v-bind:class="vBind.class"即v-bind:class="{ borderRadius: isBorderRadius }"，将ASTElement的classBinding赋值为我们绑定的属性供后续使用。


6.v-bind:style源码分析

在transfromNode函数中，会通过getAndRemoveAttr得到静态style，也就是style="{fontSize: '12px'}"；在getBindingAttr得到绑定的style，也就是v-bind:style="vBind.style"即v-bind:class={ minHeight: 100 + 'px' , maxHeight}"，其中maxHeight是一个变量，将ASTElement的styleBinding赋值为我们绑定的属性供后续使用。

7.v-bind:text-content.prop源码分析
function processAttrs (el) {
  const list = el.attrsList
  ...
  if (bindRE.test(name)) { // v-bind
      if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name)
            if (name === 'innerHtml') name = 'innerHTML'
          }
       }
       if (modifiers && modifiers.prop) {
          addProp(el, name, value, list[i], isDynamic)
        }
   }
}
export function addProp (el: ASTElement, name: string, value: string, range?: Range, dynamic?: boolean) {
  (el.props || (el.props = [])).push(rangeSetItem({ name, value, dynamic }, range))
  el.plain = false
}
props?: Array<ASTAttr>;

v-bind:text-content.prop中的text-content首先被驼峰化为textContent（这是因为DOM property都是驼峰的格式），vue还对innerHtml错误写法做了兼容也是有心，之后再通过prop标识符，将textContent属性增加到ASTElement的props中，而这里的props本质上也是一个ASTAttr。


8.v-bind的修饰符.camel .sync源码分析

<Parent
  v-bind:foo="parent.foo"
  v-on:updateFoo="parent.foo = $event"
></Parent>
父组件向子组件传递的props是无法被子组件直接通过this.props.foo = newFoo去修改的。
除非我们在组件this.$emit("updateFoo", newFoo)，然后在父组件使用v-on做事件监听updateFoo事件。若是想要可读性更好，可以在$emit的name上改为update:foo,然后v-on:update:foo。











































































































































