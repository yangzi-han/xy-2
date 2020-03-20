etLeastNumbers = (arr, k) => {
        if (k === 0) return  []
        const obj = new Array(10000).fill(0)
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i]]++
        }
        const res = []
        for (let i = 0; i < obj.length; i++) {
            if (obj[i]) {
                res.push(...new Array(obj[i]).fill(i))
                if (res.length >= k) {
                    res.length = k;
                    return  res
                }
            }
        }
    };