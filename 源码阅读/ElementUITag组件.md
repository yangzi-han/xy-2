## ElementUI
#### 如何修改ElementUI源码
#####安装
    首先将ElementUI的官方源码库clone下来
```
https://github.com/ElemeFE/element.git
cd element
npm install
```
#### 打包
 安装完依赖后运行打包命令npm run dist
 执行完成后可以发现根目录下多了lib文件夹，这个文件夹中的文件就是打包后的组件及样式，和我们使用npm install element-ui下载下来的依赖包中的lib文件夹内容相同，也就是我们使用时引用的资源。
#### 修改
    packages文件夹中存放的就是各种组件源码，可以根据需要去进行修改，修改完成后重新执行npm run dist就会重新打包，覆盖lib文件夹

如果仅仅修改了逻辑部分，没有修改样式的话到这里就完了，如果还想修改源码样式往下看
#### 问题
    修改后将lib文件夹中文件替换你项目中/node_module/element-ui/lib中的文件，即可使用你修改后的组件，如果只是修改了逻辑你会发现一切运行正常，但是如果修改了样式你会发现样式没有生效。

源码中样式采用sass进行预编译，所以如果要修改源码样式就需要在src文件夹下找到相应的样式进行修改，修改完成后在theme-chalk文件夹下，  npm install安装以来，安装完后使用npm run build对样式进行编译和打包，（样式打包使用的是gulp工具），打包后文件会覆盖theme-chalk下的lib文件夹。

修改完逻辑和样式，并对样式文件进行重打包后，返回根目录下npm run dist即可打包生成最后的文件。完成后将根目录下lib文件夹替换自己项目中/node_module/element-ui/lib即可。

