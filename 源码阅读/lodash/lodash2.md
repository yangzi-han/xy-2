###### _objectToString 私有函数,精确获取数据的类型
精确获取数据的类型，比如
Object.prototype.toString.call([]) // "[object Array]"

```
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

export default objectToString;
```

上面声明一堆变量，其实可以简写成一句


```
function objectToString(value) {
  return Object.prototype.toString.call(value);
}

export default objectToString;
```

###### _root
获得全局对象
```
import freeGlobal from './_freeGlobal.js';

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

export default root;
```

Function('return this')();这句话最有意思，Function('return this')其实就是创建个函数function(){return this},然后后面的括号是立即执行该函数，拿到当前宿主全局对象，node的global或者浏览器的window，在红宝书中134页有提到用这种办法拿全局对象，但是写法有点不同罢了，


```
var global = function(){
return this;
}();
```

你不知道的JavaScript 中册40页提到的另一种创建函数的方式


```
var e = new Function( "a", "return a * 2;" );
```

也就是将Function作为构造函数使用，得到的结果等同于


```
var f = function(a) { return a * 2; }
function g(a) { return a * 2; }
```


