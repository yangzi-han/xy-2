### axios调用方法


```
const axios = require('axios');

// 第一种
axios({
  url,
  method,
  headers,
})

//  第二种

axios(url, {
  method,
  headers,
})


//  第三种


axios.get(url, {
  headers,
})


//  第四种

axios.post(url, data, {
  headers,
})

// 第五种

axios.request({
  url,
  method,
  headers,
})
```

### axios 内部流程图
![image](https://upload-images.jianshu.io/upload_images/5703029-c6150640e4efa374?imageMogr2/auto-orient/strip|imageView2/2/w/450/format/webp)
### axios流程 解析
#### 入口文件

```
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 * 创建axios实例
 */
function createInstance(defaultConfig) {
 
  var context = new Axios(defaultConfig);  // context为Axios实例  
  // bind(fn,context)
  // context  ：   Axios {defaults: {…}, interceptors: {…}}
  // var instance = Axios.prototype.request.bind(context);
  // instance 指向request方法 上下文指向context  ===> instance(option)方式调用
  // Axios.prototype.request 对于第一个参数的数据类型判断 ===> instance(url，option)方式调用
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  // Axios.prototype上的方法扩展到instance对象上 instance具有get post等方法  制定上下文为context
  // Axios.prototype: { request: ƒ, getUri: ƒ, delete: ƒ, get: ƒ, head: ƒ, … }
  utils.extend(instance, Axios.prototype, context);
  
  
  // Copy context to instance
  // instance 就有了defaults、interceptors 属性
  utils.extend(instance, context);
  return instance;
}


// Create the default instance to be exported  创建新的axios实例
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;


// Factory for creating new instances
// 工厂函数 根据配置创造新的实例
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
// 注册取消机制
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread  all和spread两个处理并行的静态方法
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');


module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports.default = axios;
```

### 入口文件解析
- instance(option) 如何转化为request方法

```
var instance = bind(Axios.prototype.request, context); 
var instance = Axios.prototype.request.bind(context);
instance({
        method: "get",
        url: url
      }).then(res => {
        console.log(res);
 });

bind:
module.exports = function bind(fn, thisArg) {
   //  fn:   指Axios中的Axios.prototype.request 
   //  thisArg 就是context  就是Axios {defaults: {…}, interceptors: {…}}
  return function wrap() {
    // arguments [{url,method:'get'}，callee:()....]
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
```


-instance(url，option)如何转化为request方法

```
var instance = bind(Axios.prototype.request, context); 
var instance = Axios.prototype.request.bind(context);

 instance.get(url, {
          params: "花好动漫"
        })
        .then(res => {
          console.log(res);
        });
    }
    
bind:
module.exports = function bind(fn, thisArg) {
   //  fn:   指Axios中的Axios.prototype.request 
   //  thisArg 就是context  就是Axios {defaults: {…}, interceptors: {…}}
  return function wrap() {
    // arguments [url,{params:'花好动漫'}，callee:()....]
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};  

utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
```


