import { Ty, TypeMatcher, TypeFlag, buildinTypeMatcher } from '../src/ty';

// type MyType = 'element' | 'finite' | TypeFlag;
// const typeMather: TypeMatcher<MyType> = (parameter, typeFlag) => {
//   switch (typeFlag) {
//     case 'element':
//       return parameter instanceof Element;
//     case 'finite':
//       return Number.isFinite(parameter);
//     default:
//       return buildinTypeMatcher(parameter, typeFlag);
//   }
// };

// const arr = ['a', 'b', 'c'];
// const arrProxy = new IdentifiableProxy(arr, {});
// console.log(Object.prototype.toString.call(arrProxy)); // Proxy

// console.log(Ty(arrProxy).proxy.is);
// console.log(Ty(arrProxy).arr.proxy.and);

// console.log('---------------------not------------------------');
// console.log(typeof xnum === 'number');
// console.log(Ty(xnum).num.is);

// console.log('---------------------or------------------------');
// console.log(typeof xobj === 'object' || xobj == null);
// console.log(Ty(xobj).obj.nil.or);

// console.log('---------------------nor------------------------');
// console.log(!(typeof xobj === 'object' || xobj == null));
// console.log(Ty(xobj).arr.obj.undef.null.nor);

// console.log('---------------------or------------------------');
// console.log(typeof xobj === 'object' || xobj == null);
// console.log(Ty(xobj).arr.obj.undef.null.or);

// console.log('---------------------nor------------------------');
// console.log(!(typeof xobj === 'object' || xobj == null));
// console.log(Ty(xobj).arr.obj.undef.null.nor);

// console.log('---------------------or, or------------------------');
// console.log((typeof xobj === 'object' && !Array.isArray(xobj)) || xobj == null);
// console.log(Object.prototype.toString.call(xobj) === '[object Object]' || xobj == null);
// console.log(Ty(xobj).obj.nil.or);

// console.log('-----------------------and----------------------');
// console.log(typeof xobj === 'object' && Array.isArray(xarr) && typeof xstr === 'string' && typeof xnum === 'number');
// console.log(Ty(xobj, xarr, xstr, xnum).obj.arr.str.num.and);

// const xobj1 = {};
// const xobj2 = 123;
// const xobj3 = {};
// console.log('-----------------------and----------------------');
// console.log(typeof xobj === 'object' && typeof xobj1 === 'object' && typeof xobj2 === 'object' && typeof xobj3 === 'object');
// console.log(Ty(xobj, xobj1, xobj2, xobj3).obj.and);

// console.log('-----------------------nand----------------------');
// console.log(!(typeof xobj === 'object' && Array.isArray(xarr) && typeof xstr === 'string' && typeof xnum === 'number'));
// console.log(Ty(xobj, xarr, xstr, xnum).obj.arr.str.num.nand);
