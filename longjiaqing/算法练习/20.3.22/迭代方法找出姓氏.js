//案例1：使用数组的迭代方法找出所有姓马的人
var arr = ["马云", "王思聪", "李彦宏", "马化腾", "雷军", "许家印", '任正非', '河马', '斑马'];
//第一种
var filter = arr.filter(function(item) {
    return item[0] == '马';
});
console.log(filter); 
//第二种
function filter1(arr){
    let newarr=[]
    for(let i=0;i<arr.length;i++){
        if(arr[i][0]=='马'){
            newarr.push(arr[i]) 
        }
    }
    return newarr
}
console.log(filter1(arr))