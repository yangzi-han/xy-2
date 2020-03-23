## jquery 利用正则表达式去除空格

```
var
	// 版本号
	version = "3.3.1",
	// 定义一个jQuery的本地副本
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},
	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
```

其中\uFEFF属于BOM标记，用来表示当前文件的字符编码。
BOM（Byte Order Mark），字节顺序标记，出现在文本文件头部，Unicode编码标准中用于标识文件是采用哪种格式的编码。
BOM采用UTF-8编码。几乎所有的文本编辑软件都可以显示并编辑UTF-8编码的文件。但是很遗憾，其中很多软件的表现并不理想。

常见的bug是：

    1.js文件保存为非utf-8编码时（例如GBK）文件开头会出现乱码

    2.html文档在浏览器中打开时，顶部会出现一行空白
其中 ++\xa0++ 代表非连续空白符。我们通常所用的空格是  ++\x20++ ，是在标准ASCII可见字符 ++0x20~0x7e++ 范围内。而 ++\xa0++ 属于 latin1 （ISO/IEC_8859-1）中的扩展字符集字符，代表空白符nbsp(non-breaking space)。

==rtrim== 的正则表达式是一种兼容写法，用于去除字符串首尾的空格。

## 静态方法
line:297-line:472

#### expando jquery的唯一标示

```
// Unique for each copy of jQuery on the page
// jquery的唯一标示。数据缓存，ajax，事件机制都用到了这个。后面集中分析
expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
```
#### isReady 文档是否加载完毕
line 3878 列出了jquery DOM加载的相关方法，这里暂不做讨论

```
// Assume jQuery is ready without the ready module
isReady: true,
```
#### error 调用原生的Error类

```
error: function (msg) {
	throw new Error(msg);
},
```


#### noop
指向一个什么都不做的函数，我们经常可以看到某个组件的默认回调被设为$.noop

```
noop: function () {},
```

#### isPlainObject 判断是否为纯粹对象

```
var getProto = Object.getPrototypeOf;

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call( Object );
// "function Object() { [native code] }"
```



```
isPlainObject: function (obj) {
	var proto, Ctor;

	// Detect obvious negatives
	// Use toString instead of jQuery.type to catch host objects
	// 使用 toString 而不是jQuery.type来捕获宿主对象，这是因为type也是调用了toString方法，参见jQuery.type()
	//jQuery.type = toType; //line 10291 toType方法前面已经介绍过
	if (!obj || toString.call(obj) !== "[object Object]") {
		return false;
	}

    //获取对象的原型
	proto = getProto(obj);

	// Objects with no prototype (e.g., `Object.create( null )`) are plain
	// 如果一个对象是通过Object.create( null )来创建的话，那么它的原型为空，相比于用{}来创建的对象，它的开销也就更小。
	// 所以如果我们需要一个 json对象仅用来存储参数，可以使用这个方法
	if (!proto) {
		return true;
	}

	// Objects with prototype are plain iff they were constructed by a global Object function
	// 如果一个对象是是由全局的Object函数来创建的，那么它是纯粹对象
	Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
},
```


简单来说，一个对象只有通过{}直接创建、 new Object() 或者通过 Object.create(null) 方式创建那么它才是一个纯粹的对象。
