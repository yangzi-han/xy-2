文章概述
字符串查找 方法：include（） let jspang='技术'; let blog = 'es6新增语法一级一些技术之类的学问'; document.write(blog.indexOf(jspang)); 打印：true 判断开头是否存在startsWith()//返回值是布尔类型 let jspang='牛逼'; let blog = '东北为什么发言口音特别重，就是没事天天在家吹牛逼说牛逼克拉斯。';

blog.startsWith(jspang); //false
判断结尾是否存在endsWith() let jspang='牛逼'; let blog = '东北为什么发言口音特别重，就是没事天天在家吹牛逼说牛逼克拉斯。';

blog.endsWidth(jspang); //false
repeat() 方法 es6为字符串提供了一个repeat方法，接受一个number类型的参数，表示该字符串的重复次数，返回值是当前字符串重复一定的次数，示例如下： console.log('x'.repeat(2)); console.log('hello'.repeat(3)); 输出结果

xx hellohellohello ES6数字操作 数字判断和转换

数字验证Number.isFinite( xx ) 判断是否为数字 可以使用Number.isFinite( )来进行数字验证，只要是数字，不论是浮点型还是整形都会返回true，其他时候会返回false。 let a= 11/4; let b=11 let c=3.1475926 console.log(Number.isFinite(b)); //true console.log(Number.isFinite(c));//true console.log(Number.isFinite(a));//true console.log(Number.isFinite('jspang'));//false console.log(Number.isFinite(NaN));//false console.log(Number.isFinite(undefined));//false NaN验证 NaN是特殊的非数字，可以使用Number.isNaN()来进行验证。下边的代码控制台返回了true。 console.log(Number.isNaN(NaN));
console.log(NaN == NaN); //false console.log(NaN === NaN);//false console.log(isNaN(NaN));//true 判断是否为整数Number.isInteger(xx) let a=123.1; console.log(Number.isInteger(a)); //false 整数转换Number.parseInt(xxx)和浮点型转换Number.parseFloat(xxx) let a='9.18'; console.log(Number.parseInt(a)); //9 console.log(Number.parseFloat(a)); //9.18