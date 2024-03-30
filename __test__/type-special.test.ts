import { describe, it } from 'vitest';
import { matchSpecialType } from '../src/type-special';

describe('matchBuildInType', () => {
  // concise type
  it('nil', ({ expect }) => expect(matchSpecialType(undefined, 'nil')).toBeTruthy());
  it('nil', ({ expect }) => expect(matchSpecialType(null, 'nil')).toBeTruthy());
  it('empty 01', ({ expect }) => expect(matchSpecialType([], 'empty')).toBeTruthy());
  it('empty 02', ({ expect }) => expect(matchSpecialType({}, 'empty')).toBeTruthy());
  it('emptyobject', ({ expect }) => expect(matchSpecialType({}, 'emptyobject')).toBeTruthy());
  it('emptyarray', ({ expect }) => expect(matchSpecialType([], 'emptyarray')).toBeTruthy());
  it('NaN', ({ expect }) => expect(matchSpecialType(NaN, 'NaN')).toBeTruthy());
  it('infinity', ({ expect }) => expect(matchSpecialType(Infinity, 'infinity')).toBeTruthy());
  it('primitive undefined', ({ expect }) => expect(matchSpecialType(undefined, 'primitive')).toBeTruthy());
  it('primitive null', ({ expect }) => expect(matchSpecialType(null, 'primitive')).toBeTruthy());
  it('primitive boolean', ({ expect }) => expect(matchSpecialType(true, 'primitive')).toBeTruthy());
  it('primitive number', ({ expect }) => expect(matchSpecialType(123, 'primitive')).toBeTruthy());
  it('primitive string', ({ expect }) => expect(matchSpecialType('123', 'primitive')).toBeTruthy());
  it('primitive bigint', ({ expect }) => expect(matchSpecialType(123123123123n, 'primitive')).toBeTruthy());
  it('primitive symbol', ({ expect }) => expect(matchSpecialType(Symbol(), 'primitive')).toBeTruthy());
});
