# 地址
https://juejin.im/post/5e5cbad5518825490b648718

# 总结
1.事件处理程序
(1)HTML事件处理程序,即直接将事件处理程序添加在HTML元素中
(2)DOM0级事件处理程序,在javascript中通过给事件处理程序定义一个函数
(3)DOM2级事件处理程序,一个是添加事件api：addEventListenter；一个是移除事件api：removeEventListener
(4)IE事件处理程序,不支持addEventListener、removeEventListener,支持attachEvent和deleteEvent
(5)通用事件处理程序
2.事件流机制
(1)事件冒泡,事件从子元素向父元素传播
3.事件对象
(1)event.type
(2)event.target和event.currentTarget
(3)event.cancelable和event.preventDefault来阻止事件的默认行为
(4)event.bubbles和event.Propagation
(5)IE中的事件对象
[1]event.type
String
被触发事件的类型。  比如触发button的click事件，那event.type的值就为"click"。


event.cancelBubble
Boolean
设置事件是否冒泡。默认值为false，将其设置为true就可以取消事件冒泡。


event.returnValue
Element
设置事件的默认行为。默认值为true，将其设置为false就可以取消事件的默认行为。


event.srcElement
Element
本次事件中的目标元素。（同DOM1、DOM2级中的target）

4.实践应用-事件委托
主要针对事件冒泡的一个应用
