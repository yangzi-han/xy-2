## Axios拦截
#### 在src目录下的api目录创建一个js文件
~~~
import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from '@/store/index'  //引入store
import router from '@/router'  //引入router
~~~
#### 创建一个axios实例
```
let instance = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})
```
#### 编写请求拦截器
这个拦截器会在你发送请求之前运行
我的这个请求拦截器的功能是为我每一次请求去判断是否有token，如果token存在则在请求头加上这个token。后台会判断我这个token是否过期。
```
// http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = store.state.token  //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
```
#### 响应拦截器
```
// http response 拦截器
instance.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    if (response.data.code) {
      switch (response.data.code) {
        case 1002:
          store.state.isLogin = false
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
  ```
  #### 最后把实例导出就行了
    - export default instance


在需要的页面导入就可以使用了
```
import instance from './axios'

/* 验证登陆 */
export function handleLogin (data) {
  return instance.post('/ds/user/login', data)
}
```