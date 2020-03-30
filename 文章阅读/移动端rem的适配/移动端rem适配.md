##### 第一种方法：考虑了m端屏幕旋转的问题.对兼容性做出了一定的处理,具体看代码

```
export function rem (doc, win) {  
  let docEl = doc.documentElement;  //考虑以及兼容了 屏幕旋转的事件
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';  
  let recalc = function () { 
     var clientWidth = docEl.clientWidth;          
     if (!clientWidth) return;           
     if (clientWidth >= 750) {
                 docEl.style.fontSize = '100px';
      } else {
                 docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
      };   if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);     // 屏幕大小以及旋转变化自适应
    doc.addEventListener('DOMContentLoaded', recalc, false);     // 页面初次打开自适应
    recalc();
};
```

##### 第二种方法：采用html标签的offsetWidth长度计算

```
export function rem() {  
  var fz = document.querySelector('html').offsetWidth / 7.5; //设计图 750 1rem=100px
  document.querySelector('html').style.fontSize =
    fz <= 100 ? fz + 'px' : '100px';  window.onresize = function() {
    rem();
  };
};
```

##### 第三种方法：采用window.innerWidth计算,设置了body fontSize防止字体继承,使页面字体过大

```
export function rem() { 
  document.documentElement.style.fontSize = window.innerWidth / 7.5 + 'px'; //1rem = 100px
  document.body.style.fontSize = '14px';// 在body上将字体还原大小，避免页面无样式字体超大
}
```

现在回过头来看，感觉自己以前写复杂了，其实道理很简单；

###### 就是利用vw，rem随屏幕，或者跟字体正比变化的特性；

1. 就是开发的时候用的750设计稿的尺寸；单位是px；

2. 然后编译工具，如postcss 会自动将px单位转成对应rem和vw单位；

3. 如果是vw很好转转行，比如写的40px；40/750 vw就完了；

4. 如果是rem就多一步罢了；要用js计算出根字体大小，并设置给html；


```
*正常是 375 ，16px;所以比例常数就是 : 屏幕尺寸/75032 ，也就是html 根字体 大小；

e.g : postcss将40px转化成rem单位； 1rem/(屏幕尺寸/75032) = x/40*

x 就等于 40/(屏幕尺寸/75032) rem;*

*动态改变(屏幕尺寸/75032) 这个 根字体 就可以动态适应屏幕了！
```


```
//rem适配
 (function () {
        var  styleN = document.createElement("style");
        var width = document.documentElement.clientWidth/16;
        styleN.innerHTML = 'html{font-size:'+width+'px!important}';
        document.head.appendChild(styleN);
    })();
```
- 这什么意思呢？就是把手机屏幕分成16份，每份设置为font-size，就是每份代表1rem。

- 那我们要怎么用呢？直接在代码中引入普通js一样就可以了。

如果设计师给的图是750px;那么1rem就是750/16=46.875px；也就是1rem代表46.875px；那如果在css中要写

```
.box{
  width:60px;
}
```
要怎么写呢？这么写


```
.box{
  width:1.28rem;
}
```

这个1.28怎么来的!
60px/46.875px*1rem = 1.28rem就是这么来的。
