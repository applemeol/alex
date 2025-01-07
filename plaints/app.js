var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaultObject = {
    property1: 'defaultValue',
    property2: 0,
    property3: false,
};
var partialObject = {
    property1: 'customValue',
    property12: 'my new props',
};
var populateComplete = __assign({}, partialObject);
console.log("MEOL THE COMPLETE ".concat(JSON.stringify(populateComplete)));
console.log("MEOL THE COMPLETE ".concat(JSON.stringify(populateComplete.property1)));
console.log("MEOL THE COMPLETE ".concat(JSON.stringify(populateComplete.property12)));
