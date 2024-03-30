import { Ty, TypeMatcher, TypeFlag, buildinTypeMatcher, padEnd } from '../src/ty';
import { describe, it } from 'vitest';
import { IdentifiableProxy } from '../src/type-build-in';

describe('buildinTypeMatcher', () => {
  it('bool', ({ expect }) => expect(buildinTypeMatcher(true, 'bool')).toBeTruthy());
  it('string', ({ expect }) => expect(buildinTypeMatcher('123', 'string')).toBeTruthy());
  it('NaN', ({ expect }) => expect(buildinTypeMatcher(NaN, 'NaN')).toBeTruthy());
  it('!bool', ({ expect }) => expect(buildinTypeMatcher('', '!bool')).toBeTruthy());
});

describe('padEnd', () => {
  const originArr = [1, 2, 3];
  const targetArr = [1, 2, 3, 3, 3, 3];
  it('padEnd', ({ expect }) => expect(padEnd(originArr, targetArr.length)).toEqual(targetArr));
});

describe('Ty()', () => {
  const arr = ['a', 'b', 'c'];
  const xnum = 123;
  const xobj = {};
  const xarr = [];
  const xstr = '123';

  // ---------------------proxy------------------------
  const arrProxy = new IdentifiableProxy(arr, {});
  it('proxy 01', ({ expect }) => expect(Ty(arrProxy).proxy.is).toBeTruthy());
  it('proxy 02', ({ expect }) => expect(Ty(arrProxy).arr.proxy.and).toBeTruthy());

  // ---------------------not------------------------
  it('not', ({ expect }) => expect(Ty(xnum).num.is).toBeTruthy());

  // ---------------------or------------------------
  it('or 01', ({ expect }) => expect(Ty(xobj).obj.nil.or).toBeTruthy());
  it('or 02', ({ expect }) => expect(Ty(xobj).arr.obj.undef.null.or).toBeTruthy());

  // ---------------------nor------------------------
  it('nor', ({ expect }) => expect(Ty(xobj).arr.obj.undef.null.nor).toBeFalsy());

  // -----------------------and----------------------
  it('and 01', ({ expect }) => expect(Ty(xobj, xarr, xstr, xnum).obj.arr.str.num.and).toBeTruthy());

  const xobj1 = {};
  const xobj2 = 123;
  const xobj3 = {};
  // -----------------------and----------------------
  it('and 02', ({ expect }) => expect(Ty(xobj, xobj1, xobj2, xobj3).obj.and).toBeFalsy());

  // -----------------------nand----------------------
  it('nand', ({ expect }) => expect(Ty(xobj, xarr, xstr, xnum).obj.arr.str.num.nand).toBeFalsy());

  // -----------------------!---------------------
  it('! 01', ({ expect }) => expect(Ty({}, 123).obj['!num'].and).toBeFalsy());
  it('! 02', ({ expect }) => expect(Ty({}, '').obj['!num'].and).toBeTruthy());
});

describe('new Ty()', () => {
  type MyType = 'arr_obj_null' | 'finite' | TypeFlag;
  const typeMather: TypeMatcher<MyType> = (parameter, typeFlag) => {
    switch (typeFlag) {
      case 'arr_obj_null':
        return typeof parameter === 'object';
      case 'finite':
        return Number.isFinite(parameter);
      default:
        return buildinTypeMatcher(parameter, typeFlag);
    }
  };
  const tty = new Ty(typeMather);

  it('or', ({ expect }) => expect(tty(void 0).arr.obj.undef.null.or).toBeTruthy());
  it('finite', ({ expect }) => expect(tty(123).finite.is).toBeTruthy());
  it('arr_obj_null 01', ({ expect }) => expect(tty([]).arr_obj_null.is).toBeTruthy());
  it('arr_obj_null 02', ({ expect }) => expect(tty({}).arr_obj_null.is).toBeTruthy());
  it('arr_obj_null 03', ({ expect }) => expect(tty(null).arr_obj_null.is).toBeTruthy());
  it('finite.arr_obj_null.or', ({ expect }) => expect(tty([]).finite.arr_obj_null.or).toBeTruthy());
});
