**知识点总结:**

# antd-mobile基本使用

## 1 下包 npm install antd-mobile --save

## 2 页面处理: index.html (官网上有)



```xml
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-    scale=1, user-scalable=no" />
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
<script>
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}
if(!window.Promise) {
  document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
}
</script>
```

## 3  实现按需打包



```jsx
   1 下包 npm install --save-dev babel-plugin-import react-app-rewired

   2 定义加载配置的js模块: config-overrides.js （在根目录下）
            const {injectBabelPlugin} = require('react-app-rewired');
                module.exports = function override(config, env) {
                config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
                return config;
      }

   3 修改配置: package.json
       "scripts": {
              "start": "react-app-rewired start",
              "build": "react-app-rewired build",
              "test": "react-app-rewired test --env=jsdom",
              "eject": "react-scripts eject"
        }
```

## 4 使用



```jsx
import {Button} from 'antd-mobile'
```



**页面适配**

   rem是相对于根元素的字体大小的单位，也就是html的font-size大小，浏览器默认的字体大小是16px，所以默认的1rem=16px，我们可以根据设备宽度动态设置根元素的font-size，使得以rem为单位的元素在不同终端上以相对一致的视觉效果呈现。

事实上 rem是把屏幕等分成 指定的份数，以20份为例，每份为 1rem ， 1rem 对应的大小就是 rem基准值 ，rem做的就是把 rem基准值 给<html>的 font-size ，所以如果设备的 物理像素 宽为 640px ，分成20份，那么 1rem=640px/20=32px , <html>的 font-size为32px 。

```
//这段代码放在head标签里面
(function () {
    var html = document.documentElement;
 
    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }
 
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();
```

当然，你也可以分成30份，40份，60份等等，这个看自己的喜好了

在我们实际切图的时候，对于视觉稿上的元素尺寸换算，只需要元素的 原始的px值(即你量的大小) 除以 rem基准值 即可。例如设计稿的大小为640px， rem基准值 = 640px/20 = 32px ，有个元素的大小你量出来是 140px286px* ，那么换算过来就是：

```
140px = 140/32 = 4.375rem
286px = 286/32 = 8.9375rem
```

这样我们就可以用rem来代替像素px了， 而且在所有的移动端都是自适应的

这个方法目前是比较好的适配方法，只是rem在计算时很麻烦，有很多小数，这个时候大家可以试一下用less.js解决rem的小数问题

## rem+vw适配

什么是vw和vh?

vw : 1vw 等于视口宽度的1%
vh : 1vh 等于视口高度的1%
vmin : 选取 vw 和 vh 中最小的那个
vmax : 选取 vw 和 vh 中最大的那个

用视口单位度量，视口宽度为100vw，高度为100vh（左侧为竖屏情况，右侧为横屏情况）

例如，在桌面端浏览器视口尺寸为650px，那么 1vw = 650 * 1% = 6.5px（这是理论推算的出，如果浏览器不支持0.5px，那么实际渲染结果可能是7px）

注意：这里的1%是指占视口的1%，而不是我们定义的div的1%

如何利用rem+vw进行屏幕适配呢？我们以设计稿为750px为基准

第一步：设置meta标签

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
```

第二步：设置html的font-size大小

```
html{
    font-size:13.33333333vw
}
```

为什么**font-size=13.33333333vw?**

下面分析下原理吧, 上面我们说了vw表示1%的屏幕宽度,而我们的设计稿通常是750px的,屏幕一共是100vw,对应750px,那么1px就是0.1333333vw,。

同时我们知道rem,rem是相对html元素的字体大小，为了方便计算,我们取html的font-size=100px,通过上面的计算结果1px是0.13333333vw,那么100px就是13.333333vw了

所以，我们让1rem=100px=13.333333vw

那么在项目上就很好地可以进行使用了

当我们通过ps测量一个div的大小为 width:200px,height:137px时，我们就可以这样写，ps量出来的像素直接除以100，计算小数很方便

```
div {
  width: 2rem;
  height:1.37rem;
 
 }
```