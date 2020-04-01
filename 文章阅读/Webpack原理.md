 ## Webpack
 之前我们提到过，一个NPM中的包可能是用的不同的module format，你不能说哪一种是不对的不能使用的，所以在面对不同的方法的时候你也需要使用不同的使用方法。而且需要说明的是，上面我们说的所有东西都只是关于JS的，别忘了一个web app还有CSS还有各种静态资源。我们需要的是一个支持所有module format，并且同时还能支持除了JS以外的别的文件的一个“系统”或者说工具。
 ## webpack是什么？
 webpack is a module bundler lets you write any module format(mixed also), compiles then for the browser. And it supports static async bundling.
很简单有很强大的定义对吧，它几乎解决了上面所有的问题，那么它是怎么被创造出来的呢？这是一个有意思的小故事。

2012年，一个叫做Tobias的，在Newberg(美国一个城市)读master的德国人要写一片学位论文。他之前是写c#的，从来没有写过一个web界面。他在一些特定的场景需要用到Google Web Toolkit中的一个叫做code splitting的功能。而在他的论文中他需要写一个web app，他就想找一个包含这个功能的库来用。他找到的这个库叫webmake，这也是一个bundler。但是却没有code splitting这个功能，于是他提了一个issue，并且写了一堆如何实现这个功能的代码，希望维护者能够加入这个功能。在一番讨论过后维护者拒绝了他，于是在经过同意之后，他把这个库fork到了了过去并自己加上了这个功能，给新的库取名为webpack。

2014年，Dan Abramov在Stack Overflow上提了一个关于hot module replacement的问题，Tobias用很大的篇幅给他介绍了这个还在开发的功能，详细解释了这个功能怎么在webpack里工作的，以及这个功能有多棒，你可以不用刷新浏览器了！

2015年，这时在Instagram工作的Pete Hunt通过一次演讲告诉了世界他们是如何使用webpack打包发布他们的react app的。然后你懂得，webpack就火了。像Facebook这样的公司也开始使用webpack了。但是其实Tobias只是每周大概花5 6个小时在webpack中。

是的，在这两个讨论中，webpack彻底火了，走向了世界。

中国有句话叫做“以史为鉴，可以知兴替”。在了解这些历史的时候除了觉得很有意思，也会有一些思考：在历史的大潮里，有多少人是可以做那个改变方向的人？又有多少人死在了历史的长河里？要想不被淹死，只有奋力向上。