isFlipedString = (s1, s2) => {
    // 第一种：
      // if (s1 === s2 && s1 === '') return true;
      // if (s1.length !== s2.length) return false;
      // var s1Arr = s1.split(''); 
      // var res = false;
      // for(var i = 0; i < s1Arr.length; i++) {
      //   var a = s1Arr.slice(0, i + 1).join('');
      //   var b = s1Arr.slice(i + 1).join('');
      //   if (b + a === s2) {
      //     return res = true;
      //   }
      // }
      // return res;
    // 第二种
      if (s1.length !== s2.length) return false;
      var total = s1 + s1;
      return total.indexOf(s2) > -1;
    };