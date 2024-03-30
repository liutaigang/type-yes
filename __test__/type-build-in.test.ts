import { describe, it } from 'vitest';
import { toBuildInType, IdentifiableProxy, matchBuildInType } from '../src/type-build-in';

describe('toBuildInType', () => {
  it('null', ({ expect }) => expect(toBuildInType(null)).toEqual('null'));
  it('int8array', ({ expect }) => expect(toBuildInType(new Int8Array())).toEqual('int8array'));
  it('proxy', ({ expect }) => expect(toBuildInType(new IdentifiableProxy([], {}))).toEqual('proxy-array'));
  it('intl.collator', ({ expect }) => expect(toBuildInType(new Intl.Collator())).toEqual('intl.collator'));
});

describe('matchBuildInType', () => {
  // concise type
  it('undef', ({ expect }) => expect(matchBuildInType(undefined, 'undef')).toBeTruthy());
  it('bool', ({ expect }) => expect(matchBuildInType(true, 'bool')).toBeTruthy());
  it('num', ({ expect }) => expect(matchBuildInType(123, 'num')).toBeTruthy());
  it('str', ({ expect }) => expect(matchBuildInType('123', 'str')).toBeTruthy());
  it('obj', ({ expect }) => expect(matchBuildInType({}, 'obj')).toBeTruthy());
  it('arr', ({ expect }) => expect(matchBuildInType([], 'arr')).toBeTruthy());
  it('func', ({ expect }) => expect(matchBuildInType(() => {}, 'func')).toBeTruthy());

  // proxy
  const proxy = new IdentifiableProxy([], {});
  it('proxy 01', ({ expect }) => expect(matchBuildInType(proxy, 'proxy')).toBeTruthy());
  it('proxy 02', ({ expect }) => expect(matchBuildInType(proxy, 'array')).toBeTruthy());

  it('promise', ({ expect }) => expect(matchBuildInType(Promise.resolve(), 'promise')).toBeTruthy());
  // TODO 请补充所有的常规类型的断言
});

describe('IdentifiableProxy', () => {
  const rawObject = {};
  const toStringTagFull = (obj: any) => Object.prototype.toString.call(obj);

  const arrProxy = new IdentifiableProxy(rawObject, {});
  it('IdentifiableProxy 01', ({ expect }) => {
    expect(toStringTagFull(rawObject)).toEqual('[object Proxy-Object]');
  });

  it('IdentifiableProxy 02', ({ expect }) => {
    const arrProxyProxy = new IdentifiableProxy(arrProxy, {});
    expect(toStringTagFull(arrProxyProxy)).toEqual('[object Proxy-Proxy-Object]');
  });
});
