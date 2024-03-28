export type SpecialType =
  | 'nil' // null or undefined
  | 'empty' // {}, []
  | 'emptyobject' // {}
  | 'emptyarray' // []
  | 'NaN'
  | 'infinity'
  | 'primitive'; // null, undefined, boolean, number, bigint, string, symbol

const primitiveObjects = ['null', 'undefined', 'boolean', 'number', 'bigint', 'string', 'symbol'];

export const matchSpecialType = (parameter: any, typeFlag: SpecialType) => {
  switch (typeFlag) {
    case 'nil':
      return parameter == null;
    case 'empty':
      return typeof parameter === 'object' && Object.keys(parameter).length === 0;
    case 'emptyobject':
      return typeof parameter === 'object' && !Array.isArray(parameter) && Object.keys(parameter).length === 0;
    case 'emptyarray':
      return Array.isArray(parameter) && Object.keys(parameter).length === 0;
    case 'NaN':
      return Number.isNaN(parameter);
    case 'infinity':
      return typeof parameter === 'number' && !Number.isFinite(parameter);
    case 'primitive':
      return primitiveObjects.some((item) => Object.prototype.toString.call(parameter).toLowerCase().includes(item));
    default:
      return false;
  }
};
