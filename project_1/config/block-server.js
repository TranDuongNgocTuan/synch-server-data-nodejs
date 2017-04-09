var flag = { block: "no" };
var code = { code: "" };

var showFlag = function () {
    console.log(flag.block);
}

var getFlag = function(){
    return flag.block;
}

// Code for transaction
// var getCode = function(){
//     return code.code;
// }

// var changeCode = function(data){
//     code = { code : data };
// }

var changeFlagBlock = function () {
    flag = { block: "yes" };
}

var changeFlagUnBlock = function () {
    flag = { block: "no" };
}

module.exports = {
    showFlag: showFlag,
    getFlag: getFlag,
    // Code for transaction
    // getCode: getCode,
    // changeCode: changeCode,
    changeFlagBlock: changeFlagBlock,
    changeFlagUnBlock: changeFlagUnBlock
}