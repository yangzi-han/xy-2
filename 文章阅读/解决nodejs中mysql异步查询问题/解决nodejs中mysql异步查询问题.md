执行环境：

Node v12.13.1

webstorm

Express搭建服务

问题发生情景：
前几个月的时候，我用Node写博客的时候碰见了一个查询数据库的问题(好像是给用户添加权限的时候，太久了记不清了)，我当时并没有想那么多，就像我在Java中通过selectByWhere(String sql)或selectOne(Integer)等方式来简化代码一样，于是顺理成章写了代码，后面发现并不可取，根本拿不到查询出来的值
于是。。我当时采取了下面这种方法(现在想想真是脑子有病= =。。。)


- 在query方法外部声明一个临时变量，等查询结果出来后给它赋上(当时并没有意识到是异步查询)，并作为整个函数的返回值
这能拿到数据真是有鬼！！！

![image](https://user-gold-cdn.xitu.io/2020/1/30/16ff5dac7b490e9b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

然后我就发现mysql是异步查询，所以当时我就用async和await来写，那这篇文章讲的是Promise，那就用Promise来包装一下，async和await就留着给下篇文章讲吧
使用Promise进行包装后，效果很容易就实现了！！！

![image](https://user-gold-cdn.xitu.io/2020/1/30/16ff5daf73ee9d7c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
