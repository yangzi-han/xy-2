/**
  搜索插入的位置
 */
var searchInsert = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== target) {
            if(target > nums[nums.length - 1]){
                return nums.length
            }else{
               if (target < nums[i]) {
                    return i
                } 
            }
        }else{  
            return nums.indexOf(target)
            break;
        }
    }
};

var searchInsert = function(nums, target) {
    if (nums[0] > target) {
      return 0;
    }
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] >= target) {
        return i;
      }
    }
    return nums.length;
  };