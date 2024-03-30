// 所有能通过 Object.prototype.toString.call() 判断的数据类型
export type BuildInType =
  | 'null'
  | 'undefined'
  | 'boolean'
  | 'number'
  | 'bigint'
  | 'string'
  | 'symbol'
  | 'object'
  | 'array'
  | 'function'
  | 'promise'
  | 'error'
  | 'window'
  | 'math'
  | 'date'
  | 'regexp'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'bigint64array'
  | 'biguint64array'
  | 'float32array'
  | 'float64array'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'arraybuffer'
  | 'atomics'
  | 'dataview'
  | 'json'
  | 'weakref'
  | 'finalizationregistry'
  | 'iterator'
  | 'promise'
  | 'reflect'
  | 'proxy'
  | 'intl'
  | 'intl.collator'
  | 'intl.datetimeformat'
  | 'intl.displaynames '
  | 'intl.listformat'
  | 'intl.locale'
  | 'intl.numberformat'
  | 'intl.pluralrules'
  | 'intl.relativetimeformat'
  | 'intl.segmenter'
  | 'global'; // "gobalThis" in node

export type ConciseType =
  | 'undef' // undefined
  | 'bool' // boolean
  | 'num' // number
  | 'str' // string
  | 'obj' // object
  | 'arr' // array
  | 'func'; // function

const conciseTypeMap = new Map<ConciseType, BuildInType>([
  ['undef', 'undefined'],
  ['bool', 'boolean'],
  ['num', 'number'],
  ['str', 'string'],
  ['obj', 'object'],
  ['arr', 'array'],
  ['func', 'function'],
]);

const toStringTag = (obj: any) => Object.prototype.toString.call(obj).slice(0, -1).split(' ')[1];

/**
 * 作者：Kop
 * 链接：https://juejin.cn/post/6865910564817010702
 */
export const IdentifiableProxy = new Proxy(Proxy, {
  construct: function (target, args) {
    const result = Reflect.construct(target, args);
    const originToStringTag = toStringTag(result);
    result[Symbol.toStringTag] = 'Proxy-' + originToStringTag; // Proxy-Object, Proxy-Proxy-Object, Proxy-Function, ...
    return result;
  },
});

export const toBuildInType = (obj: any): BuildInType => {
  return toStringTag(obj).toLowerCase() as BuildInType;
};

export const matchBuildInType = (parameter: any, typeFlag: BuildInType | ConciseType) => {
  const stringTag = toBuildInType(parameter);
  const fullFlag = conciseTypeMap.get(typeFlag as ConciseType) ?? typeFlag;

  const isProxy = stringTag.startsWith('proxy');
  if (fullFlag === 'proxy') return isProxy;

  return isProxy ? stringTag.split('-').pop() === fullFlag : fullFlag === stringTag;
};
