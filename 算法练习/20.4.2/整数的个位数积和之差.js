// subtractProductAndSum = (n)=>{
//     let sum = 0, product = 1
//     String.prototype.split.call(n,'').forEach(e=>{
//         sum+=e*1
//         product*=e
//     }) 
//     return product-sum
// };


subtractProductAndSum = (n)=> {
    let digit=(n+'').length;
    let sum=0;
    let product=1;
    while(digit>0){
        let temp=parseInt(n/(Math.pow(10,digit-1)));
        sum+=temp
        product*=temp
        n=n-temp*(Math.pow(10,digit-1))
        digit--;
    }
    return product-sum;
};