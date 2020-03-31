## session和cookie介绍
#### session和cookie，它是登录实现的基础，主要从下面几个方面介绍
- session和cookie基本概念
- session的生命周期
- cookie的作用域
cookie的跨域问题会在后续文章单独介绍。
#### 基本概念
大部分系统都需要识别用户的身份，有些功能只有特定的用户能使用，有些功能需要根据用户身份显示不同的内容，一般使用唯一编号标识用户的身份。
就像我们的身份证，身份证号是每个人唯一的，根据所在的省市区、出生年月、性别等规则生成，我们去政府机构办事时，都需要带着身份证，他们通过身份证验证我们的身份。
session和cookie主要用来识别登录者身份的，默认通过JSESSIONID唯一编号进行验证。session是在服务端保存的一个数据结构，用来跟踪用户的状态，也可以保存用户相关的一些数据，可以保存在内存、缓存、数据库等存储结构中。cookie是客户端保存用户信息的一种机制。

#### servlet session
javax.servlet.http包中是session的主要API接口，主要有以下几种接口：

- HttpSession：实际的session接口定义；
- Listener：session发生一些动作，如创建，设置属性，失效等，会触发一些事件，进行相应的处理；
- Event：当动作触发之后，封装为对应的事件；

session相关的接口，一般由应用服务器来实现，比如Tomcat、Resin、Jetty。Session的主要特征：
- 可以设置和获取一些属性；
- 每个session对应一个编号sessionId，是一次会话的唯一表示；
- session有超时时间，用户长时间无操作，维护的定时器会清除session，保证资源及时释放；
- 可以通过调用invalidate方法主动清除session；
另外，tomcat会实现session的管理和持久化，可随时获取到对应的session，具体实现不在本篇分析，网上有很多文章介绍。

#### cookie
cookie是客户端的解决方案，是服务器发给客户端的特殊信息，这些信息以文本文件的方式存放在客户端，后续请求，客户端都会带上这些特殊的信息。
服务端通过HTTPResponse设置cookie到响应头，发送到客户端，后续客户端自动将cookie信息设置到请求头。下面是我登录百度后的cookie信息：连接：https://user-gold-cdn.xitu.io/2018/2/28/161d8311f365a8bc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1

cookie也有失效时间，可在服务端通过cookie.setMaxAge(expiry)进行设置，expiry=-1：代表浏览器关闭后，cookie就失效了；expiry>0：代表会将cookie保存到硬盘中，直到设置时间过期才会被浏览器自动删除；expiry=0：删除cookie，cookie都会被浏览器给删除。

另外还有其他几个特性：

- setDomain：设置cookie范围，后面会详细介绍；
- isHttpOnly：是否只是http协议使用。只能在后端通过getCookies()获取，js不能获取；
- 每一个cookie文件大小：4kb ， 如果超过4kb浏览器不识别；
- cookie不安全，可能泄露用户信息，浏览器支持禁用cookie操作；
- 临时session：默认生命周期，当浏览器关闭时cookie销毁的；
**交互过程**
地址：https://user-gold-cdn.xitu.io/2018/2/28/161d8311f337693b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1

1、使用浏览器访问服务端页面；
2、服务端收到该客户端第一次请求后，会创建一个session，生产一个唯一sessionId；
3、同时在响应请求中设置cookie，属性名为jessionid；
4、客户端收到后会保存jessionid，再次请求时，会在header中设置，服务端可从请求头中获取；
5、服务端验证获取的sessionId是否存在，即可验证是否是同一用户；
```
当浏览器禁用cookie后，基于cookie的session将不能正常工作，每次都将创建一个新的session，可通过url重写传递jsessionid。
```
#### session的生命周期
session存储在服务器端，session在用户第一次访问时创建，访问jsp、servlet等程序时才会创建Session，只访问html、image等静态资源并不会创建，可调用request.getSession(true)强制生成Session。
服务器会把长时间没有活动的Session从内存中清除，tomcat中session的默认失效时间为30分钟，可调用调用session的invalidate方法强制清楚。
另外，我们可以自己实现session生命周期的管理，以满足特定的业务需求，比如后续要讲的单点登录、分布式session等，tomcat可提供了相应扩展，后续文章会介绍。
#### cookie的作用域
创建cookie时，需要设置domain，有多级域名时，可以控制cookie的作用域。如果网站请求量很大，设置的cookie作用域不当，会浪费很多流量。
下面举例说明，比如有三级域名support.kefu.mi.com，其中，mi.com是一级域名，kefu.mi.com是二级域名。
在3类域名下进行cookie设置，分别设置不同的domain，看看访问各级域名时cookie的有效性。当domain设置为空时，domain默认为当前域名。
##### 在一级域名mi.com下设置cookie

domain参数 | 访问一级 | 访问二级 | 访问三级 
---|---|---|---|---
空 |√|	√|	√
mi.com|	√	|√	|√
kefu.mi.com|	×|	×	|×
mcc.kefu.mi.com|×|×|×
当domain为一级域名时，一级域名、包括其下的子域名都可以接收到cookie。但是domain参数设置其子域名时，所有域名就接收不到了，包括那个子域名。
##### 在二级域名kefu.mi.com下设置cookie
domain参数 | 访问一级 | 访问二级 | 访问三级 
---|---|---|---|---
空 |x|	√|	√
mi.com|	√	|√	|√
kefu.mi.com|	×|	√	|√
mcc.kefu.mi.com|×|×|×

当domain为自身域名时，其父域名无法接收到cookie，其本身与其子域名可以接收到cookie。而设置其子域名或其他域名时，所有域名都接收不到cookie
##### 在三级域名mcc.kefu.mi.com下设置cookie 
domain参数 | 访问一级 | 访问二级 | 访问三级 
---|---|---|---|---
空 |x|	x|	√
mi.com|	√	|√	|√
kefu.mi.com|	×|	√	|√
mcc.kefu.mi.com|×|×|√

可以得出结论：domain参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则cookie不起作用