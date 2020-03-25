文章出处: https://juejin.im/post/59cb5eba5188257e84671aca 

总结:

![image-20200325185310045](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200325185310045.png)

**1.** 可以看到，一般都是团长等高级干部商量好对策之后（this.state设置好）

**2**. 把命令一层层的传递下去执行（this.props渲染）

**3**. 要是哪里发生了什么新的敌情了（想更新页面内容了）

**4** .就得一层层往上报告（通过回调一层层把数据传上去），此过程也必须一层层往上传递，不能越级，下面有解释

**5**. 团长做出决断后再发布命令传下去执行（通过setState修改数据并重新渲染）

**Redux横空出世**

所以说层级不深，组价之间也没有什么公用数据的时候，用React自身的setState其实也可以了，可是嵌套一深，或者组件有一些公用数据时就比较麻烦了，于是就有了redux（其实之前还有个flux），回到这个例子就是，他们在整个团之外又建立了一个**通讯班（Redux）**：

 

 **分清两个state**

在说Redux之前，我想说一下自己学的时候遇到的一个小坑，就是**Redux中的state和React中的state完全不是一回事**，React中的state是组件内部自己的状态信息，而Redux中的state是Redux自己的数据，然后React就拿Redux中的数据来用，其实Redux也可以在其他框架下使用，并不是非要跟React一起使用。

简单画个图看起来就像下面这样：

![image-20200325185346669](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20200325185346669.png)

