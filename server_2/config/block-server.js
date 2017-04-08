var flag = { block: "no" };

var showFlag = function () {
    console.log(flag.block);
}

var changeFlagBlock = function () {
    flag = { block: "yes" };
}

var changeFlagUnBlock = function () {
    flag = { block: "no" };
}

module.exports = {
    showFlag: showFlag,
    changeFlagBlock: changeFlagBlock,
    changeFlagUnBlock: changeFlagUnBlock
}