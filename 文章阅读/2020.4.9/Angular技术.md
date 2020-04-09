# 文章地址
https://segmentfault.com/a/1190000011120860
## 文章概述
* 一、项目的初始化
Angular是一个正式发布于16年九月的一个前端框架（其实Angular的定位是一个平台了），它和vue、react不太一样的是，Angular不只是针对视图层的一个库，它提供的是一个完整的解决方案和生态，它本身内置了组件化方案、模块化方案、测试、表单验证、路由、国际化和HTTP服务等，这些东西我们开发者不用再去纠结怎么选择，直接按官方的建议说明走就好了，选择困难症患者肯定很喜欢这样的，但相对的它也就没有vue和react那么灵活了，这个怎么看待得根据我们每个人的项目需求来选择。既然Angular它本身是这么完整的了，它肯定也有CLI工具，那就是Angular CLI，Angular CLI是一个命令行界面工具，它可以创建项目、添加文件以及执行一大堆开发任务，比如测试、打包和发布。
* 二、模块化与组件化
Angular 应用是模块化的，并且 Angular 有自己的模块系统，它被称为NgModules。我们的应用由一个或者多个模块组成，并且必须要有一个根模块，我们通常命名为AppModule，每个模块都会有一个叫@NgModule的装饰器函数，它接收一个用来描述模块属性的元数据对象，我们在这个对象属性上配置我们应用所需的组件、路由、指令、管道、服务等。然后Angular会引导根模块来启动应用
```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```
* 三、跨域问题
跨域问题几乎是现代前端项目都会遇到的了，在vue，react等项目项目中我们可以通过webpack-dev-server的代理配置来解决，Angular CLI创建出来的项目底层也是通过webpack来进行应用的打包编译的，但是Angular CLI把webpack的配置给包装隐藏起来了，我们可以通过执行命令ng eject来暴露出webpack的配置文件，但就为了配置跨域问题就把webpack的配置暴露出来其实没有必要。我们可以这样做，先在项目的根目录地下新建一个proxy.config.json配置文件，在该文件里面写下如下代码，告诉Angular，应用里面所有以api开头的HTTP请求都转发到localhost的3002端口。
## 文章总结
* 虽然angularjs已经退化了，但是我们现在使用的vue就是利用了angular的很多有点，所以说这个技术和人一样都要去更新去进化 ，因为只有这样才不会被这个社会给淘汰。
* angular解决跨域这个问题，他又很大的弊端就是他没有像vue和react那样直接就是用webpack的代理配置来解决，所以说angular的这个配置本地代理就有点繁琐。