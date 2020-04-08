// // 3、编程实现，往数组指定位置里插入一个元素
var arr = ["1411A", "44", "34305", "djg", "pic"];
 //第一种
function fn(arr, index, date) {
    arr.splice(index, 0, date);
    return arr 
}

console.log(fn(arr, 2, "hello"));

//第二种
var arr = ["1411A", "44", "34305", "djg", "pic"];
function fn2(arr,index,data){
    arr.map((item,id)=>{
        if(id==index){
            arr[index]=data
        }
    })
    return arr
}
console.log(fn2(arr, 3, "hello"))
