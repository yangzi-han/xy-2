源码解析:zepto

![image-20200323165310980](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200323165310980.png)

 1、serialize() 在表单为ajax的post请求中get请求自动获取,将表单元素input、textarea和select属性中的name和value，以及被选中的多选框、单选框 若选中则value为on,未选中则跳过，所有name和value按照键值对,以url中的参数格式&分割，写成字符串

​       1,button无效    

2、serializeArray() 同serialize()，不过是将每对name和value存进对象中然后再放进数组里    

3、submit() * 为 "submit" 事件绑定一个处理函数，或者触发元素上的 "submit" 事件* 当参数function没有给出时，触发当前表单“submit”事件，并且执行默认的提交表单行为，除非阻止默认行为。        * .submit(function(event){event.preventDefault;...});不阻止会一直提交 



1. 对表单字段的名称和值进行URL编码，使用&分隔。
2. 不发送禁用的表单字段。(也就是属性disabled为true的)
3. 只发送勾选的复选框和单选按钮
4. 不发送type为reset和button的按钮
5. 多选选择框中每个选择的值单独一个条目
6. 在单击提交按钮表单的情况下，也会发送提交按钮的value值，否则不发送提交按钮。
7. select元素的值，就是选中的option元素的value属性的值，如果option元素没有value属性则是option元素的文本值。 在表单序列化得过程中，一般不包含任何按钮字段，因为结果字符串很可能是通过其他方式提交的，除此之外其他规则都应该遵循。

## serializeArray

> 因为serialize依赖serializeArray的实现，所以我们先来看看它是怎么实现的。而他的作用是把form表单序列化成一个由 name 和 value 属性组成的对象的数组。形如：



```javascript
[
  {name: 'qianlongo', value: 'haha'},
  {name: 'wangmin', value: 'heihei'}
]
```

**源代码**



```javascript
 $.fn.serializeArray = function() {
  var name, type, result = [],
    add = function(value) {
      if (value.forEach) return value.forEach(add)
      result.push({ name: name, value: value })
    }
  if (this[0]) $.each(this[0].elements, function(_, field){
    type = field.type, name = field.name
    
    if (name && field.nodeName.toLowerCase() != 'fieldset' &&
      !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
      ((type != 'radio' && type != 'checkbox') || field.checked))
        
        add($(field).val())
  })
  return result
}
```

在$的原型上添加了`serializeArray`相关方法。一开始声明了`name`,`type`, `result`三个变量，分别存储表单控件的name属性，type属性，以及最后函数执行完成后要返回的数组。

首先通过`this[0]`判断有未选中表单元素，如果没有返回的结果就是一个空数组了。如果选中了，则对该表单的相关控件(`form.elements`表示表单中所有控件的集合)进行遍历。

获取单个控件的类型(type)，name属性(name),再接着就是判断符合提交到服务器端的表单控件条件了。

1. 需要有name属性(条件为"真")
2. 不能是`fieldset`元素
3. 不能是已经禁止的元素(即disable为true)
4. 不能是submit、reset、button、file等元素
5. 对于单选和多选控件，只发送已经勾选的。

在上面的条件都满足的条件下，调用`add`函数并将通过$(elements).val()获取到的值传入。

add函数的逻辑也非常简单。如果value是数组，则将value数组递归的每一项传入add。不是数组就是直接按照`{ name: name, value: value }`形式推入result了。

**不过什么时候value会为数组呢？我们需要从zepto模块的val函数实现看起**

**val函数实现**



```javascript
function val (value) {
  if (0 in arguments) {
    if (value == null) value = ""
    return this.each(function (idx) {
      this.value = funcArg(this, value, idx, this.value)
    })
  } else {
    // 主要看这里,multiple是用来设置下拉列表是否可以多选的。
    // 如果是多选的，则选择被选中(即selected为true)的元素并通过pluck方法，读取该元素的value值，最后返回的是一个数组
    return this[0] && (this[0].multiple ?
      $(this[0]).find('option').filter(function () { return this.selected }).pluck('value') :
      this[0].value)
  }
}
```

## serialize

> 将表单内容序列化为查询字符串。类似`name=qianlongo&sex=boy`

**源代码**



```javascript
$.fn.serialize = function(){
  var result = []
  this.serializeArray().forEach(function(elm){
    // 每个表单的name和value都通过encodeURIComponent编码
    result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
  })
  // 最后通过&符号分割
  return result.join('&')
}
```

有了`serializeArray`的基础，`serialize`就是将相应的name和value都通过`encodeURIComponent`编码，然后用`&`符号进行分割，也就达到了我们要的结果。

## submit()

> 有两种用法，当传入了一个回调函数的时候，是给指定的表单的`submit`事件添加一个回调处理函数。

> 如果没有传入回调函数则触发当前表单`submit`事件，并且执行默认的提交表单行为(前提是没有阻止浏览器默认行为)

**源代码**



```javascript
$.fn.submit = function(callback) {
  // 如果传了回调函数，则在选中的元素上添加submit事件
  if (0 in arguments) this.bind('submit', callback)
  // 否则在没有传递回调函数的情况下，并且选中有表单元素  
  else if (this.length) {
    var event = $.Event('submit')
    // 触发选中的第一个表单的是submit事件，注意这里只是手动触发绑定的submit事件，并不会提交表单
    this.eq(0).trigger(event)
    // 如果没有阻止默认事件，便调用form.submit()提交表单
    if (!event.isDefaultPrevented()) this.get(0).submit()
  }
  return this
}
```

## 结尾

> 以上是zepto form模块的相关源码分析，欢迎大家指正。