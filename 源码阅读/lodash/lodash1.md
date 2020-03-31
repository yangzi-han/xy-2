###### 1. isObjectLike

```
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}
```

export default isObjectLike;
两行代码，少到令人发指的地步，这样看来只有普通对象{}，数组[]，还有内置类型的实例（比如 new Date(), new Regex(),new String('geek')），可以是伪对象

###### 2. isObject

```
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

export default isObject;
```

isObject代码也就三行，比isObjectLike多了个条件，就是函数也被认为是对象，这就是广义上的对象

###### 3. isPlainObject 是否是纯的（平的）对象

![image](https://upload-images.jianshu.io/upload_images/910389-7004445763393aae.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)


```
import baseGetTag from './_baseGetTag.js';
import getPrototype from './_getPrototype.js';
import isObjectLike from './isObjectLike.js';

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

export default isPlainObject;
```
该函数是用来判断一个对象是否是通过Object构造函数new出来的，或者他的原型链__proto__是null，其中baseGetTag是用来准确判断数据的类型,baseGetTag函数没有直接对外暴露出来，但是很有用


