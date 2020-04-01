function removeDuplicateChar(str) {

    if (!str || str.length < 2 || typeof str != "string") {
        return;
    }; 
    let charArr = [], res = [];
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (charArr[c]) {
            charArr[c]++;
        }
        else {
           charArr[c] = 1;
        }
    }
    for (let j in charArr) {
        if (charArr[j] === 1) {
            res.push(j);
        }
    }
    return res.join("");
}
console.log(removeDuplicateChar("Learn more javascript dude"));