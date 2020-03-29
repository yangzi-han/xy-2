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


- instance(url，option)如何转化为request方法

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

###### Axios.prototype.request

```
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // instance 入口传入的参数
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}


Axios.prototype.request = function request(config) {
  console.log('config', config);

  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  // 将this.defaults 与config对象进行合并   默认请求方法是get
  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  // chain数组是用来盛放拦截器和dispatchRequest方法的 通过promise从chain数组中 按序取出回调函数逐一执行
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  /** *
          通过use进行声明使用的  会被添加进来
       InterceptorManager.prototype.use = function use(fulfilled, rejected) {
                  this.handlers.push({
                      fulfilled: fulfilled,
                      rejected: rejected
                  });
              return this.handlers.length - 1;
         };
         
      使用时：
           // Add a request interceptor
          axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
  */
  // 先加入的后执行
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 先加入的先执行
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  /**
         * http://www.axios-js.com/docs/  Interceptors的使用
         * 通过对于request和response的forEach操作
         * chain数组
         * [requestFulfilledFn,requestRejectFn
         *  dispatchRequest,undefined]
         * reponseFulfilledFn,requestRejectFn]
         *
         */

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
};
```
###### dispatchRequest
1. 拿到config对象，在传给http请求前做最后的处理
2. http请求根据config配置 发起请求
3. http请求成功之后 对数据进行转化 然后return
```
module.exports = function dispatchRequest(config) {
  //  取消机制
  throwIfCancellationRequested(config);

    .....

  // Ensure headers exist
  config.headers = config.headers || {};
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  // 删除header中的无用属性
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
```



