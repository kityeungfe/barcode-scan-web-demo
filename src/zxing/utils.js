export var deepCompareObjects = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
};
