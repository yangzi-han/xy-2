## Axios源码理解
#### axios项目目录结构
```
├── /dist/                     # 项目输出目录
├── /lib/                      # 项目源码目录
│ ├── /cancel/                 # 定义取消功能
│ ├── /core/                   # 一些核心功能
│ │ ├── Axios.js               # axios的核心主类
│ │ ├── dispatchRequest.js     # 用来调用http请求适配器方法发送请求
│ │ ├── InterceptorManager.js  # 拦截器构造函数
│ │ └── settle.js              # 根据http响应状态，改变Promise的状态
│ ├── /helpers/                # 一些辅助方法
│ ├── /adapters/               # 定义请求的适配器 xhr、http
│ │ ├── http.js                # 实现http适配器
│ │ └── xhr.js                 # 实现xhr适配器
│ ├── axios.js                 # 对外暴露接口
│ ├── defaults.js              # 默认配置 
│ └── utils.js                 # 公用工具
├── package.json               # 项目信息
├── index.d.ts                 # 配置TypeScript的声明文件
└── index.js                   # 入口文件
```
#### 源码分析
作为axios项目的入口文件，我们先来看下axios.js的源码
能够实现axios的多种使用方式的核心是createInstance方法
```
// /lib/axios.js
function createInstance(defaultConfig) {
  // 创建一个Axios实例
  var context = new Axios(defaultConfig);

  // 以下代码也可以这样实现：var instance = Axios.prototype.request.bind(context);
  // 这样instance就指向了request方法，且上下文指向context，所以可以直接以 instance(option) 方式调用 
  // Axios.prototype.request 内对第一个参数的数据类型判断，使我们能够以 instance(url, option) 方式调用
  var instance = bind(Axios.prototype.request, context);

  // 把Axios.prototype上的方法扩展到instance对象上，
  // 这样 instance 就有了 get、post、put等方法
  // 并指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
  utils.extend(instance, Axios.prototype, context);

  // 把context对象上的自身属性和方法扩展到instance上
  // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
  // 这样，instance 就有了  defaults、interceptors 属性。（这两个属性后面我们会介绍）
  utils.extend(instance, context);

  return instance;
}

// 接收默认配置项作为参数（后面会介绍配置项），创建一个Axios实例，最终会被作为对象导出
var axios = createInstance(defaults);
```
以上代码看上去很绕，其实createInstance最终是希望拿到一个Function，这个Function指向Axios.prototype.request，这个Function还会有Axios.prototype上的每个方法作为静态方法，且这些方法的上下文都是指向同一个对象。

那么在来看看Axios、Axios.prototype.request的源码是怎样的？

Axios是axios包的核心，一个Axios实例就是一个axios应用，其他方法都是对Axios内容的扩展
而Axios构造函数的核心方法是request方法，各种axios的调用方式最终都是通过request方法发请求的
```

// /lib/core/Axios.js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

Axios.prototype.request = function request(config) {
  // ...省略代码
};

// 为支持的请求方法提供别名
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
```
通过以上代码，我们就可以以多种方式发起http请求了: axios()、axios.get()、axios.post()

一般情况，项目使用默认导出的axios实例就可以满足需求了，
如果不满足需求需要创建新的axios实例，axios包也预留了接口，
看下面的代码：
```
// /lib/axios.js  -  31行
axios.Axios = Axios;
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};
```
说完axios为什么会有这么多种使用方式，可能你心中会有一个疑问：
使用axios时，无论get方法还是post方法，最终都是调用的Axios.prototype.request方法，那么这个方法是怎么根据我们的config配置发请求的呢？

在开始说Axios.prototype.request之前，我们先来捋一捋在axios项目中，用户配置的config是怎么起作用的？
#### 用户配置的config是怎么起作用的
这里说的config，指的是贯穿整个项目的配置项对象，
通过这个对象，可以设置：

http请求适配器、请求地址、请求方法、请求头header、 请求数据、请求或响应数据的转换、请求进度、http状态码验证规则、超时、取消请求等

可以发现，几乎axios所有的功能都是通过这个对象进行配置和传递的，
既是axios项目内部的沟通桥梁，也是用户跟axios进行沟通的桥梁。

首先我们看看，用户能以什么方式定义配置项:

```

import axios from 'axios'

// 第1种：直接修改Axios实例上defaults属性，主要用来设置通用配置
axios.defaults[configName] = value;

// 第2种：发起请求时最终会调用Axios.prototype.request方法，然后传入配置项，主要用来设置“个例”配置
axios({
  url,
  method,
  headers,
})

// 第3种：新建一个Axios实例，传入配置项，此处设置的是通用配置
let newAxiosInstance = axios.create({
  [configName]: value,
})

```
#### axios.prototype.request
这里面的代码比较复杂，一些方法需要追根溯源才能搞清楚，
所以只需对chain数组有个简单的了解就好，涉及到的拦截器、[dispatchRequest]后面都会详细介绍

chain数组是用来盛放拦截器方法和dispatchRequest方法的，
通过promise从chain数组里按序取出回调函数逐一执行，最后将处理后的新的promise在Axios.prototype.request方法里返回出去，
并将response或error传送出去，这就是Axios.prototype.request的使命了。
**源码**
```
// /lib/core/Axios.js
Axios.prototype.request = function request(config) {
  // ...
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};
```