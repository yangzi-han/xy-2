文章出处: https://www.jianshu.com/p/1c899f2f0770 

总结:

1.什么是ts

 TypeScript是JavaScript的一个超集，js是弱类型语音，Ts可以约束变量的类型，弥补了该不足。代码更 严谨 

- js 是弱类型语言，因此在运行时经常会出现一些语法错误，而 TypeScript 是一种在编译期进行静态类型分析的强类型语言，可以在一定程度上防止或排查这些错误。
- TypeScript 是 js 的超集，因此与js兼容性高。
- 给大型项目提供一个构建机制，加入了基于类的对象、接口和模块，让代码的可维护性和扩展性更强。
- TypeScript 的编辑器有类似于代码转换和类型擦除的组件，浏览器执行的还是 TypeScript 编译后的js代码。
- 遵循当前以及未来出现的 ES 规范，大多数 TypeScript 的新增特性都是基于未来的 js 提案。
- 开源跨平台。

2.ts的类型

 布尔，数字，字符串，数组，元祖，枚举，any，Void, Null, Undefined, Never, Object; 

#### number

```js
// 浮点数，支持2、8、10、16进制
let height: number = 6;
```

#### boolean

```js
let isDone: boolean = true;
```

#### string

```js
// 可以使用字符串模板
let name: string = "jss";
```

#### array

```js
// 由此类型元素组成的数据
let list: number[] = [1,2,3]

// 数组泛型
let list: Array<number> = [1,2,3]
```

#### tuple

元组：已知元素数量和类型的数组，类型可以不同

```js
let x: [number, string];
x = [0, 'normal'];

x = [1, 'a'] // OK
x = ['a', 1] // error,类型不匹配
x = [1] // error,长度固定

// 在TypeScript2.7之后，元组的定义变成了有限制长度的数组，不能越界访问。
x[2] = ['官网']  // error

x.push(true) // error,不是(string | number)类型

// Ts 本质上还是 Js，就算声明约束为长度2的数组，依然可以push，但是 Ts 可以做的是限制继续在约束范围外进行其他操作
x.push('str') // 不会报错
console.log(x[2]) // error
```

#### enum

枚举：给一个数字集合（从0开始）更友好的命名

```js
enum Color: { Red, Green, Blue };
let c: Color = Color.Green;  // 1

// 编译成ES5之后的代码
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color[Color["Blue"] = 6] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;

// 也可以使用自定义成员值
enum Status: { Success = 1, Err };
let s: Status = Status.Success; // 1
console.log(Status.Err); // 2 后面的名字映射的值也会改变
console.log(Status[1]); // Success 也可以通过枚举的值得到名字
```

#### any

可以表示一个不确定其类型的值，编译时可以对 any 类型的值最小化静态检查

```js
let list: any[] = [1, 'a', true];
```

#### void

表示没有任何类型，当函数没有返回值时，返回值类型是void

```js
function warnUser(): void {
    console.log("This is my warning message");
}

// 定义一个 void 类型的值只能赋值 undefined
let unusable: void = undefined;
```

#### undefined,null

```js
let u: undefined;
console.log(u); // OK

let u: null;
console.log(u); // 编译不会报错，但有提示（赋值前使用了变量u）

let u: undefined = undefined;
let n: null = null;
```

#### never

表示永不存在的值的类型

```js
// 总是会抛出异常的函数
function error(message: string): never {
    throw new Error(message);
}

// 不会有返回值的函数
function infiniteLoop(): never {
    while (true) {
    }
}
```

除了函数，变量也有可能是 never 类型，当它们为永不为真的类型保护约束时。

never 是任意类型的子类型，可以赋值给任何类型。

never 没有子类型，没有类型（包括 any）可以赋值给 never 类型，除了 never 本身

#### object

表示非原始类型

一个 Object.create API 的实现

```js
declare function create(o: object | null): void;
create({ a: 1 }); // OK
create(null); // OK
```

### 联合类型

用来声明可以储存多种类型值的变更

```js
let both: number[] | string
both = [1, 2, 3] // OK
both = 'a' // OK
both = 1 // error
```

3.ts的接口(interface)

 接口是一堆变量的类型约束 

![](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200322142036564.png)4.命名空间

命名空间就是内部模块，ts所说的模块一般是外部模块。命名空间是为了解决变量名污染和代码维护性而来的。当一个web应用需求越来越多，代码越来越多，为了提高代码的维护性，最好是按照功能拆分一个文件成多个文件。拆分后的文件使用同一个命名空间，那么在使用的时候就如同定义在同一个文件。

![](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200322142151142.png)