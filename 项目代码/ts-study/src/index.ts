//基础类型
// number,boolean,string,undefined,null,symbol,bigint,一定要跟Number，Boolean,String区分开
let a:number=100
let b:string
b='hello'
//其他类型
//any,unkonwn,never,数组,元祖,object
let c:any=10
c='bw'

let d:unknown=100
d='bw'

// console.log(c.name, c(), new c(), d.name, d(), new d());

let e: number [];
let f: Array<number>;

// f = [1,2,3,4,'hello'];


// let g: [number, string, object];
// g = [100, 'hello', 'world'];

// 接口
var h = {
    code: 200,
    data: {},
    msg: '请求成功'
}
interface AjaxType{
    code?: number,
    data: {},
    readonly msg: string,
    handClick: Function
}
// var i = {} as AjaxType;
// setTimeout(()=>{
//     i = h;
//     i.code = 300;
//     i.msg = '';
// })


// 类
// 访问限定符
class C{
    private a:number = 100;// private, 只可以在类的内部访问
    public b:number = 100;// public，默认为public，可以在类的内部和外部访问
    protected c:number = 100;// protected，只可以在类的内部及子类访问

    func = ()=>{
        console.log('a...', this.a)
    }
}
new C().func();

class D extends C{
    func2 = ()=>{
        console.log('c....', this.c);
    }
}
new D().func2();
// Class作为接口，用于porps的类型检查的defaultProp的默认值
// 接口是规范，只声明成员方法不做实现
// 类声明成员方法并可以赋值

const add: (a:number, b:number)=>boolean = (a:number, b:number)=>Boolean(a+b)
const add2 = function(a:number, b:number):boolean{
    return false;
}


function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

var s = swap([function(){console.log('function')}, {name: '美国'}]);
console.log('s...', s);

var x: Array<number|string|boolean|null> = [];
