while(1){
    var num = prompt("请用户输入一个大于2的数:")
    for(var i=2;i<num;i++){
        if(num%i==0){
         console.log("这不是一个质数！");
    }
    else{ 
        console.log('这是一个质数');
    }
 }
}