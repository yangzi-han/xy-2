## MVVM
#### MVVM分为Model、View、ViewModel三者。
- Model：代表数据模型，数据和业务逻辑都在Model层中定义；
- View：代表UI视图，负责数据的展示；
- ViewModel：就是与界面(view)对应的Model。因为，数据库结构往往是不能直接跟界面控件一一对应上的，所以，需要再定义一个数据对象专门对应view上的控件。而ViewModel的职责就是把model对象封装成可以显示和接受输入的界面数据对象。

前段时间面试蚂蚁金服，面试官问我，比如UI中有一个li列表，它是怎么与我们的数据对应的，当时没明白他在问什么，现在想想应该是考察ViewModel。

Model和View并无直接关联，而是通过ViewModel来进行联系的，Model和ViewModel之间有着双向数据绑定的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。

简单的说，ViewModel就是View与Model的连接器，View与Model通过ViewModel实现双向绑定。