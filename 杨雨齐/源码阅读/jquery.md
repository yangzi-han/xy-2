 **jQuery**的所有对象都封装在闭包上。闭包的好处，我以前写关相关的博客。闭包的一大特点是，所有声明的变量、方法都是在函数内部使用，与全局变量没有冲突。 

**jQuery** 是一款开源的，最流行的，面向对象的**Javascript**框架 ![img](https://upload-images.jianshu.io/upload_images/11823378-4755d4d7470601e5.png?imageMogr2/auto-orient/strip|imageView2/2/w/872/format/webp) 

 1、如何构造 **jQuery** 对象
 2、**jQuery**对象的继承 

 jQuery 提供了四种封装jQuery对象的方法，分别是

1.DOMElement
2.HTML strings
3.TAG
4.expr, $(…)
这四种方法的调用如下。

1.elem = document.getElementsByTagName("div");
2.elem = $(elem);
3.var elem = $("<p>hello</p>");
4.var elem = $("div");
5.var elem = $("body > div");
通过这些方法，就生成一个jQuery对象。 

![](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200320172953959.png)

![](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200320173051643.png)

