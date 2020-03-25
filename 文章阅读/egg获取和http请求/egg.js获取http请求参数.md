# 文章地址
https://www.jianshu.com/p/4827ec84cbd1
# 总结
在Egg.js框架中，由于 Controller基本上是业务开发中唯一和HTTP 协议打交道的地方，所以框架通过在 Controller上绑定的 Context实例，
提供了许多便捷方法和属性获取用户通过 HTTP请求发送过来的参数
1. query
 在url中？后面的部分是一个Query String，这一部分经常用于 GET 类型的请求中传递参数。
例如 GET /search?name=egg&age=26中 name=egg&age=26 就是用户传递过来的参数，
可以通过ctx.query获取到参数。当参数中的key值重复时 只取第一个次出现的key的值，后面再出现的会自动忽略

2. queries 
有时候我们的系统会设计成让用户传递相同的 key，例如 GET /posts?category=egg&id=1&id=2&id=3。针对此类情况，框架提供了 context.queries 对象，这个对象也解析了 Query String，但是它不会丢弃任何一个重复的数据，而是将他们都放到一个数组中
context.queries上所有的 key 如果有值，也一定会是数组类型。

3. body
在 header之后还有一个 body部分，我们通常会在这个部分传递 POST、PUT 和 DELETE 等方法的参数。
一般请求中有 body的时候，客户端（浏览器）会同时发送 Content-Type告诉服务端这次请求的 body 是什么格式的。
如果用户的请求 body 超过了我们配置的解析最大长度，会抛出一个状态码为 413 的异常，如果用户请求的 body 解析失败（错误的 JSON），会抛出一个状态码为 400的异常。