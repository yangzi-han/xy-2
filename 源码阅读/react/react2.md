### ReactDom.render
ReactDom.render 最终会调用 ReactMount 的 _renderSubtreeIntoContainer：

// 文件位置：src/renderers/dom/client/ReactMount.js

_renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {

```
...
    var nextWrappedElement = React.createElement(
        TopLevelWrapper, 
        {
            child: nextElement
        }
    );

    ...
    
    var component = ReactMount._renderNewRootComponent(
        nextWrappedElement,
        container,
        shouldReuseMarkup,
        nextContext
    )._renderedComponent.getPublicInstance();
    
    ...
    
    return component;
},

...

var TopLevelWrapper = function () {
    this.rootID = topLevelRootCounter++;
};

TopLevelWrapper.prototype.isReactComponent = {};

TopLevelWrapper.prototype.render = function () {
    return this.props.child;
};

TopLevelWrapper.isReactTopLevelWrapper = true;

...

_renderNewRootComponent: function (
    nextElement,
    container,
    shouldReuseMarkup,
    context
) {
    ...
    
    var componentInstance = instantiateReactComponent(nextElement, false);

    ...

    return componentInstance;
},
```

这里又会调用到另一个文件 instantiateReactComponent：


```
// 文件位置：src/renders/shared/stack/reconciler/instantiateReactComponent.js

function instantiateReactComponent(node, shouldHaveDebugID) {
    var instance;

    ...

    instance = new ReactCompositeComponentWrapper(element);
    
    ...

    return instance;
}

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function (element) {
    this.construct(element);
};

Object.assign(
    ReactCompositeComponentWrapper.prototype,
    ReactCompositeComponent, 
    {
        _instantiateReactComponent: instantiateReactComponent,
    }
);
```

这里又会调用到另一个文件 ReactCompositeComponent：


```
// 文件位置：src/renders/shared/stack/reconciler/ReactCompositeComponent.js

var ReactCompositeComponent = {
    construct: function (element) {
        this._currentElement = element;
        this._rootNodeID = 0;
        this._compositeType = null;
        this._instance = null;
        this._hostParent = null;
        this._hostContainerInfo = null;

        // See ReactUpdateQueue
        this._updateBatchNumber = null;
        this._pendingElement = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;

        this._renderedNodeType = null;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._topLevelWrapper = null;

        // See ReactUpdates and ReactUpdateQueue.
        this._pendingCallbacks = null;

        // ComponentWillUnmount shall only be called once
        this._calledComponentWillUnmount = false;
        ...
    }
    
    ...
}
```

我们用ReactCompositeComponent[T]来表示这里生成的顶层 component。

整个的调用栈是这样的：

```
ReactDOM.render
|=ReactMount.render(nextElement, container, callback)
|=ReactMount._renderSubtreeIntoContainer()
    |-ReactMount._renderNewRootComponent(
        nextWrappedElement, // scr:------------------> ReactElement[2]
        container,          // scr:------------------> document.getElementById('root')
        shouldReuseMarkup,  // scr: null from ReactDom.render()
        nextContext,        // scr: emptyObject from ReactDom.render()
    )
    |-instantiateReactComponent(
          node,             // scr:------------------> ReactElement[2]
          shouldHaveDebugID /* false */
        )
        |-ReactCompositeComponentWrapper(
            element         // scr:------------------> ReactElement[2]
        );
        |=ReactCompositeComponent.construct(element)
```

组件间的层级结构是这样的：
![image](https://segmentfault.com/img/bVbipq2?w=678&h=152)

clipboard.png

到此为止，顶层对象已经构造完毕，下一步就是调用 batchedMountComponentIntoNode（来自 ReactMount 的 _renderNewRootComponent方法），进行页面的渲染了。
##### 总结
本文介绍了 React 顶层对象 ReactCompositeComponent 的构建过程。通过 JSX 表达的 DOM 结构最终会转化为一个纯 JS 对象，用于下一步的渲染。