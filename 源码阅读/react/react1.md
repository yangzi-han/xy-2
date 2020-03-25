### React.createElement
在写 React 项目的时候，我们一般会直接用 JSX 的形式来写，而 JSX 经过 Babel 编译后会将 HTML 标签转换为React.createElement的函数形式。如果想进行更深入的了解这一过程，可以看我之前写的这篇文章：你不知道的Virtual DOM（一）：Virtual Dom介绍。文章中的h函数，如果在 Babel 中没有特别指定的话，默认就是React.createElement。

下面，我们将从一个最简单的例子，来看React是如何渲染的：


```
ReactDOM.render(
    <h1 style={{"color":"blue"}}>hello world</h1>,
    document.getElementById('root')
);
```

经过 JSX 编译后，会是下面这个样子：


```
ReactDOM.render(
    React.createElement(
        'h1',
        { style: { "color": "blue" } },
        'hello world'
    ),
    document.getElementById('root')
);
```

先来看下React.createElement的源码。


```
// 文件位置：src/isomorphic/React.js

var ReactElement = require('ReactElement');

...

var createElement = ReactElement.createElement;

...

var React = {
    ...
    
    createElement: createElement,
    
    ...
}

module.exports = React;
```

最终的实现需要查看ReactElement.createElement：


```
// 文件位置：src/isomorphic/classic/element/ReactElement.js

ReactElement.createElement = function (type, config, children) {
    ...

    // 1. 将过滤后的有效的属性，从config拷贝到props
    if (config != null) {
        
        ...
        
        for (propName in config) {
            if (hasOwnProperty.call(config, propName) &&
                !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
            }
        }
    }

    // 2. 将children以数组的形式拷贝到props.children属性
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }

    // 3. 默认属性赋值
    if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    
    ...
    
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    );
};
```


本质上只做了3件事：

    1. 将过滤后的有效属性，从 config 拷贝到 props
    2. 将 children 以数组或对象的形式拷贝到 props.children
    3. 默认属性赋值
最终的返回值是ReactElement函数的调用结果。我们再来看看它做了什么：


```
// 文件位置：src/isomorphic/classic/element/ReactElement.js

var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner,
    };
    
    ...

    return element;
};
```

最终只是返回一个简单对象。调用栈是这样的：


```
React.createElement
|=ReactElement.createElement(type, config, children)
    |-ReactElement(type,..., props)
```

这里生成的 ReactElement 我们将其命名为ReactElement[1]，它将作为参数传入到 ReactDom.render。