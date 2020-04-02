// findSpecialInteger1 = (arr)=> {
//     var arlen = arr.length
//     for(var i=0; i<arlen; i++){
//         var ar = arr.filter(m => m === arr[i])
//         if(ar.length/arlen > .25) return arr[i]
//     }
//     return -1
// }; 


findSpecialInteger2 = (arr) =>{
    var arlen = arr.length/4|0
    for(var i=0; i<arr.length; i++){
        var index1 = arr.indexOf(arr[i]), index2 = arr.lastIndexOf(arr[i])
        // if(index1 !== index2 && (index2-index1+1)/arlen > .25){
        if(index1 !== index2 && (index2-index1+1) > arlen){
            return arr[i]
        }
    }
    return 1
};