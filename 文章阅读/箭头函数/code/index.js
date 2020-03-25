//如果箭头函数包含操作符>、<、<=和>=，一个好的做法是
//将表达式包装成一对括号，或者故意使用更长的箭头函数形式。

const negativeToZero = number => (number <= 0 ? 0 : number);
const negativeToZero = number => {
    return number <= 0 ? 0 : number;
};

//在内联箭头函数中使用对象时，把改对象包装在一对括号中。
const array = [1, 2, 3];
array.map(number => ({
  'number': number,
  'propA': 'value A',
  'propB': 'value B'
}));

//   避免箭头函数过多的嵌套
//   可以通过将箭头函数提取为独立函数，
//   或者尽可能使用async/await语法


const handleButtonClick = async () => {
    const response = await fetch('/items.json');
    const json = await response.json();
    json.forEach(item => console.log(item.name));
};
  
myButton.addEventListener('click', handleButtonClick);
 