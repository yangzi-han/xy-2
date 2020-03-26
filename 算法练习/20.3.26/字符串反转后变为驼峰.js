//第一种
// function getCase(str) {
//     var arr = str.split('');  // 每一个字符组成数组
//     str = arr.map(function ( item ){
//         if( item.toUpperCase() === item ){
//             return '-' + item.toLowerCase();
//         }else{
//             return item;
//         }
//     }).join( '' );
//     return str;
 
// }
// console.log(getCamelCase("xiaoShuoWangXiao"))
//第二种正则形式
function getCase(){ 
    return str.replace( /[A-Z]/g  , function(i) {
        retrun `-` + i.toLowerCase();
    })
}
console.log(getCase("xiaoShuoWangXiao"))
