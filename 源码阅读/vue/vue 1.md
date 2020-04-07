先上一张vue底层原理关系图

![image](https://upload-images.jianshu.io/upload_images/17381126-6ede0d5697536223.png?imageMogr2/auto-orient/strip|imageView2/2/w/742/format/webp)

vue底层原理关系图
上图完整的描述了 Vue 运行的机制，首先数据发生改变，就会经过 Data 处理，然后Dep会发出通知(notify)，告诉 Watcher 有数据发生了变化，接着 Watcher 会传达给渲染函数跟他说有数据变化了，可以渲染视图了(数据驱动视图)，进而渲染函数执行render 方法去更新 VNODE，也就是我们说的虚拟DOM，最后虚拟DOM根据最优算法，去局部更新需要渲染的视图。这里的 Data 就做了数据劫持
#### 数据的双向绑定
双向绑定数据响应的原理就是往data的属性调用Object.defineProperty方法去加get，set函数

    
```
var obj = {};
    Object.defineProperty(obj,"name",{
      //Object.defineProperty(obj, prop, descriptor)
      // obj
      // 要在其上定义属性的对象。
      // prop
      // 要定义或修改的属性的名称。
      // descriptor
      // 将被定义或修改的属性描述符。
      get:function(){
        return document.querySelector('#name').innerHTML;
      },
      set:function(val){
        document.querySelector('#name').innerHTML = val;
      }
    })
    obj.name = "luccy"
```

##### 那么知道vue的数据绑定原理之后，我们尝试下自己写一个vue.js叫KVue.js
创建一个类Kvue,接收的数据为

```
new Kvue({
data:{...}
})
```


```
class KVue{
  constructor(option) { //constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    this.$options = option;

    // 数据响应化
    this.$data = option.data;  //获取data数据
    this.observe(this.$data);  //observe 监听方法
  }
}
```

##### observe方法用于监听data里面的数据变化
所以我们在KVued的类中需要创建一个observe方法

```
// 监听
  observe(obj){
    if(!obj || typeof obj !== 'object'){  //判断书数据存在且是一个对象
      return;
    }

    // 遍历该对象
    Object.keys(obj).forEach(key =>{  //遍历拿出所有属性
      this.defineReactive(obj,key,obj[key]);  //数据响应化函数
    })
  }
```

##### 该方法是通过遍历data里面的每一个值都加上get，set的监听即是vue双向绑定的原理
在KVue中创建defineReactive函数,这个方法叫做数据劫持

```
//  数据响应化
  defineReactive(obj,key,val){    // 可称为数据劫持

    this.observe(val);  //多层遍历，递归解决数据的嵌套

    Object.defineProperty(obj,key,{
      get(){
        return val;
      },
      set(newVal){
        if(newVal === val){
          return;
        }
        val = newVal;
        console.log(`${key}属性更新了：${val}`)
      }
    })
  }
```

这样就完成了数据响应化的操作即双向绑定
接下来在html中使用我们的KVue.js，并打开浏览器查看


```
<body>
    <div>
      <p id="name"></p>
    </div>
  </body>
  <script src="Kvue.js"></script>
  <script>
    // 调用Kvue
    const app = new KVue({
      data:{
        name:'雷神之锤',
        list:{
          litile:'小矮子'
        }
      }
    })
    app.$data.name = "雷神之斧";
    app.$data.list.litile = '大个子';
    /*
      关于为什么是app.$data 而不是 app.data是因为Kvue里面封装的问题
        this.$data = option.data;
        this.observe(this.$data);  //observe 监听方法
    */
  </script>
```
![image](https://upload-images.jianshu.io/upload_images/17381126-657eda855f627951.png?imageMogr2/auto-orient/strip|imageView2/2/w/661/format/webp)
