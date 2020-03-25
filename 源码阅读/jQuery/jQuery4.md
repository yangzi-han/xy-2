#### isEmptyObject 是否是空对象  
```
isEmptyObject: function (obj) {

	/* eslint-disable no-unused-vars */
	// See https://github.com/eslint/eslint/issues/6125
	var name;

	for (name in obj) {
		return false;
	}
	return true;
},
```


只要对象包含至少一个属性那么就返回false，即不是空对象。

#### globalEval 全局作用域内的求值操作
参见DOMEval
```
// Evaluates a script in a global context
globalEval: function (code) {
	DOMEval(code);
},
```


#### each 遍历方法
首先我们看一下我们是如何使用$.each接口的：

```
// 回调函数中第一个参数是当前元素在数组中的索引，第二个参数是遍历到的当前元素
$.each(arrObj,function(i,item){
    if(//condition){
        // 通过return false 可以跳出当前循环
        // return false;
    }
    // TODO: 业务逻辑
});
```


```
each: function (obj, callback) {
	var length, i = 0;

	if (isArrayLike(obj)) {
		length = obj.length;
		for (; i < length; i++) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	} else {
		for (i in obj) {
			if (callback.call(obj[i], i, obj[i]) === false) {
				break;
			}
		}
	}
	return obj;
},
```


通过源码，我们可以清晰的看到对于类数组对象$.each直接遍历数组里面的每个元素，而其他对象则是遍历属性，如果回调函数返回false则跳出循环。

#### trim 过滤空格

```
// Support: Android <=4.0 only
trim: function (text) {
	return text == null ?
		"" :
		(text + "").replace(rtrim, "");
},
```


关于中间用到的正则表达式，前面已经详细阐述过了。这里面有一个小技巧，即通过(text + "")调用toString方法。

#### merge 合并两个数组内容到第一个数组
将第二个数组对象合并到第一个数组对象上
```
// Support: Android <=4.0 only, PhantomJS 1 only
// push.apply(_, arraylike) throws on ancient WebKit
merge: function (first, second) {
    // 将length转成数值类型
	var len = +second.length,
		j = 0,
		i = first.length;

	for (; j < len; j++) {
		first[i++] = second[j];
	}

	first.length = i;

	return first;
},
```


#### makeArray 将类数组对象转变为真实数组
首先看一下接口的使用效果：
```
var obj = Object('str');
var objArr = $.makeArray(obj);
// (3) ["s", "t", "r"]
obj instanceof Array
// false
objArr instanceof Array
// true
```

源码：

```
// results is for internal usage only
makeArray: function (arr, results) {
	var ret = results || [];

	if (arr != null) {
		if (isArrayLike(Object(arr))) {
			jQuery.merge(ret,
				typeof arr === "string" ? [arr] : arr
			);
		} else {
			push.call(ret, arr);
		}
	}

	return ret;
},
```



Object(arr)可以将原始类型转变为对象类型（装箱操作）


```
Object(true)
//Boolean {true}
```

