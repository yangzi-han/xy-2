# 文章地址
https://juejin.im/post/5e45e350e51d45270e211836#heading-5

# 总结
箭头功能它的语法简洁明了，使用词法绑定绑定 this，它非常适合作为回调

1. 在使用箭头函数的时候 箭头函数只有一个表达式时 可以删除大括号{}和return语句
2. const increaseNumber = number => number + 1;
    increaseNumber.name; // => 'increaseNumber'
因为变量increaseNumber保存了箭头函数，所以js决定使用increaseNumber作为该函数的名称。因此，箭头函数的名称为 'increaseNumber'。
3. 在内联箭头函数中使用对象时，把改对象包装在一对括号中。
4. 避免箭头函数过多的嵌套，好的做法是通过将箭头函数提取为独立函数，或者尽可能使用async/await语法。
5. 如果箭头函数包含操作符>、<、<=和>=，一个好的做法是将表达式包装成一对括号，或者故意使用更长的箭头函数形式。