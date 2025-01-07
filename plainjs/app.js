var scope = 'outside scope';
var myObj = {
    scope: 'inside an OBJECT',
    traditional: function () {
        return scope;
    },
    myarrow: function () {
        return scope;
    }
};
console.log(myObj.traditional());
console.log(myObj.myarrow());
