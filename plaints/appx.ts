let foo:string|undefined|null=undefined;

console.log('*********UNDEFINED***********')

let result= foo ?? 'is nullish';
console.log(`${result}`);

result = foo || 'is null coalescing';
console.log(`${result}`);

console.log('*********SPACE***********')
foo='';

result = foo ?? 'is nullish';
console.log(`nullish - space :  ${result}`);

result = foo || 'is null coalescing';
console.log(`null coalescing ${result}`);


console.log('*********NULL***********')
foo=null;
result = foo ?? 'is nullish';
console.log(`nullish - null :  ${result}`);

result = foo || ' is null coalescing';
console.log(`null coalescing ${result}`);