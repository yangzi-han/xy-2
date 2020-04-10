/**
 * 
 *阶乘
 */
function factorialWhile(num){
    var result=1;
    while(num){ 
    result*=num;
    num--;
    }
    return result;
}
alert(factorialWhile(5));   

function factorialFor(num){
    if(num<1){
        return 1;
    }else{
        for(var i=num-1; i>=1; i--){
            num*=i;
        }
    }
    return num;
}
alert("for方法二："+factorialFor(5));