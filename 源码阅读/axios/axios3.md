http请求完成后到达用户的顺序流
![image](https://upload-images.jianshu.io/upload_images/5703029-c01cbdca52e7cfd0.png?imageMogr2/auto-orient/strip|imageView2/2/w/471/format/webp)

#### axios 修改全局的转换器


```
import axios from 'axios'

// 往现有的请求转换器里增加转换方法
axios.defaults.transformRequest.push((data, headers) => {
  // ...处理data
  return data;
});

// 重写请求转换器
axios.defaults.transformRequest = [(data, headers) => {
  // ...处理data
  return data;
}];

// 往现有的响应转换器里增加转换方法
axios.defaults.transformResponse.push((data, headers) => {
  // ...处理data
  return data;
});

// 重写响应转换器
axios.defaults.transformResponse = [(data, headers) => {
  // ...处理data
  return data;
}];
```
#### adapter是什么
> adapter是一个典型的适配器模式的实现 ,内部对于不同环境做了适配处理，封装了统一的行为：根据config发送请求然后返回一个promise，promise的状态由请求的结果来决定


```
function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  }
  return adapter;
}
```


