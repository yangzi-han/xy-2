```javascript
repeatedNTimes = (A) => {
    var set = new Set();  //构造一个Set
    var len = 0;
    for(let a of A){
        set.add(a);
        len++;
        if (len > set.size){ //假如某一次添加没有改变长度，则这个元素是重复的，返回这个元素
            return a;
        }
    }
};
```

