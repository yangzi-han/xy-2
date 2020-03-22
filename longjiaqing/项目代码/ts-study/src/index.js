"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//基础类型
// number,boolean,string,undefined,null,symbol,bigint,一定要跟Number，Boolean,String区分开
var a = 100;
var b;
b = 'hello';
//其他类型
//any,unkonwn,never,数组,元祖,object
var c = 10;
c = 'bw';
var d = 100;
d = 'bw';
// console.log(c.name, c(), new c(), d.name, d(), new d());
var e;
var f;
// f = [1,2,3,4,'hello'];
// let g: [number, string, object];
// g = [100, 'hello', 'world'];
// 接口
var h = {
    code: 200,
    data: {},
    msg: '请求成功'
};
// var i = {} as AjaxType;
// setTimeout(()=>{
//     i = h;
//     i.code = 300;
//     i.msg = '';
// })
// 类
// 访问限定符
var C = /** @class */ (function () {
    function C() {
        var _this = this;
        this.a = 100; // private, 只可以在类的内部访问
        this.b = 100; // public，默认为public，可以在类的内部和外部访问
        this.c = 100; // protected，只可以在类的内部及子类访问
        this.func = function () {
            console.log('a...', _this.a);
        };
    }
    return C;
}());
new C().func();
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.func2 = function () {
            console.log('c....', _this.c);
        };
        return _this;
    }
    return D;
}(C));
new D().func2();
// Class作为接口，用于porps的类型检查的defaultProp的默认值
// 接口是规范，只声明成员方法不做实现
// 类声明成员方法并可以赋值
var add = function (a, b) { return Boolean(a + b); };
var add2 = function (a, b) {
    return false;
};
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var s = swap([function () { console.log('function'); }, { name: '美国' }]);
console.log('s...', s);
var x = [];
