/**
 * 输入字母变成驼峰形式
 */
//方法1
function getCamelCase(str) { 
    var arr = str.split( '-' );
    return arr.map( function( item, index ) {
        console.log(item)
        if( index === 0 ){
            return item;
        }else{
            return item.charAt(0).toUpperCase() + item.slice( 1 );
        }
    }).join('');
}
console.log(getCamelCase("xiao-shuoss-sfff-fe-hguios"))
//方法2
// function getCamelCase( str ){
//     return str.replace( /-([a-z])/g , function( all, i){    // 注意正则中的(),这里可以匹配到  -s 和s
//         return i.toUpperCase();                        
//     })
//  }