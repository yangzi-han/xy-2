## antd源码解析
antd是一个对于样式和简单功能的封装，值得关注的来个两点：1）定义的样式规则可接受性比较广泛，2）采用融合了react，每一个都封装为一个组件，组件配置化大大提升 本文通过简单例子说明对于组件样式和功能的简单封装。 1、图标   通常为了提高页面可读性和用户的良好交互，通常会给按钮或者其他地方加入icon，那么通常操作是什么呢？   通过伪类实现而antd中恰是这么实现的 简单例子


```
html：
<button class="test" οnclick="alert('ok')"></button>
css:
.test::after{
    content:url(/i/bg_flower.gif);
}
```

2、上传功能
通常前端会处理上传的图片、文件、视频等，html5支持了FileReader，而antd中upload确实使用了FileReader，本文就说一下FileReader的使用方法：FileReader 首先了解：   Base64是一种基于64个（实际65个）ASCII字符来表示二进制数据的表示方法。   Blob对象：二进制对象，file就继承自blob   目的：减少http请求，但是会增大文件，需要取舍，适合那种不经常变动的logo   FileReader：FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。


```
API： 
void abort(); 
void readAsArrayBuffer(in Blob blob); 
void readAsBinaryString(in Blob blob); 
void readAsDataURL(in Blob blob); ／／图片一般使用这个 
void readAsText(in Blob blob, [optional] in DOMString encoding);
```

antd中的实现方式：


```
var previewFile = function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        return callback(reader.result);
    };
    reader.readAsDataURL(file);
}
```

整个流程是这样的：数据上传-》读取为url-》上传成功-》执行回调函数-》预览图片 当然可能会问了，base64位的字符怎么就能预览图片了？ 当然是解码与编码的问题了 关于图片上传：图片上传 附录： 在浏览器标签页添加图标：


```
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
```
