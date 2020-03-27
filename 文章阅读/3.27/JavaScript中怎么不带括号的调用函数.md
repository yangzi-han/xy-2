# 地址
https://segmentfault.com/a/1190000004599465

# 总结
1.作为构造器调用
function Greet() {

    console.log('hello');

}

new Greet; 
2.隐性实现 toString 或者 valueOf 的调用
var greet = {

    toString: function() {

         return 'hello';

    }

}



greet + '';
3.Iterators
function* func() {

    console.log('hello');

}



var greet = {};

greet[Symbol.iterator] = func;



[...greet];
4.Getters

function func() {

    console.log('hello');

}



Object.defineProperty(window, 'greet', { get: func });



greet;
5.Tagged Template Literals
function greet() {

    console.log('hello');

}



greet``;