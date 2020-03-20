## jQuery
#### 生成jQuery对象
```
var global = typeof window !== "undefined" ? window : this;
var factory //line 40 第二个参数
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )(global, factory);
```
如果当前容器没用window对象，那么将this作为最父层。factory()函数将会返回jQuery对象。

在CommonJS 或者 CommonJS-like 的环境下 window 对象是没有问题的；如果一个执行环境，它的“window”对象没有“document”的属性，例如Node.js。那么需要暴露一个factory()方法，并将真实的“window”对象传入。var jQuery = require(“jquery”)(window);
```
router.get('/jquery/window', function(req, res, next) {
    console.log("window:" + typeof window);
    //window:undefined
    res.end();
});
```
#### 定义公共属性和工具方法
```
var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call(Object);

var support = {};
```
通过这种方式避免后面调用过程中一行代码过长
#### isFunction 判断是否是函数
```
var isFunction = function isFunction( obj ) {
	// Support: Chrome <=57, Firefox <=52
	// In some browsers, typeof returns "function" for HTML <object> elements
	// (i.e., `typeof document.createElement( "object" ) === "function"`).
	// We don't want to classify *any* DOM node as a function.
	return typeof obj === "function" && typeof obj.nodeType !== "number";
};
```
在部分浏览器中typeof document.createElement( “object” ) === “function”，因此要追加判断。我自己测试了一下，chrome、firefox、IE8+都不存在这种现象。

#### isWindow 判断对象是否是window对象
```
var isWindow = function isWindow( obj ) {
	// window.window === window;
	return obj != null && obj === obj.window;
};
```
对于上面例子中var isWindow = function isWindow( obj ) {//…};这种写法，做点额外补充。所有的函数都有一个name属性，该属性保存的是该函数名称的字符串。没有名字的函数（匿名函数）依然有name属性，只是属性值为空字符串。参见下面的例子：
```
var a = function(){}
console.log(a.name);
//IE: ""
//chrome: "a"
var b = function b(){}
console.log(b.name)
//IE: "b"
//chrome: "b"
var c = function cc(){}
console.log(c.name)
//IE: "cc"
//chrome: "cc"
```
匿名函数的name属性为空字符串，chrome做了额外的事情。

#### DOMEval 全局作用域内的求值操作
```
var preservedScriptAttributes = {
	type: true,
	src: true,
	noModule: true
};
function DOMEval( code, doc, node ) {
	doc = doc || document;

	var i,
		script = doc.createElement( "script" );

	script.text = code;
	if ( node ) {
		for ( i in preservedScriptAttributes ) {
			if ( node[ i ] ) {
				script[ i ] = node[ i ];
			}
		}
	}
	doc.head.appendChild( script ).parentNode.removeChild( script );
}
```
javascript的一大特点就是可以在运行时动态的解释并执行代码。
DOMEval()方法在head部分插入了需要执行的js脚本，该脚本会立即执行，然后从head部分移除掉了，保持页面的整洁，这也是为什么这个方法的名字叫做DOMEval而不是addScript。

这段代码一般用于动态执行从服务器端返回的代码。这种情况一般总是会要求代码在全局作用域内执行。
```
var url,params;
$.get(url,params,function(code){
    //var code="alert(1)";
    var script = document.createElement('script');
    script.text = code
    document.head.appendChild(script).parentNode.removeChild(script)
});
```
通过这个例子可以看到alert语句被执行了。

#### toType 判断对象类型
```
var class2type = {}; //line:62
------------------------------------------------------------
function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
// 构成对象的键值对
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );
```
