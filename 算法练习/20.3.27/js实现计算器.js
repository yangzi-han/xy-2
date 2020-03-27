/*
    *弹出输入框判断用户是否输入值，
    *没输入内容：弹出提示框“请刷新页面重新输入动作”
    *输入内容：再判断是不是数字：
    *不是数字：弹出提示框“只允许输入数字”
    *是数字：弹出第二个输入框要求输入运算的第二个值，依次再判断是否输入内容，是否为数字，与第一个值判断一致
    *当第1及第2个值都输入后再弹出第三个输入框，要求输入运算符，通过switch语句分别判断：
    *如果是”+”号，则执行加法运算并alert运算结果
    *如果是”-”号，则执行减法运算并alert运算结果
    *如果是”*”号，则执行乘法运算并alert运算结果
    *如果是”/”号，则执行除法运算并alert运算结果 
    *其它符号，则alert “很遗憾，你输入的运算超出了运算范围
    */
var shu1 = prompt('输入第一个数');
if (shu1 == 'null' || shu1 == '') {
    alert('请刷新页面重新输入');
} else {
    if (isNaN(shu1)) {
        alert('只允许输入数字');
    } else {
        var shu2 = prompt('输入第二个数');
        if (shu2 == 'null' || shu2 == '') {
            alert('请刷新页面重新输入');
        } else {
            if (isNaN(shu2)) {
                alert('只允许输入数字');
            } else {
                var str = prompt('输入运算符');
                switch (str) {
                    case '+':
                        alert(shu1 * 1 + shu2 * 1);
                        break;
                    case '-':
                        alert(shu1 - shu2);
                        break;
                    case '*':
                        alert(shu1 * shu2);
                        break;
                    case '/':
                        alert(shu1 / shu2);
                        break;
                    default:
                        alert('输入超出范围');
                        break;
                }
            }

        }
    }
}