  //   如果一个数恰好等于它的约数之和
  for(var i=1;i<=10000;i++){
    var sum=0;
    for(var y=1;y<i;y++){
        if(i%y==0){
            sum+=y;             
        }
    }  s
    if(sum==i){      
        console.log(i+"&nbsp")
    }
}