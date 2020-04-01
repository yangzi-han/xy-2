**知识点总结**

### Chrome开发者工具是什么？

打开你的浏览器，按下`F12`键或者`ctrl+shift+i`，你会发现这样一个东西
 

![img](https:////upload-images.jianshu.io/upload_images/9428215-21d2dfc08a051f6f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

开发者工具整体界面



从页面标题`Developer Tools`我们就可以知道，这个就是我们要的Chrome开发者工具，它是一套内置在谷歌浏览器的Web开发和调试工具，一般的浏览器都会有开发者工具，使用方式都是大同小异，此篇文章都是围绕着谷歌浏览器展开，我们初略的将其划分为5各部分，分别是

-  **title 部分**，标志当前所在位置
-  **导航部分**，标志当前的功能模块
-  **源代码部分**，标志当前所选区域的代码
-  **样式，监听等计算所得部分**，标志当前所选模块的计算信息
-  **控制台等调试输出部分**，标志当前的状态信息

> **title部分**，这部分只是简单的展示你当前的位置信息，标志你所在的位置，只需知道即可

> **导航部分**，这部分是很重要的部分，几乎涵盖你可以操纵的全部功能模块，我们一部分一部分来探究

首先关于界面模块，我们可以选择将开发者工具嵌入我们的主界面，也可以独立出来
 选择页面右上角主菜单的`dock side`侧邻区，选择自己需要的位置即可

![img](https:////upload-images.jianshu.io/upload_images/9428215-c17d440aafc9815b.png?imageMogr2/auto-orient/strip|imageView2/2/w/273/format/webp)

选择界面的位置

下面的分别是：

-  `Hide console drawer`就是隐藏`console`控制台等调试输出部分的面板
-  `Search all files`就是全局搜索
-  `Shortcuts`就是快捷键，这部分内容其实已经整合在`setting`里面了
-  `Help`就是帮助界面了，有两个部分，一个是`Documentation`文档，一个就是-
-  `Release Notes`版本注释，这两部分使用的前提就是你可以访问谷歌了，可以选择翻墙哦
-  `More tools`就是更多工具啦，咱们来看看

![img](https:////upload-images.jianshu.io/upload_images/9428215-7b440b2f13631b1b.png?imageMogr2/auto-orient/strip|imageView2/2/w/466/format/webp)

更多工具More Tools

这里就不逐个展示啦，感兴趣的童鞋可以尝试下哦，蛮有趣的

> **animations** ——动画；**coverage** ——范围；**JavaScript profiler** ——js分析器
>  **layers** ——层；**network conditions** ——网络条件；**quick source** ——快速源
>  **remote devices** ——远程设备；**rendering** ——渲染；**request blocking** ——请求阻塞
>  **search** ——搜索；**sensors** ——传感器；**what's new** ——什么是新的

- ```
  Setting
  ```

  就是设置，可以设置相关的样式，主题色，布局，以及一些面板的调控和相关功能的设置

  ![img](https:////upload-images.jianshu.io/upload_images/9428215-c51d4d5003defa1c.png?imageMogr2/auto-orient/strip|imageView2/2/w/867/format/webp)

  设置面板

### 为什么要使用开发者工具

> **开发者工具**是一套内置在浏览器的Web开发和调试工具，开发者可以使用它来调试，解析开发的网站，我们都知道Web开发的效果会在浏览器上展现

> **浏览器和服务器交互的过程**，就是”一次性“的过程，在页面初始化的时候就会将html页面以及它的依赖项全部下载在浏览器上，然后经过浏览器的解析之后就可以渲染出页面的效果，就是基于这点，我们就有了深入剖析代码运行过程的机会，而这个机会就是通过开发者工具展现出来

如今为了更好的用户体验，将受众扩大，不少网站纷纷都采用[响应式布局](https://link.jianshu.com?t=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80%2F1220833)，那在这种情况下，为了更好的开发，chrome开发者工具给我们提供了一个**设备模式**

使用设备模式，我们就可以模拟移动设备，来构建移动优先，完全响应式的网站，可以在浏览器上近似的展现你的网站在移动设备上的显示效果，这对于我们开发者来说无疑是一个很好的礼物

**设备模式的使用：**

![img](https:////upload-images.jianshu.io/upload_images/9428215-d2b0c2fab3142853.png?imageMogr2/auto-orient/strip|imageView2/2/w/577/format/webp)

设备模式的使用

**选择模式的使用：**

有时候我们想在一个页面直接查看某部分的代码，虽然可以鼠标悬停在上面，然后右键检查，但是这样不是很灵活，如果我们想随心的查看代码，就可以使用浏览器提供的**选择模式**（快捷键Ctrl+shift+C）

![img](https:////upload-images.jianshu.io/upload_images/9428215-75b2cf50f006c24c.png?imageMogr2/auto-orient/strip|imageView2/2/w/29/format/webp)

选择模式



这样就可以很方便的查看我们的代码了

知道了这些基本的辅助操作，我们就可以开始着手我们的项目啦

### 怎么使用Chrome开发者工具

**element面板：**

![img](https:////upload-images.jianshu.io/upload_images/9428215-aadc697980c90cf3.png?imageMogr2/auto-orient/strip|imageView2/2/w/1016/format/webp)

element面板

element面板不仅可以查看我们的代码，还可以进行即时性的更改（双击需要更改的元素），可以实现自由的更改样式和布局

- 在element面板可以随时操作DOM树的元素
- 在style窗格可以操作选定元素的样式和CSS规则

> 比如单击`:hov`就可以模拟当前选定元素的`hover activity focus activited`态
>  单击`:cls`就可以元素的类名等‘

-  `Computed`窗格可以查看盒模型（`margin padding border`）
-  `Event Listeners`事件监听，可以监听选定元素绑定的事件
-  `DOM Breakpoints`你猜猜是什么，对了，就是DOM断点调试’

> 是不是和很神奇，哈哈哈，js断点，Java断点，c++断点，原来你（DOM）也有断点啊，真是白认识了这么多年，**选中元素，鼠标右键，选中菜单中的`Break on`，`Attributes modifications`刷新你的页面，当该元素的属性发生变化时，就会暂停脚本的执行，并且定位到改变发生的地方。是不是很棒呢**

**console面板：**

控制面板功能其实很强大的，使用起来又十分的方便，之前就是在控制面板编辑了一些脚本，完成了教学质量评价，感兴趣的童鞋看过来，[教学评估](https://www.jianshu.com/p/cffb553164dc)

   **功能：**

- 记录开发者开发过程中的日志信息
- 与js进行交互的“命令行shell”

![img](https:////upload-images.jianshu.io/upload_images/9428215-b53309c6f87828db.png?imageMogr2/auto-orient/strip|imageView2/2/w/1028/format/webp)

控制面板

- 左上角的禁止符号可以清空控制台的日志信息
- `top`页面的顶部框架，切换console环境，如果页面里有iframe这里就可以切换，切换后相当于打开iframe的console。选择top frame就是当前标签页的console
- `info`这个下拉框可以筛选控制台的日志信息
- `filter`过滤器，同样的，也是为了筛选console输出的信息
- `preserve log`保存历史纪录，就是在页面刷新的时候你的console口编辑的信息还在，但是只是作为显示，怎么说呢，就是比如你之前定义了`var a = 1;`但是你刷新页面的时候虽然之前的输出还在，但是这个时候你的`a`就已经是未定义的了

**source面板：**

这个面板的功能十分的强大，都是很实用的

- **功能一：实现本地文件和浏览器修改即时同步**

我们先来看两张图

![img](https:////upload-images.jianshu.io/upload_images/9428215-73761b5b8b9c991c.png?imageMogr2/auto-orient/strip|imageView2/2/w/774/format/webp)

workspace功能-更新之前

![img](https:////upload-images.jianshu.io/upload_images/9428215-5765e67adc46c530.png?imageMogr2/auto-orient/strip|imageView2/2/w/757/format/webp)

workspace功能-更新之后

是不是发现了什么呢，没错，这个就是workspace的强大功能了，**实现将浏览器的更改同步到本地**，这样就可以省去界面切换和粘贴复制的繁琐步骤了，就相当于有个文件缓冲区，设置关联之后，一旦将更改保存，则缓冲文件就会覆盖原先的文件，实现同步的效果，整个期间，可以一直在浏览器界面，不经过外界

> **怎么操作呢？**
>  首先，打开你的source面板
>  然后，选中你要操作的文件，右键选中菜单中的 `add floder to workspace`
>  授予权限之后就可以关联了，依然是右键，选中菜单的`map to file system`

- **功能二：监听变量的变化过程**

上面不是提到了DOM树其实也是可以打断点的吗，那既然可以打断点，肯定就会有一个调试模块啊，而`source`的`watch`窗格正好就是这个模块

![img](https:////upload-images.jianshu.io/upload_images/9428215-e3f108d551daf0f2.png?imageMogr2/auto-orient/strip|imageView2/2/w/414/format/webp)

DOM树的watch调试窗格

这里可以打断点、增加监听的变量、删除变量、更新变量还有就是常规的调试功能，按照窗格上面的说明来就可以了，用起来还是蛮不错的

**network面板：**

面板主要的工具也是常规的几个，

- 加载以及渲染过程的信息
- 数据的筛选匹配记录
- 查看详细的资源请求和响应数据（常用）
- XHR 重放

![img](https:////upload-images.jianshu.io/upload_images/9428215-3be11ba05f3d68ba.png?imageMogr2/auto-orient/strip|imageView2/2/w/1045/format/webp)

network面板