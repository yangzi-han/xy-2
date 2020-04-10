Icon的核心代码位于 index.tsx 内，这里说明一下，对于不熟悉Typescript的同学来说这个文件类型可能有些陌生，Typescript主要是丰富了JavaScript的内容和加入了静态类型检查，一般的Typescript文件是以 .ts 结尾，但相对于React的jsx文件，Typescript产生了 .tsx 的文件，其实就是Typescript的jsx写法，实际生产环境中，最终都要编译成 .js 文件。

以下是Icon组件中 index.tsx 的全部源码：

```
import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);
  return <i {...omit(props, ['type', 'spin'])} className={classString} />;
};

export default Icon;
```

我们看看官网使用示例和API描述:


```
<Icon type="question" style={{ fontSize: 16, color: '#08c' }} />
```

参数 | 说明 | 类型 | 默认值
---|---|---|---
spin | 是否有旋转动画|boolean |false | 
style | 设置图标的样式,例如 fontSize 和 color |object| -|
type|图标类型|string|

首先导入的是3个依赖


```
import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
```

大家对React比较熟悉，对于classnames和omit.js，这里做些说明。

##### classNames基本使用方法
classnames主要是为组件提供动态css功能，方便向React之类的应用提供状态编程


```
var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'

classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// 不同的参数类型
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// 忽略错误的数据类型
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

// 数组参数
var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'
```

classnames能够很简便的处理css的class开关，类似于在jsx中


```
{ true? 'class-a': 'class-b' }
```

但是要优雅和方便很多，结合ES2015中的字符串变量，就可以玩的更开心


```
let buttonType = 'primary';
classNames({ [`btn-${buttonType}`]: true });
```

当然怎么能少了直接使用React

```
var classNames = require('classnames');

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames({
      btn: true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```
