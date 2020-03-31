var merge = function(A, m, B, n) {
    for(var i = m; i < m+n; i++){
        A[i] = B.shift();
        var k = i; 
        while(A[k] < A[k-1] && k > 0){
            var tmp = A[k];
            A[k] = A[k-1];
            A[k-1] = tmp;
            k--;
        }
    }
};