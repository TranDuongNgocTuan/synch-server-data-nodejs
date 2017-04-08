var flag = { block: "no" };

var showFlag = function () {
    console.log(flag.block);
}

var getFlag = function(){
    return flag.block;
}

var changeFlagBlock = function () {
    flag = { block: "yes" };
}

var changeFlagUnBlock = function () {
    flag = { block: "no" };
}

module.exports = {
    showFlag: showFlag,
    getFlag: getFlag,
    changeFlagBlock: changeFlagBlock,
    changeFlagUnBlock: changeFlagUnBlock
}