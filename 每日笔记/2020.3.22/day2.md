**知识点总结**

1.ts的语法

### 原始类型

- boolean、number、string、undefined、null、symbol、void、bigint

> 小写表示ts的类型，大写的Boolean、Number、String是 JavaScript 的构造函数

- void表示空类型

> 在js中void表达式的返回结果是undefined

- symbol唯一不变的，需要es6的支持
- bigint大整数新类型，大于Number.MAX_SAFE_INTEGER，数字类型后面需要加n

### 其他类型

- any 任意类型

> 经常any的时候，typescript就进化成了anyscript，尽量不要使用

- unkonw 任意类型，相对any安全，被确定是某个类型之前，不能实例化，访问属性，函数执行
- never永不存在的，任何其他类型不能赋值给never，常用于函数返回值和空数组
- 数组，泛型类型，需要指定里面每个元素的类型 `Array或number []`
- 元组，已知元素数量和类型的数组，各元素类型不必相同，[string, number]
- enum枚举，用于声明一组命名的常数,当一个变量有几种可能的值时
  - 数字枚举，值会递增
  - 字符串枚举
  - 反向映射功能，key=>value，key<=>value，值得深思
  - 分开枚举，自动合并
- object表示非原始数据类型，普通对象、枚举、数组、元组通通都是 object 类型

2.接口

 TypeScript 的核心原则之一是对值所具有的结构进行类型检查，接口的作用就是定义这些结构，我喜欢称接口为自定义数据类型，比如ajax返回的结果，事件对象，react中的state和props等等 

![image-20200322144934987](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200322144934987.png)

 接口可以继承和多重继承 

![image-20200322144957905](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200322144957905.png)

### 类

- 访问限定符
  - private, 只可以在类的内部访问
  - protected，只可以在类的内部及子类访问
  - public，默认为public，可以在类的内部和外部访问
- Class作为接口，用于porps的类型检查的defaultProp的默认值
  - 接口是规范，只声明成员方法不做实现
  - 类声明成员方法并可以赋值

### 函数

 定义函数类型 

![image-20200322145049183](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200322145049183.png)

 函数重载，用同样的函数名声明不同参数和类型的函数 

### 泛型

在使用时指定类型，最简单的泛型就是数组

- 函数中的泛型

```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap('hello', 'world')
```

- 泛型接口

```js
interface PropsType<T, U>{
    (e: T): U
}
```

- 泛型栈

```js
// 泛型栈
class Stack<T> {
    private arr: T[] = []

    public push(item: T) {
        this.arr.push(item)
    }

    public pop() {
        this.arr.pop()
    }
}
```

- 使用继承约束泛型
- 泛型约束与索引类型

```js
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

- 继承交叉类型

```js
T extends FirstInterface & SecondInterface & ThirdInterface
```

- 构造函数类泛型，需要使用到new()

```js
function factory<T>(type: {new(): T}): T {
  return new type() // ok
}
```

### 交叉类型&联合类型&类型别名

- 交叉类型 &, 将多个类型合并为一个类型

- 联合类型 |, 属性为多种类型之一

- 类型别名 type, 创建类型别名，可以是普通类型，交叉类型或联合类型

- 类型别名跟interface的区别

  - interface 只能用于定义对象类型
  - interface 可以实现接口的extends和implements
  - type 可以定义更多类型

  ### 模块与命名空间

  - 命名空间

    - 目的是解决重名问题
    - 本质是一个对象

    模块与命名空间的区别

    - 命名空间在全局具有唯一性，可以跨文件
    - 模块以文件为单位，每个单独的文件是一个模块

**项目中遇到的问题:**

问题:在第二次获取list的数据的时候没有获取到,

解决:给他加个类型ItemType

**面试题中遇到的问题**

什么是diff算法?



