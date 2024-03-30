import { islogicalOperator, logicalOperation } from '../src/logical-operator';
import { describe, it } from 'vitest';

describe('islogicalOperator', () => {
  it('is', ({ expect }) => expect(islogicalOperator('is')).toBeTruthy());
  it('not', ({ expect }) => expect(islogicalOperator('not')).toBeTruthy());
  it('or', ({ expect }) => expect(islogicalOperator('or')).toBeTruthy());
  it('and', ({ expect }) => expect(islogicalOperator('and')).toBeTruthy());
  it('nor', ({ expect }) => expect(islogicalOperator('nor')).toBeTruthy());
  it('nand', ({ expect }) => expect(islogicalOperator('nand')).toBeTruthy());
  it('error', ({ expect }) => expect(islogicalOperator('xxx')).toBeFalsy());
});

describe('logicalOperation', () => {
  const boolTuple = [true, false, true, false];
  it('is', ({ expect }) => expect(logicalOperation('is', boolTuple)).toBeTruthy());
  it('not', ({ expect }) => expect(logicalOperation('not', boolTuple)).toBeFalsy());
  it('or', ({ expect }) => expect(logicalOperation('or', boolTuple)).toBeTruthy());
  it('and', ({ expect }) => expect(logicalOperation('and', boolTuple)).toBeFalsy());
  it('nor', ({ expect }) => expect(logicalOperation('nor', boolTuple)).toBeFalsy());
  it('nand', ({ expect }) => expect(logicalOperation('nand', boolTuple)).toBeTruthy());

  it('error', ({ expect }) => {
    try {
      logicalOperation('xxx' as any, boolTuple);
    } catch (error) {
      expect(error.toString()).includes('is illegal');
    }
  });
});
