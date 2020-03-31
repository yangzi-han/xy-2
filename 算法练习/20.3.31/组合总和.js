var combinationSum = function (candidates, target) {
    // 由大到小排序
    candidates.sort((a, b) => b - a);
  
    let res = [], path = []; 
    let len = candidates.length, minNum = candidates[len - 1]; // 缓存长度
  
    get_combin(candidates, target, 0, path);
  
    function get_combin(candidates, target, start, path) {
      if (target == 0) {
        return res.push(path.slice());
      }
  
      // 这里不用小于 0，小于最小的数就可以返回了
      if (target < minNum) return;
  
      for (let i = start; i < len; i++) {
        path.push(candidates[i]);
        get_combin(candidates, target - candidates[i], i, path);
        path.pop();
      }
    }
  
    return res;
  };
  
  var combinationSum = function (candidates, target) {
    var resultList = [];
    var combin = function (value, path) {
        if (value === 0) return resultList.push(path.slice());

        if (value < 0) return;

        for (var i = 0; i < candidates.length; i++) {
            if (path.length === 0 || (path.length > 0 && path[path.length - 1] >= candidates[i])) {
                var minus = value - candidates[i];
                path.push(candidates[i]);
                combin(minus, path);
                path.pop(candidates[i]);
            }
        }
    };

    combin(target, []);
    return resultList;
};
