##### 依赖收集与追踪
###### 找到页面中需要更新的地方，并通知更改
在KVue.js中创建Dep类（用于管理Watcher）和Watcher类（监听器负责更新视图）


```
// 依赖对象 用来管理Watcher
class Dep {
  constructor(){
    // 这里存放若干依赖(Watcher)
    this.deps = [];
  }
  // 添加依赖方法
  addDep(dep){
    this.deps.push(dep);
  }
  //通知方法  用于通知所有依赖去做更新
  notify(){
    this.deps.forEach(dep => dep.update())
  }
}
// 观察者，监听器：负责更新视图
class watcher {
  constructor(){
    // 将当期watcher实例指定到Dep静态属性target
    Dep.target = this;
  }
  // 更新操作
  update(){
    console.log('属性更新了');
  }
}
```

然后再模拟创建一下watcher
在KVue类中修改


```
constructor(option) { //constructor 是一种用于创建和初始化class创建的对象的特殊方法。
    this.$options = option;
    // 数据响应化
    this.$data = option.data;
    this.observe(this.$data);  //observe 监听方法
    
    //模拟watcher创建
    new watcher();
    this.$data.name = '雷神之斧2';
    new watcher();
    this.$data.list.litile = '大个子2'
  }
```

在遍历data的时候在defineReactive方法中添加依赖


```
get(){
        Dep.target && dep.addDep(Dep.target);  //添加依赖
        return val;
      },
```

打开浏览器会发现模拟watcher创建的属性读取了

![image](https://upload-images.jianshu.io/upload_images/17381126-17a0fe810aa06992.png?imageMogr2/auto-orient/strip|imageView2/2/w/664/format/webp)